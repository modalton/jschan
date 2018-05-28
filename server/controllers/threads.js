const sql = require("../dbconfig");
const sqlstring = require("sqlstring");
const typeCheck = require('type-check').typeCheck;
const {test,lengths} = require('../utils/lengths.js');

 
module.exports = exports = {
  //Some queries have subqueries so that you can use board name instead of id.
  //For ease of use but if it affects speed can change
  createThread: (req, res) => {
    let { title, body } = req.body;
    let acronym  = req.params.board;
    let picture_url = req.file ? req.file.filename : null;


    let validInputFlag = typeCheck('[Maybe String]',[acronym, title, body, picture_url]);
    let validLengthsFlag = (test(lengths.TEST,body) && test(lengths.TINY_TEXT,picture_url) && test(lengths.TINY_TEXT,title));
    if(!validInputFlag || validLengthsFlag){
      res.status(400);
      return res.send(new Error('Invalid Input'));
    }
    
    sql.query(
      sqlstring.format(
        `START TRANSACTION;
        insert into posts(is_thread) values (true);
        insert into threads(board_id,post_id,title,body,picture_url,ip) 
 	values (
                (SELECT board_id from boards where acronym = ?), 
                (SELECT post_id from posts order by post_id desc limit 1),
                ?,?,?,?);
		update threads set id_token = substring(md5(concat(thread_id,ip)),1,7) order by thread_id desc limit 1;
        commit;`,
        [acronym, title, body, picture_url,req.ip]
      ),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      }
    );
  },

  getThreadsByBoard: (req, res) => {
    let  acronym = req.params.board;

    //probably just redirect on bad GETs?
    let validInputFlag = typeCheck('String',acronym);
    if(!validInputFlag){
      res.status(400);
      return res.send(new Error('Invalid Input'));
    }
    
    sql.query(
      sqlstring.format(
        `select post_id,title,id_token,body,picture_url,
        (select COUNT(picture_url) from comments where thread_post_id = threads.post_id) as images,
        (select COUNT(comment_id) from comments where thread_post_id = threads.post_id) as replies
        from threads where board_id = (select board_id from boards where acronym = ?);`,
        [acronym]
      ),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      }
    );
  },

  getEntireThread: (req,res) => {
    let { thread_post_id } = req.params;

    let validInputFlag = typeCheck(' String',thread_post_id);
    if(!validInputFlag){
      res.status(400);
      return res.send(new Error('Invalid Input'));
    }
    
    sql.query(
      sqlstring.format(
        `SELECT post_id, title,id_token,name,body,options,picture_url FROM threads WHERE post_id = ?
        UNION
        SELECT post_id, null,id_token,name,body,options,picture_url FROM comments WHERE thread_post_id = ?;`,
        [thread_post_id,thread_post_id]
      ),
      (error,results,fields) => {
        if (error) throw error;
        res.send(results);
      }
    );
  },

  //This should be handled by key constraint on post delete. dbl check and update
  //FIX ME SENPAI
  deleteThread: (req, res) => {
    let { thread_id } = req.body;
    sql.query(
      sqlstring.format(`delete from boards where thread_id = ?;`, [thread_id]),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      }
    );
  }
};

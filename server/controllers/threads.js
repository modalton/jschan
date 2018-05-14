const sql = require("../dbconfig");
const sqlstring = require("sqlstring");

//sample transaction

//get thread union
 
module.exports = exports = {
  //Some queries have subqueries so that you can use board name instead of id.
  //For ease of use but if it affects speed can change
  createThread: (req, res) => {
    let { title, body, picture_url } = req.body;
    let  acronym  = req.params.board;
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
    sql.query(
      sqlstring.format(
        `select post_id,title,id_token,body,picture_url from threads where board_id = (select board_id from boards where acronym = ?);`,
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

  //Need to do with transaction!! <-- think this should be handled by key constraint on post delete. dbl check and update
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

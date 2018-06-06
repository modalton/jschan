const sql = require("../dbconfig");
const sqlstring = require("sqlstring");
const typeCheck = require('type-check').typeCheck;
const {test,lengths} = require('../utils/lengths.js');

// basic comment insert
module.exports = exports = {
  createComment: (req, res) => {
    let { body } = req.body;
    let { thread_post_id } = req.params;
    let picture_url = req.file ? req.file.filename : null;

    let validInputFlag = typeCheck('[Maybe String]',[ body, thread_post_id, picture_url]);
    let validLengthsFlag = (test(lengths.TEST,body) && test(lengths.TINY_TEXT,picture_url));
    if(!validInputFlag || !validLengthsFlag){
      res.status(400);
      return res.send(new Error('Invalid Input'));
    }

    sql.query(
      sqlstring.format(
        `START TRANSACTION;
        insert into posts(is_thread) values (false);
        insert into comments(thread_post_id,post_id,body,picture_url,ip,id_token) 
	values (?, (SELECT post_id from posts order by post_id desc limit 1),?,?,?,substring(md5(concat(?,?)),1,7));
        commit;`,
        [thread_post_id, body, picture_url,req.ip,thread_post_id,req.ip]
      ),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      }
    );
  },

  deleteComment: (req, res) => {
    let { comment_id } = req.body;
    sql.query(
      sqlstring.format(`delete from comments where id = ?;`, [comment_id]),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      }
    );
  }
};

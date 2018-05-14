const sql = require("../dbconfig");
const sqlstring = require("sqlstring");

// basic comment insert
module.exports = exports = {
  createComment: (req, res) => {
    let { body, picture_url } = req.body;
    let { thread_post_id } = req.params;
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

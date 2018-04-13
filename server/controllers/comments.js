const sql = require("../dbconfig");
const sqlstring = require("sqlstring");

module.exports = exports = {
  createComment: (req, res) => {
    let { thread_id, post, picture_url } = req.body;
    sql.query(
      sqlstring.format(
        `insert into comments(thread_id,post,picture_url) values(?,?,?);`,
        [thread_id, post, picture_url]
      ),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results[0]);
      }
    );
  },

  getThreadComments: (req, res) => {
    let { thread_id } = req.body;
    sql.query(
      sqlstring.format(`select * from comments where thread_id = ?;`, [
        thread_id
      ]),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results[0]);
      }
    );
  },

  deleteComment: (req, res) => {
    let { comment_id } = req.body;
    sql.query(
      sqlstring.format(`delete from comments where id = ?;`, [comment_id]),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results[0]);
      }
    );
  }
};

const sql = require("../dbconfig");
const sqlstring = require("sqlstring");

module.exports = exports = {
  //Some queries have subqueries so that you can use board name instead of id.
  //For ease of use but if it affects speed can change
  createThread: (req, res) => {
    let { acronym, title, post, picture_url } = req.body;
    sql.query(
      sqlstring.format(
        `insert into threads(board_id,title,post,picture_url) select id ,?,?,? from boards where acronym = ?;`,
        [title, post, picture_url, acronym]
      ),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results[0]);
      }
    );
  },

  getThreadsByBoard: (req, res) => {
    let { acronym } = req.body;
    sql.query(
      sqlstring.format(
        `select * from threads where board_id = (select id from boards where acronym = '');`,
        [acronym]
      ),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results[0]);
      }
    );
  },

  deleteThread: (req, res) => {
    let { thread_id } = req.body;
    sql.query(
      sqlstring.format(`delete from boards where thread_id = ?;`, [thread_id]),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results[0]);
      }
    );
  }
};

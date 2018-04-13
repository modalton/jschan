const sql = require("../dbconfig");
const sqlstring = require("sqlstring");

module.exports = exports = {
  createBoard: (req, res) => {
    let { acronym, title } = req.body;
    sql.query(
      sqlstring.format(`insert into boards(acronym,title) values(?,?);`, [
        acronym,
        title
      ]),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results[0]);
      }
    );
  },

  getBoards: (req, res) => {
    sql.query(`select acronym,title from boards;`, (error, results, fields) => {
      if (error) throw error;
      res.send(results[0]);
    });
  },

  deleteBoard: (req, res) => {
    let { acronym } = req.body;
    sql.query(
      sqlstring.format(`delete from boards where acronym = ?;`, [acronym]),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results[0]);
      }
    );
  },

  updateBoardName: (req, res) => {
    let { acronym, new_acronym } = req.body;
    sql.query(
      sqlstring.format(`update boards set acronym = ? where acronym = ?;`, [
        new_acronym,
        acronym
      ]),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results[0]);
      }
    );
  },

  updateBoardTitle: (req, res) => {
    let { acronym, new_title } = req.body;
    sql.query(
      sqlstring.format(`update boards set title = ? where acronym = ?;`, [
        new_title,
        acronym
      ]),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results[0]);
      }
    );
  }
};

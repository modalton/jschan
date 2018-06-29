const sql = require("../dbconfig");
const sqlstring = require("sqlstring");
const typeCheck = require("type-check").typeCheck;

module.exports = exports = {
  createBoard: (req, res) => {
    let { acronym, title } = req.body;

    let validInputFlag = typeCheck("[String]", [acronym, title]);
    if (!validInputFlag) {
      res.status(400);
      return res.send(new Error("Invalid Input"));
    }

    sql.query(
      sqlstring.format(`insert into boards(acronym,title) values(?,?);`, [
        acronym,
        title
      ]),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      }
    );
  },

  getBoards: (req, res) => {
    sql.query(`select acronym,title from boards;`, (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
  },

  deleteBoard: (req, res) => {
    let { acronym } = req.body;

    let validInputFlag = typeCheck("String", acronym);
    if (!validInputFlag) {
      res.status(400);
      return res.send(new Error("Invalid Input"));
    }

    sql.query(
      sqlstring.format(`delete from boards where acronym = ?;`, [acronym]),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      }
    );
  },

  updateBoardName: (req, res) => {
    let { acronym, new_acronym } = req.body;

    let validInputFlag = typeCheck("[String]", [acronym, new_acronym]);
    if (!validInputFlag) {
      res.status(400);
      return res.send(new Error("Invalid Input"));
    }

    sql.query(
      sqlstring.format(`update boards set acronym = ? where acronym = ?;`, [
        new_acronym,
        acronym
      ]),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      }
    );
  },

  updateBoardTitle: (req, res) => {
    let { acronym, new_title } = req.body;

    let validInputFlag = typeCheck("[String]", acronym, new_title);
    if (!validInputFlag) {
      res.status(400);
      return res.send(new Error("Invalid Input"));
    }

    sql.query(
      sqlstring.format(`update boards set title = ? where acronym = ?;`, [
        new_title,
        acronym
      ]),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      }
    );
  }
};

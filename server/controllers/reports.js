const sql = require("../dbconfig");
const sqlstring = require("sqlstring");
const typeCheck = require("type-check").typeCheck;

module.exports = exports = {
  createReport: (req, res) => {
    let { post_id, reason } = req.body;

    let validInputFlag = typeCheck("[String]", [post_id, reason]);
    if (!validInputFlag) {
      res.status(400);
      return res.send(new Error("Invalid Input"));
    }

    // This query throws fk err. Don't remeber best practices for fk violations so using other
    // insert into reports(reported_post, reason, reporting_ip) values(?,?,?);
    sql.query(
      sqlstring.format(
        `insert into reports(reported_post, reason, reporting_ip)
        select post_id, ?, ? from posts where post_id = ?;`,
        [reason, req.ip, post_id]
      ),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      }
    );
  },

  //eventually this should get reports for boards you have permessions for
  getReports: (req, res) => {
    sql.query(
      ` select post_id,reporting_ip,reason,body,picture_url from reports 
 join all_posts_view on (reports.reported_post = all_posts_view.post_id);`,
      (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      }
    );
  }
};

const sql = require("../dbconfig");
const sqlstring = require("sqlstring");
const bcrypt = require("bcrypt");
 
module.exports = exports = {
  createMod:(req,res)=>{
    let {username,password,email} = req.body;
    bcrypt.hash(password, 10, function(err, salt_and_hash) {
      // Store hash in your password DB.
      sql.query(
        sqlstring.format(
          `insert into mods(username,email,salt_password_hash) values(?,?,?)`,
          [username,email,salt_and_hash]
        ),
        (error, results, fields) => {
          if (error) throw error;
          res.send(results);
        }
      );
    });
  },

  authUser:(req,res)=>{
    let {username,password} = req.body;
    sql.query(
      sqlstring.format(
        `select username,salt_password_hash from mods where username = ?;`,[username]
      ),(error,results,fields)=>{
        if(error) throw error;
        res.send(results)
      }
    )
  }
  
}

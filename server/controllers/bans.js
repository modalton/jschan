const sql = require("../dbconfig");
const sqlstring = require("sqlstring");
const typeCheck = require('type-check').typeCheck;
 
module.exports = exports = {
  createBan:(req,res)=>{
    console.log('muh user',req.user);
    return res.send('temp')
    let {board,duration,ban,reason} = req.body;
    let value_arr = [board,duration,ban,req.user,reason];

    let validInputFlag = typeCheck('[String]',value_arr);
    if(!validInputFlag){
      res.status(400);
      return res.send(new Error('Invalid Input'));
    }

    // Using this union that will return 1 row w ip (bc post_id is unique) bc having our client pass in ip w/body
    // would mean they could just ban anyone. However, this query seems to me a bit hacky. Get another pair of eyes on it
    sql.query(
      sqlstring.format(
        `insert into bans(ip,post_id, board,duration,ban,banner, reason)  
        select ip, post_id, ?,?,?,?,? from threads where post_id = ?
        union
        select ip, post_id, ?,?,?,?,? from comments where post_id = ?`,
        [...value_arr,...value_arr]
      ),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      }
    );
    
  },

  filterBannedUsers:(req,res,next)=>{
    sql.query(
      sqlstring.format(
        `select ban from bans where board = ? and ip = ?;`,
        [req.params.board,req.ip]
      ),
      (error, results, fields) => {
        if (error) throw error;
        if(results.length > 0) {
          res.status(401);
          res.send('You are banned');
        }
        next();
      }
    );
  },

  getBans:(req,res)=>{
    sql.query(
      sqlstring.format(
        ` select ip, post_id, board, duration, ban , banner, reason from bans;`
      ),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      }
    )
  },
  
  deleteBan:(req,res)=>{
    sql.query(
      sqlstring.format(
        `delete from bans where post_id = ?`,
        [req.body.post_id]
      ),
      (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      }
    );
  }
  
};

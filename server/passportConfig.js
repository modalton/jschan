const sql = require("./dbconfig");
const sqlstring = require("sqlstring");
const bcrypt = require("bcrypt");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('mods',new LocalStrategy(
  function(username, password, done) {
    sql.query(
      sqlstring.format(
        `select mods_id,username,salt_password_hash from mods where username = ?;`,[username]
      ),(error,results,fields)=>{
        if(error) throw error;

        //Test for valid user
        if(results.length === 0) return done(null,false,{message:'Not a user'});
        
        //using bcrypt to determine if our users hash matches the provided password
        bcrypt.compare(password, results[0].salt_password_hash, function(err, valid) {
          if(err) { return done(err) }
          if(!valid){
            return done(null, false, { message: 'Incorrect information.' });
          }
          return done(null,{username,id:results[0].mods_id});
        });
        
      }
    )    
  }
));

passport.serializeUser(function(user, done) {
  //The user being passed here is defined in the final argument of the successful done call in mods strategy
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  sql.query(
      sqlstring.format(
        `select username,is_admin from mods where mods_id = ?;`,[id]
      ),(error,results,fields)=>{
        done(null, results[0])
      })
});

//export it here so we dont have to double require in index.js
module.exports = passport;


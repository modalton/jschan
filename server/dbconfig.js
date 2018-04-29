//Load our .env file. Fatal error if this doesn't work
const result = require("dotenv").config();
const mysql = require("mysql");

if (result.error) {
  throw result.error;
}

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

module.exports = exports = connection;

//Load our .env file. Fatal error if this doesn't work
const result = require("dotenv").config();
const mysql = require("mysql");

if (result.error) {
  throw result.error;
}

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
  database: process.env.DB_NAME,
  multipleStatements: true,
  insecureAuth: true
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

//Close connection when we shut down. Possible to add one for abort or is sigint still called?

//Just binding to sigint here seems to stall the exiting so we have to call it manually
//From brief search seems like a windows problem. retry on linux and update
process.on("SIGINT", () => {
  connection.end();
  process.exit();
});

module.exports = exports = connection;

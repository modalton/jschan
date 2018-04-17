const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const boardController = require("./controllers/boards.js");
const threadController = require("./controllers/threads.js");

// parse application/x-www-form-urlencoded and  application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static dir
app.use(express.static(__dirname + "./../"));

// some basic routes for now
app.post("/createBoard", boardController.createBoard);
app.get("/boards", boardController.getBoards);

app.post("/:board/createThread", threadController.createThread);
app.get("/:board/catalog", threadController.getThreadsByBoard);

app.listen(4000);

module.exports = app;

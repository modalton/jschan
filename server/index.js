const express = require("express");
const app = module.exports = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const passportConfig = require("./passportConfig.js");
const boardController = require("./controllers/boards.js");
const threadController = require("./controllers/threads.js");
const commentController = require("./controllers/comments.js");
const modsController = require("./controllers/mods.js");
const boardConfig = require("./utils/boardConfig.js");

//passport piggy backs off this
app.use(session({ secret: "cats" }));

// parse application/x-www-form-urlencoded and  application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use passport middleware to persist sessions
app.use(passportConfig.initialize());
app.use(passportConfig.session());

// static dir
app.use(express.static(__dirname + "./../"));

// some basic routes for now
app.post("/createBoard", boardController.createBoard);
app.get("/boards", boardController.getBoards);


app.get("/:board/catalog", threadController.getThreadsByBoard);

app.get("/thread/:thread_post_id",threadController.getEntireThread);

app.post("/comment/:thread_post_id", boardConfig, commentController.createComment);
app.post("/:board/createThread", boardConfig, threadController.createThread);


app.post("/mods/create",modsController.createMod)
app.post("/mods/auth",passportConfig.authenticate('mods',
         { successRedirect: '/protected',
           failureRedirect: '/whoops',
           failureFlash: true }));

app.get("/whoops",(req,res)=>{res.send('welcom old fren')})

app.get("/protected",(req,res)=>{
  if(req.isAuthenticated()) return res.send('nice')
  res.send('get fucked')
})

app.listen(4000);

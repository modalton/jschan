const path = require("path");
const express = require("express");
const app = (module.exports = express());
const session = require("express-session");
const mime = require("mime");
const bodyParser = require("body-parser");
const passportConfig = require("./passportConfig.js");
const boardController = require("./controllers/boards.js");
const threadController = require("./controllers/threads.js");
const commentController = require("./controllers/comments.js");
const modsController = require("./controllers/mods.js");
const banController = require("./controllers/bans.js");
const reportController = require("./controllers/reports.js");
const boardConfig = require("./utils/boardConfig.js");
const multer = require("multer");

//Multer file upload config
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "/../uploads"));
  },
  filename: function(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}.${mime.getExtension(file.mimetype)}`
    );
  }
});
const upload = multer({ storage });

//passport piggy backs off this
app.use(session({ secret: "lainchan" }));

// parse application/x-www-form-urlencoded and  application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use passport middleware to persist sessions
app.use(passportConfig.initialize());
app.use(passportConfig.session());

// static dirs
app.use(express.static(__dirname + "./../"));
app.use(express.static(__dirname + "./../build"));
app.use(express.static(__dirname + "./../uploads"));

// some basic routes for now
app.get("/boards", boardController.getBoards);
app.post(
  "/boards",
  //  passportConfig.authenticate("mods"),
  boardController.createBoard
);

app.get("/bans", banController.getBans);
app.post("/bans", passportConfig.authenticate("mods"), banController.createBan);

app.get("/:board/catalog", threadController.getThreadsByBoard);

app.get("/thread/:thread_post_id", threadController.getEntireThread);

app.post(
  "/comment/:thread_post_id",
  boardConfig,
  upload.single("picture"),
  commentController.createComment
);
app.post(
  "/:board/createThread",
  boardConfig,
  upload.single("picture"),
  threadController.createThread
);

app.get("/reports", reportController.getReports);
app.post("/reports", reportController.createReport);

app.post(
  "/mods/create",
  passportConfig.authenticate("mods"),
  modsController.createMod
);
app.post("/mods/auth", passportConfig.authenticate("mods"), (req, res) => {
  res.json("logged in");
});

app.listen(4000);

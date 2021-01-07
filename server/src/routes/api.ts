var express = require("express");
var router = express.Router();

let postsRouter = require("./posts");
let usersRouter = require("./users");
let commentsRouter = require("./comments");

// route to posts on initial load
router.get("/", (req: any, res: { redirect: (arg0: string) => void }) => {
  res.redirect("/posts");
});

router.use("/posts", postsRouter);
router.use("/users", usersRouter);
router.use("/comments", commentsRouter);

module.exports = router;

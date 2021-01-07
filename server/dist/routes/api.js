"use strict";
var express = require("express");
var router = express.Router();
var postsRouter = require("./posts");
var usersRouter = require("./users");
var commentsRouter = require("./comments");
// route to posts on initial load
router.get("/", function (req, res) {
    res.redirect("/posts");
});
router.use("/posts", postsRouter);
router.use("/users", usersRouter);
router.use("/comments", commentsRouter);
module.exports = router;

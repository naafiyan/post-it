"use strict";
var express = require("express");
var router = express.Router();
// route to posts on initial load
router.get("/", function (req, res) {
    res.redirect("/posts");
});
module.exports = router;

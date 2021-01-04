var express = require("express");
var router = express.Router();

// route to posts on initial load
router.get("/", (req: any, res: { redirect: (arg0: string) => void }) => {
  res.redirect("/posts");
});

module.exports = router;

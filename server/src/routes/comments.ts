import express from "express";
let router = express.Router();
import passport from "passport";

import { new_comment, get_comments } from "../controllers/commentController";

// get all comments for post
router.get("/:postid", get_comments);

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  new_comment
);

module.exports = router;

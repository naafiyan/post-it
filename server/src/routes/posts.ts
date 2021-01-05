import express from "express";
let router = express.Router();
import passport from "passport";

import {
  get_post,
  get_posts,
  new_post,
  delete_post,
} from "../controllers/postController";

// Get all posts
router.get("/", get_posts);
router.get("/:postid", get_post);
router.delete("/:postid", delete_post);
router.post(
  "/new",

  passport.authenticate("jwt", { session: false }),
  new_post
);
// post comment

module.exports = router;

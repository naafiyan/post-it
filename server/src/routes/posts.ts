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

  // function (req, res, next) {
  //   passport.authenticate(
  //     "jwt",
  //     { session: false },
  //     function (err: any, user: any, info: any) {
  //       console.log(err);
  //       console.log(user);
  //       console.log(info);
  //     }
  //   )(req, res);
  // },

  // debug jw
  new_post
);

module.exports = router;

import express from "express";
let router = express.Router();
import passport from "passport";

import {
  login_user,
  signup_user,
  get_users,
  get_user,
  get_user_posts,
  accept_request,
  get_requests,
  send_request,
  get_friends,
} from "../controllers/userController";

// Sign-Up
router.post("/sign-up", signup_user);

// Login
router.post("/login", login_user);
// Log out
router.get("/log-out", (req, res) => {
  req.logout();
  res.status(200).json({ message: "logged out successfully" });
});

// get all users
router.get("/", get_users);

router.get("/:userid", get_user);

// get user's posts
router.get("/:userid/posts", get_user_posts);

// ------friends--------
// get user's requests
router.get(
  "/:userid/requests",
  passport.authenticate("jwt", { session: false }),
  get_requests
);

// send request
router.put(
  "/:userid1/requests/send/:userid2",
  //passport.authenticate("jwt", { session: false }),
  send_request
);

// accept request
router.put(
  "/:userid1/requests/accept/:userid2",
  //passport.authenticate("jwt", { session: false }),
  accept_request
);

// get friends
router.get(
  "/:userid/friends",
  //passport.authenticate("jwt", { session: false }),
  get_friends
);

module.exports = router;

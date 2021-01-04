import express from "express";
let router = express.Router();

import {
  login_user,
  signup_user,
  get_users,
  get_user,
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

// check authentication
router.get("/checkAuth", (req, res) => {
  const authenticated: boolean = typeof req.user !== "undefined";

  res.status(200).json({
    authenticated,
  });
});

module.exports = router;

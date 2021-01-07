"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var userController_1 = require("../controllers/userController");
// Sign-Up
router.post("/sign-up", userController_1.signup_user);
// Login
router.post("/login", userController_1.login_user);
// Log out
router.get("/log-out", function (req, res) {
    req.logout();
    res.status(200).json({ message: "logged out successfully" });
});
// get all users
router.get("/", userController_1.get_users);
router.get("/:userid", userController_1.get_user);
// get user's posts
router.get("/:userid/posts", userController_1.get_user_posts);
// check authentication
router.get("/checkAuth", function (req, res) {
    var authenticated = typeof req.user !== "undefined";
    res.status(200).json({
        authenticated: authenticated,
    });
});
module.exports = router;

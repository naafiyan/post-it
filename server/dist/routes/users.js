"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var passport_1 = __importDefault(require("passport"));
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
// ------friends--------
// get user's requests
router.get("/:userid/requests", passport_1.default.authenticate("jwt", { session: false }), userController_1.get_requests);
// send request
router.put("/:userid1/requests/send/:userid2", 
//passport.authenticate("jwt", { session: false }),
userController_1.send_request);
// accept request
router.put("/:userid1/requests/accept/:userid2", 
//passport.authenticate("jwt", { session: false }),
userController_1.accept_request);
// get friends
router.get("/:userid/friends", 
//passport.authenticate("jwt", { session: false }),
userController_1.get_friends);
module.exports = router;

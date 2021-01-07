"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var passport_1 = __importDefault(require("passport"));
var postController_1 = require("../controllers/postController");
// Get all posts
router.get("/", postController_1.get_posts);
router.get("/:postid", postController_1.get_post);
router.delete(
// Major BUG other users can delete others comments???
"/:postid", passport_1.default.authenticate("jwt", { session: false }), postController_1.delete_post);
router.post("/new", passport_1.default.authenticate("jwt", { session: false }), postController_1.new_post);
// post comment
module.exports = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var passport_1 = __importDefault(require("passport"));
var commentController_1 = require("../controllers/commentController");
// get all comments for post
router.get("/:postid", commentController_1.get_comments);
router.post("/new", passport_1.default.authenticate("jwt", { session: false }), commentController_1.new_comment);
router.delete("/:commentid", passport_1.default.authenticate("jwt", { session: false }), commentController_1.delete_comment);
module.exports = router;

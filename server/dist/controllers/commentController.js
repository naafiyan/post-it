"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var comment_1 = __importDefault(require("../models/comment"));
var express_validator_1 = require("express-validator");
exports.get_comments = function (req, res, next) {
    comment_1.default.find({ post: req.params.postid }, function (err, comments) {
        console.log(comments);
        if (err)
            next(err);
        // Success
        return res.status(200).json({ comments: comments });
    })
        .populate("user")
        .sort([["date_posted", -1]]);
};
exports.new_comment = [
    express_validator_1.body("text", "Text must be specified").trim().isLength({ min: 1 }).escape(),
    function (req, res, next) {
        var comment = new comment_1.default({
            text: req.body.text,
            user: req.body.user,
            post: req.body.post,
            date_posted: Date.now(),
        });
        comment.save(function (err) {
            if (err)
                next(err);
            return res.status(200).json({ comment: comment, message: "Success" });
        });
    },
];
exports.delete_comment = function (req, res, next) {
    console.log(req.user);
    comment_1.default.findById(req.params.commentid, function (err, comment) {
        if (err)
            next(err);
        if (req.user) {
            if (comment.user._id == req.user._id) {
                comment.delete(function (err) {
                    if (err)
                        next(err);
                    // Success
                    return res.status(200).json("Delete Success");
                });
            }
        }
    });
};

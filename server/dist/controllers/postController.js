"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var post_1 = __importDefault(require("../models/post"));
var _a = require("express-validator"), body = _a.body, validationResult = _a.validationResult;
exports.get_posts = function (req, res, next) {
    post_1.default.find(function (err, posts) {
        if (err)
            next(err);
        return res.json({ posts: posts });
    })
        .populate("user")
        .sort([["date_posted", -1]]);
};
exports.get_post = function (req, res, next) {
    post_1.default.findById(req.params.postid, function (err, post) {
        if (err)
            next(err);
        return res.json({ post: post });
    }).populate("user");
};
exports.new_post = [
    //sanitize the fields
    body("text", "Text must be specified").trim().isLength({ min: 1 }).escape(),
    function (req, res, next) {
        var post = new post_1.default({
            text: req.body.text,
            user: req.body.user,
            date_posted: Date.now(),
        });
        post.save(function (err) {
            if (err)
                next(err);
            res.status(200).json({ post: post, message: "Post saved succesfully" });
        });
    },
];
exports.delete_post = function (req, res, next) {
    // make sure to delete all associated comments
    console.log(req.user);
    post_1.default.findById(req.params.postid, function (err, post) {
        if (err)
            next(err);
        if (req.user) {
            if (post.user._id == req.user._id) {
                post.delete(function (err) {
                    if (err)
                        next(err);
                    // Succes
                    return res.status(200).json("delete success");
                });
            }
        }
    });
};

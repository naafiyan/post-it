"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var user_1 = __importDefault(require("../models/user"));
var post_1 = __importDefault(require("../models/post"));
var express_validator_1 = require("express-validator");
// TODO: implement jwt
exports.login_user = function (req, res, next) {
    passport_1.default.authenticate("local", { session: false }, function (err, user, info) {
        if (err || !user) {
            return res.status(400).json({
                message: "Could not authenticate",
            });
        }
        if (err)
            res.send(err);
        //Success
        jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET || "", 
        // {
        //   expiresIn: process.env.JWT_EXPIRES_IN,
        // },
        function (err, token) {
            if (err)
                next(err);
            res.status(200).json({
                token: token,
                user: user,
            });
        });
    })(req, res);
};
exports.signup_user = [
    // Sanitization
    express_validator_1.body("username", "Username must be specified")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    express_validator_1.body("password", "Password must be specified")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    express_validator_1.body("email", "Email must be specified")
        .trim()
        .isEmail()
        .isLength({ min: 1 })
        .escape(),
    function (req, res, next) {
        var _a = req.body, username = _a.username, password = _a.password, email = _a.email;
        user_1.default.findOne({ username: username }, function (err, user) {
            if (user)
                return res.status(400).json({
                    message: "User with this username already exists",
                });
            bcryptjs_1.default.hash(password, 10, function (err, hashedPassword) {
                if (err)
                    console.log(err);
                var user = new user_1.default({
                    username: username,
                    password: hashedPassword,
                    email: email,
                });
                user.save(function (err) {
                    if (err)
                        throw Error(err);
                    // saved
                    var token = jsonwebtoken_1.default.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET || ""
                    //{ expiresIn: process.env.JWT_EXPIRES_IN }
                    );
                    res.status(200).json({
                        token: token,
                        user: user,
                        message: "Signed up Successfully",
                    });
                });
            });
        });
    },
];
// Get one user
exports.get_user = function (req, res, next) {
    user_1.default.findById(req.params.userid, function (err, user) {
        if (err)
            next(err);
        res.json(user);
    });
};
exports.get_user_posts = function (req, res, next) {
    post_1.default.find({ user: req.params.userid }, function (err, posts) {
        if (err)
            next(err);
        res.json(posts);
    }).populate("user");
};
// Get all users
exports.get_users = function (req, res, next) {
    user_1.default.find(function (err, users) {
        if (err)
            return res.json(err);
        res.json(users);
    });
};

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
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
// add friends
// userA can goto profile
// send friend request to userB
// request added to userB friendRequests
// userB receives request and can decline or accept
// if accept:
// userB added to userA friendsList and userA added to userB friendsList
// friendRequest removed from userB friendRequests
// else:
// remove request
// send friendRequest
exports.send_request = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_1.default.findById(req.params.userid2)];
            case 1:
                user = _a.sent();
                user.friendRequests.push(req.params.userid1);
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        user1: req.params.userid1,
                        user2: user._id,
                    })];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.get_requests = function (req, res, next) {
    // get requests for user
    user_1.default.findById(req.params.userid, function (err, user) {
        if (err)
            return res.json(err);
        // success
        // returns friendRequests of users after populating
        // TODO populate friendRequests with User
        return res.status(200).json(user.friendRequests);
    }).populate("friendRequests");
};
// accept friend request
// api route will have userid1 and userid2
// userid1 = user that is accepting request FROM userid2
exports.accept_request = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var user1, user2, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, user_1.default.findById(req.params.userid1).populate("friendRequests")];
            case 1:
                user1 = _a.sent();
                return [4 /*yield*/, user_1.default.findById(req.params.userid2).populate("friendRequests")];
            case 2:
                user2 = _a.sent();
                return [4 /*yield*/, user1.friendList.push(user2)];
            case 3:
                _a.sent();
                return [4 /*yield*/, user2.friendList.push(user1)];
            case 4:
                _a.sent();
                return [4 /*yield*/, user1.friendRequests.splice(user1.friendRequests.indexOf(user2))];
            case 5:
                _a.sent();
                return [4 /*yield*/, user1.save()];
            case 6:
                _a.sent();
                return [4 /*yield*/, user2.save()];
            case 7:
                _a.sent();
                return [2 /*return*/, res.json({
                        user1fL: user1.friendList,
                        user2fL: user2.friendList,
                    })];
            case 8:
                err_2 = _a.sent();
                res.json(err_2);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
// get friends
exports.get_friends = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.default.findById(req.params.userid).populate("friendList")];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.json({ list: user.friendList })];
            case 2:
                err_3 = _a.sent();
                console.log(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// handle reject request
// handle remove friend

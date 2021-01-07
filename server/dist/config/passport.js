"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_jwt_1 = require("passport-jwt");
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = require("passport-local");
var user_1 = __importDefault(require("../models/user"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
// LocalStrategy
passport_1.default.use(new passport_local_1.Strategy(function (username, password, done) {
    user_1.default.findOne({ username: username }, function (err, user) {
        if (err)
            return done(err);
        if (!user)
            return done(null, false, { message: "Incorrect username" });
        bcryptjs_1.default.compare(password, user.password, function (err, res) {
            if (res) {
                return done(null, user);
            }
            if (!res) {
                // Password don't match
                return done(null, false, { msg: "Incorrect password" });
            }
            return done(null, user, { message: "Logged In successfully" });
        });
    });
}));
// app.js will pass global passport object here
// function will config it
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}, function (jwt_payload, done) {
    // JWT is valid
    return done(null, jwt_payload);
}));
exports.default = passport_1.default;

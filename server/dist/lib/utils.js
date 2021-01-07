"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken = require("jsonwebtoken");
function issueJWT(user) {
    var _id = user._id;
    var expiresIn = process.env.JWT_EXPIRES_IN;
    var payload = {
        sub: _id,
        iat: Date.now(),
    };
    var signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expiresIn,
    });
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn,
    };
}
exports.issueJWT = issueJWT;

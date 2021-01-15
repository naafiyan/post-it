"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var uniqueValidator = require("mongoose-unique-validator");
var UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    friendList: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    friendRequests: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
});
// url linking to user page
UserSchema.virtual("url").get(function () {
    return "/users/" + this._id;
});
UserSchema.plugin(uniqueValidator);
exports.default = mongoose_1.default.model("User", UserSchema);

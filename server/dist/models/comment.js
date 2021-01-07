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
var luxon_1 = require("luxon");
var CommentSchema = new mongoose_1.Schema({
    text: { type: String, required: true, minlength: 1, maxlength: 1000 },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose_1.Schema.Types.ObjectId, ref: "Post", required: true },
    date_posted: { type: Date, required: true },
});
// format date posted
CommentSchema.virtual("date_posted_formatted").get(function () {
    return luxon_1.DateTime.fromISO(this.date_posted.toString()).toLocaleString(luxon_1.DateTime.DATE_MED);
});
// export model
exports.default = mongoose_1.default.model("Comment", CommentSchema);

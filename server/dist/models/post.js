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
var PostSchema = new mongoose_1.Schema({
    text: { type: String, required: true, minlength: 1, maxlength: 300 },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    date_posted: { type: Date, required: true },
    date_edited: { type: Date },
});
// url link to the post
PostSchema.virtual("url").get(function () {
    return "/posts/" + this._id;
});
PostSchema.virtual("date_posted_formatted").get(function () {
    var date_now = luxon_1.DateTime.fromMillis(Date.now());
    var date_posted = luxon_1.DateTime.fromJSDate(this.date_posted);
    var diffNow = date_now
        .diff(date_posted, ["months", "days", "hours", "minutes"])
        .toObject();
    console.log(diffNow);
    return luxon_1.DateTime.fromISO(this.date_posted.toString()).toLocaleString(luxon_1.DateTime.DATE_MED);
});
PostSchema.virtual("date_edited_formatted").get(function () {
    return luxon_1.DateTime.fromJSDate(this.date_edited).toLocaleString(luxon_1.DateTime.DATE_MED);
});
// format the date
// Export
exports.default = mongoose_1.default.model("Post", PostSchema);

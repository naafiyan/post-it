import mongoose, { Schema } from "mongoose";
import { DateTime, Duration, DurationObject } from "luxon";

let PostSchema = new Schema({
  text: { type: String, required: true, minlength: 1, maxlength: 300 },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date_posted: { type: Date, required: true },
  date_edited: { type: Date },
});

// url link to the post
PostSchema.virtual("url").get(function (this: { _id: String }) {
  return "/posts/" + this._id;
});

PostSchema.virtual("date_posted_formatted").get(function (this: {
  date_posted: Date;
}) {
  const date_now = DateTime.fromMillis(Date.now());
  const date_posted = DateTime.fromJSDate(this.date_posted);
  const diffNow: DurationObject = date_now
    .diff(date_posted, ["months", "days", "hours", "minutes"])
    .toObject();

  console.log(diffNow);
  return DateTime.fromISO(this.date_posted.toString()).toLocaleString(
    DateTime.DATE_MED
  );
});

PostSchema.virtual("date_edited_formatted").get(function (this: {
  date_edited: Date;
}) {
  return DateTime.fromJSDate(this.date_edited).toLocaleString(
    DateTime.DATE_MED
  );
});

// format the date

// Export
export default mongoose.model("Post", PostSchema);

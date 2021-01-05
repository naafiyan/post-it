import mongoose, { Schema } from "mongoose";
import { DateTime } from "luxon";

let CommentSchema = new Schema({
  text: { type: String, required: true, minlength: 1, maxlength: 1000 },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date_posted: { type: Date, required: true },
});

// format date posted
CommentSchema.virtual("date_posted_formatted").get(function (this: {
  date_posted: Date;
}) {
  return DateTime.fromISO(this.date_posted.toString()).toLocaleString(
    DateTime.DATE_MED
  );
});
// export model
export default mongoose.model("Comment", CommentSchema);

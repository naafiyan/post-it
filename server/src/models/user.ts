import mongoose, { Schema } from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");

let UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  friendList: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  //avatar: use gridFS to store this
});

// url linking to user page
UserSchema.virtual("url").get(function (this: { _id: string }) {
  return "/users/" + this._id;
});

UserSchema.plugin(uniqueValidator);

export default mongoose.model("User", UserSchema);

import Post from "../models/post";
import { DateTime } from "luxon";

const { body, validationResult } = require("express-validator");

export const get_posts = (req: any, res: any, next: any) => {
  Post.find((err, posts) => {
    if (err) next(err);
    return res.json({ posts });
  })
    .populate("user")
    .sort([["date_posted", -1]]);
};

export const get_post = (req: any, res: any, next: any) => {
  Post.findById(req.params.postid, (err: any, post: any) => {
    if (err) next(err);
    return res.json({ post });
  }).populate("user");
};

export const new_post = [
  body("text", "Text required").trim().isLength({ min: 1 }).escape(),
  (req: any, res: any, next: any) => {
    //sanitize the fields

    const post = new Post({
      text: req.body.text,
      user: req.body.user,
      date_posted: Date.now(),
    });

    post.save((err: any) => {
      if (err) next(err);
      res.status(200).json({ post, message: "Post saved succesfully" });
    });
  },
];

export const delete_post = (req: any, res: any, next: any) => {
  Post.findByIdAndDelete(req.params.postid)
    .exec()
    .then((post: any) => {
      res.status(200).json({ message: "Delete success" });
    })
    .catch((err: any) => console.log(err));
};

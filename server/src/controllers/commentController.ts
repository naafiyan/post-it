import Comment from "../models/comment";

import { NextFunction, Request, Response } from "express";

import { body } from "express-validator";

export const get_comments = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Comment.find({ post: req.params.postid }, (err, comments) => {
    console.log(comments);
    if (err) next(err);

    // Success
    return res.status(200).json({ comments: comments });
  })
    .populate("user")
    .sort([["date_posted", -1]]);
};

export const new_comment = [
  body("text", "Text must be specified").trim().isLength({ min: 1 }).escape(),

  (req: Request, res: Response, next: NextFunction) => {
    const comment = new Comment({
      text: req.body.text,
      user: req.body.user,
      post: req.body.post,
      date_posted: Date.now(),
    });

    comment.save((err) => {
      if (err) next(err);

      return res.status(200).json({ comment, message: "Success" });
    });
  },
];

export const delete_comment = (req: any, res: Response, next: NextFunction) => {
  console.log(req.user);
  Comment.findById(req.params.commentid, (err: Error, comment: any) => {
    if (err) next(err);
    if (req.user) {
      if (comment.user._id == req.user._id) {
        comment.delete((err: any) => {
          if (err) next(err);

          // Success
          return res.status(200).json("Delete Success");
        });
      }
    }
  });
};

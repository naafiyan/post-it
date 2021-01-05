import Comment from "../models/comment";

import { NextFunction, Request, Response } from "express";

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

export const new_comment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // sanitize field

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
};

export const delete_comment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Comment.findByIdAndDelete(req.params.commentid)
    .exec()
    .then((comment: any) => {
      res.status(200).json({ message: "Comment delete sucess" });
    })
    .catch((err: Error) => {
      return next(err);
    });
};

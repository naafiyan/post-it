import Post from "../models/post";

const { body, validationResult } = require("express-validator");

import { NextFunction, Request, Response } from "express";

export const get_posts = (req: Request, res: Response, next: NextFunction) => {
  Post.find((err, posts) => {
    if (err) next(err);
    return res.json({ posts });
  })
    .populate("user")
    .sort([["date_posted", -1]]);
};

export const get_post = (req: Request, res: Response, next: NextFunction) => {
  Post.findById(req.params.postid, (err: any, post: any) => {
    if (err) next(err);
    return res.json({ post });
  }).populate("user");
};

export const new_post = (req: Request, res: Response, next: NextFunction) => {
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
};

export const delete_post = (req: Request, res: Response) => {
  Post.findByIdAndDelete(req.params.postid)
    .exec()
    .then((post: any) => {
      res.status(200).json({ message: "Delete success" });
    })
    .catch((err: any) => console.log(err));
};

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

export const new_post = [
  //sanitize the fields

  body("text", "Text must be specified").trim().isLength({ min: 1 }).escape(),
  (req: Request, res: Response, next: NextFunction) => {
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

export const delete_post = (req: any, res: Response, next: NextFunction) => {
  console.log(req.user);
  Post.findById(req.params.postid, (err: Error, post: any) => {
    if (err) next(err);
    if (req.user) {
      if (post.user._id == req.user._id) {
        post.delete((err: any) => {
          if (err) next(err);

          // Succes
          return res.status(200).json("delete success");
        });
      }
    }
  });
};

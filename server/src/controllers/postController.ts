import Post from "../models/post";
import { DateTime } from "luxon";

export const get_posts = (req: any, res: any, next: any) => {
  Post.find((err, posts) => {
    if (err) next(err);
    return res.json({ posts });
  }).populate("user");
};

export const get_post = (req: any, res: any, next: any) => {
  Post.findById(req.params.postid, (err: any, post: any) => {
    if (err) next(err);
    return res.json({ post });
  }).populate("user");
};

export const new_post = (req: any, res: any, next: any) => {
  console.log(req.body);
  //sanitize the fields

  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    user: req.body.user,
    date_posted: Date.now(),
  });

  post.save((err: any) => {
    if (err) next(err);
    res.status(200).json({ post, message: "Post saved succesfully" });
  });
};

export const delete_post = (req: any, res: any, next: any) => {
  Post.findByIdAndDelete(req.params.postid)
    .exec()
    .then((post: any) => {
      res.status(200).json({ message: "Delete success" });
    })
    .catch((err: any) => console.log(err));
};

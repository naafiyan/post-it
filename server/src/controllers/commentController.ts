import Comment from "../models/comment";

export const get_comments = (req: any, res: any, next: any) => {
  Comment.find({ post: req.params.postid }, (err, comments) => {
    console.log(comments);
    if (err) next(err);

    // Success
    return res.status(200).json({ comments: comments });
  }).populate("user");
};

export const new_comment = (req: any, res: any, next: any) => {
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

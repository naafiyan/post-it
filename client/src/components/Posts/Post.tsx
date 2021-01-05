import axios from "axios";
import { useEffect, useState } from "react";
import { CommentForm } from "./Comment";

export default function Posts({ match }: any) {
  const [post, setPost]: any = useState();

  console.log(match.params.id);
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts/" + match.params.id)
      .then((res) => {
        setPost(res.data.post);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(post);

  return (
    <div>
      {post && (
        <div>
          <h3>{post.title}</h3>
          <p>{post.user.username}</p>
          <p>{post.text}</p>
          <CommentForm post={post} user={post.user} />
        </div>
      )}
      {!post && <h3>Post Not Found</h3>}
    </div>
  );
}

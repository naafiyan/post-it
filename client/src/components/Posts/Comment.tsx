import { useState } from "react";
import axios from "axios";

export function CommentForm(props: any) {
  const [text, setText] = useState("");

  const { user, post } = props;

  const handleSubmitComment = (form: any) => {
    form.preventDefault();

    console.log(text);
    axios
      .post(
        "http://localhost:3000/comments/new",
        {
          text: text,
          user: user,
          post: post,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("id_token") || ""
            )}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>Comments</p>
      <form onSubmit={handleSubmitComment}>
        <input
          type="text"
          placeholder="Enter text"
          onChange={(e) => setText(e.target.value)}
        ></input>
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
}

export function Comments(props: any) {
  return <div>Comments</div>;
}

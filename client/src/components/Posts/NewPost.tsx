import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export default function NewPost() {
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (form: any) => {
    form.preventDefault();
    axios
      .post(
        "http://localhost:3000/posts/new",
        { title, text, user: user.user },
        {
          headers: {
            Authorization: `bearer ${
              JSON.parse(localStorage.getItem("user") || "").token
            }`,
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
      <h3>New Post</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter Title"
        ></input>

        <label htmlFor="text">Text:</label>
        <input
          onChange={(e) => setText(e.target.value)}
          type="textarea"
          placeholder="Enter Text"
        ></input>

        <input type="submit"></input>
      </form>
    </div>
  );
}

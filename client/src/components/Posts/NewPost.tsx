import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

import { PostContext } from "../contexts/PostContext";

export default function NewPost() {
  const { update, setUpdate } = useContext(PostContext);
  const [text, setText] = useState("");

  const [count, setCount] = useState(0);

  const handleSubmit = (form: any) => {
    form.preventDefault();
    const userData = JSON.parse(localStorage.getItem("user") || "");
    axios
      .post(
        "http://localhost:3000/posts/new",
        { text, user: userData },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("id_token") || ""
            )}`,
          },
        }
      )
      .then((res) => {
        setUpdate(!update);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>New Post</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Text:</label>
        <input
          onChange={(e) => {
            setText(e.target.value);
            setCount(e.target.value.length);
          }}
          type="textarea"
          placeholder="Enter Text"
          minLength={1}
          maxLength={300}
        ></input>
        <span>{count}/300</span>

        <input type="submit"></input>
      </form>
    </div>
  );
}

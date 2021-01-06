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
    setCount(0);
    setText("");
    form.target.reset();
  };

  return (
    <div className="sticky mx-10">
      <h3 className="text-xl py-2 px-2">New Post</h3>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <textarea
          className="resize-none w-80 h-64 py-2 px-2"
          onChange={(e) => {
            setText(e.target.value);
            setCount(e.target.value.length);
          }}
          placeholder="Enter Post"
          minLength={1}
          maxLength={300}
        ></textarea>
        <div className="my-4 flex justify-between">
          <span className="text-xl py-2 px-4">{count}/300</span>

          <button
            className="border-solid text-white bg-blue-600 w-max py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:bg-blue-700 hover:scale-110"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

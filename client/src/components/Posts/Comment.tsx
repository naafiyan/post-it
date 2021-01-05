import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { FaTrashAlt } from "react-icons/fa";

export function CommentForm(props: any) {
  const [text, setText] = useState("");

  const { post, update, setUpdate } = props;
  const { user } = useContext(UserContext);

  const handleSubmitComment = (form: any) => {
    form.preventDefault();
    form.target.reset();
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
        setUpdate(!update);
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

export function Comment(props: any) {
  const { comment, updateComments } = props;

  const { user } = useContext(UserContext);
  const [isCommentUser, setIsCommentUser] = useState(false);

  const handleDelete = () => {
    axios
      .delete("http://localhost:3000/comments/" + comment._id, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("id_token") || ""
          )}`,
        },
      })
      .then((res) => {
        updateComments(comment);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user) {
      if (user._id === comment.user._id) {
        return setIsCommentUser(true);
      }
    }
    setIsCommentUser(false);
  }, [user]);

  return (
    <div>
      {comment.text} {comment.user.username}{" "}
      {isCommentUser && (
        <button onClick={handleDelete}>
          <FaTrashAlt />
        </button>
      )}
    </div>
  );
}

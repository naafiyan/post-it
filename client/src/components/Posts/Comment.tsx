import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { FaTrashAlt } from "react-icons/fa";
import API_URL from "../../config/urls";

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
        API_URL + "/comments/new",
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
        setText("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmitComment}>
        <input
          type="text"
          placeholder="Enter Comment"
          onChange={(e) => setText(e.target.value)}
        ></input>
        <button
          className="border-solid text-white bg-blue-600 w-max py-2 px-2 mx-2 rounded-lg text-sm transition duration-200 ease-in-out transform hover:bg-blue-700 hover:scale-110"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export function Comment(props: any) {
  const { comment, updateComments, user } = props;

  // MAJOR BUG:
  // Log in -> post comment -> can see delete button and it works
  // Log out -> log into different account -> post comment -> cannot see delete button
  // Refetch data/refresh page -> can see correct trash can
  // BUT THEN trash can and delete functionality appears on other users' comments too??
  // prevented this on the back end

  // const { user } = useContext(UserContext);
  const [isCommentUser, setIsCommentUser] = useState(false);

  const handleDelete = () => {
    axios
      .delete(API_URL + "/comments/" + comment._id, {
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
    } else {
      setIsCommentUser(false);
    }
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

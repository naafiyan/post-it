import React, { useContext, useEffect } from "react";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useState } from "react";
import axios from "../../config/axios";
import { PostContext } from "../contexts/PostContext";
import { Comment, CommentForm } from "./Comment";

// UI
import { FaTrashAlt } from "react-icons/fa";
import Avatar from "@material-ui/core/Avatar";

const placeHolderAvatar = "";

export default function PostCard(props: any) {
  const { post } = props;
  const { updatePosts } = props;
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [isCommentUpdate, setIsCommentUpdate] = useState(false);

  // format date better i.e. 2 hours ago, 5mins ago etc
  const date_posted_formatted = DateTime.fromISO(
    post.date_posted
  ).toLocaleString(DateTime.DATETIME_FULL);

  const { posts } = useContext(PostContext);

  const { user } = useContext(UserContext);
  const [isPostUser, setIsPostUser] = useState(false);

  // delete button not showing up for some reason
  useEffect(() => {
    if (user) {
      if (user._id === post.user._id) {
        setIsPostUser(true);
        console.log("user logged in");
      }
    } else {
      console.log("user logged out");
      setIsPostUser(false);
    }
  }, [user]);

  const handleDelete = () => {
    axios
      .delete("/posts/" + post._id, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("id_token") || ""
          )}`,
        },
      })
      .then((res) => {
        updatePosts(post);
        // global post context that updates when post is deleted
        // useEffect in PostsPage to refresh on delete
      })
      .catch((err) => console.log(err));
  };

  const updateCommentsDelete = (comment: any) => {
    const newComments = comments.filter((c: any) => c !== comment);
    setComments(newComments);
  };
  // load comments
  useEffect(() => {
    axios.get("/comments/" + post._id).then((res) => {
      console.log(res.data);
      setComments(res.data.comments);
    });
  }, [showComments, isCommentUpdate]);

  const loadComments = () => {
    setShowComments(true);
    //setIsCommentUpdate(!isCommentUpdate);
  };

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-5 max-w-md md:max-2-2xl transition duration-200 transform hover:scale-110">
      <div className="my-2 mx-2">
        <Link to={"/users/" + post.user._id}>
          <div className="flex flex-grow justify-start my-2 mx-2">
            <Avatar alt="Naafiyan Ahmed" src={placeHolderAvatar} />
            <p className="text-s py-2 px-2">{post.user.username}</p>
            <p className="text-xs py-2 px-2">{date_posted_formatted}</p>
          </div>
        </Link>

        <Link to={"/posts/" + post._id}>
          <p className="mx-4 py-2">{post.text}</p>
        </Link>

        <div className="flex justify-between px-2 py-2 ">
          {showComments ? (
            <div>
              <button
                className="text-sm border-solid rounded-sm bg-gray-100 py-2 px-2 rounded-lg hover:bg-gray-200"
                onClick={() => setShowComments(false)}
              >
                Hide Comments
              </button>
              {user && (
                <div className="my-2">
                  <CommentForm
                    user={post.user}
                    post={post}
                    update={isCommentUpdate}
                    setUpdate={setIsCommentUpdate}
                  />
                </div>
              )}
              <ul className="my-2">
                {comments.map((comment) => {
                  return (
                    <li>
                      <Comment
                        user={user}
                        updateComments={updateCommentsDelete}
                        comment={comment}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <button
              className="text-sm border-solid rounded-sm bg-gray-100 py-2 px-2 rounded-lg hover:bg-gray-200"
              onClick={loadComments}
            >
              Comments
            </button>
          )}
          {isPostUser && (
            <button onClick={handleDelete}>
              <FaTrashAlt />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

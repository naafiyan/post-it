import React, { useContext, useEffect } from "react";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useState } from "react";
import axios from "axios";
import { PostContext } from "../contexts/PostContext";
import { Comment } from "./Comment";

export default function PostCard(props: any) {
  const { post } = props;
  const { updatePosts } = props;
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

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
      .delete("http://localhost:3000/posts/" + post._id)
      .then((res) => {
        updatePosts(post);
        // global post context that updates when post is deleted
        // useEffect in PostsPage to refresh on delete
      })
      .catch((err) => console.log(err));
  };

  const loadComments = () => {
    axios.get("http://localhost:3000/comments/" + post._id).then((res) => {
      console.log(res.data);
      setComments(res.data.comments);
      setShowComments(true);
    });
  };

  return (
    <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-20 max-w-md md:max-2-2xl">
      <div className="my-2 mx-2">
        <Link to={"/users/" + post.user._id}>
          <p className="text-s">{post.user.username}</p>
        </Link>
        <Link to={"/posts/" + post._id}>
          <p className="mx-4 py-5 px-20">{post.text}</p>
        </Link>

        {showComments ? (
          <div>
            <button onClick={() => setShowComments(false)}>
              Hide Comments
            </button>
            <ul>
              {comments.map((comment) => {
                return (
                  <li>
                    <Comment comment={comment} />
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <button className="text-xs" onClick={loadComments}>
            View Comments
          </button>
        )}
      </div>

      <div>
        <p className="text-xs py-2 px-2">{date_posted_formatted}</p>
        {isPostUser && <button onClick={handleDelete}>Delete</button>}
      </div>
    </div>
  );
}

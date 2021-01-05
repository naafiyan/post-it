import React, { useContext, useEffect } from "react";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useState } from "react";
import axios from "axios";

export default function PostCard(props: any) {
  const { post } = props;
  const { updatePosts } = props;
  const date_posted_formatted = DateTime.fromISO(
    post.date_posted
  ).toLocaleString(DateTime.DATETIME_FULL);

  const { user } = useContext(UserContext);
  const [isPostUser, setIsPostUser] = useState(false);

  // delete button not showing up for some reason
  useEffect(() => {
    if (user) {
      if (user._id == post.user._id) {
        setIsPostUser(true);
      }
    } else {
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

  return (
    <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-20 max-w-md md:max-2-2xl">
      <Link to={"/posts/" + post._id}>
        <div className="my-2 mx-2">
          <p className="text-s">{post.user.username}</p>

          <p className="text-left mx-4 py-5 px-20">{post.text}</p>
        </div>
      </Link>

      <div>
        <p className="text-xs text-right mx-2">{date_posted_formatted}</p>
        {isPostUser && <button onClick={handleDelete}>Delete</button>}
      </div>
    </div>
  );
}

import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "../../../config/axios";
import Sidebar from "./Sidebar";
import PostsList from "../../Posts/PostsList";
import NewPost from "../../Posts/NewPost";

import { UserContext } from "../../contexts/UserContext";

export default function User({ match }: any) {
  const [user, setUser]: any = useState();
  const [isLoading, setIsLoading]: any = useState(true);

  const loggedInUser = useContext(UserContext);

  console.log("Currently logged in: " + loggedInUser.user._id);

  const [posts, setPosts] = useState([]);

  const fetchData = () => {
    axios
      .get("/users/" + match.params.id)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setIsLoading(false);
      })
      .then((res) => {
        axios
          .get(`/users/${match.params.id}/posts`)
          .then((res) => {
            setPosts(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [match.params.id]);

  // If logged in show edit page options
  // If not logged in just show basic details

  //   "/:userid1/requests/send/:userid2",

  // send friend request
  const handleAdd = () => {
    axios
      .put(`/users/${loggedInUser.user._id}/requests/send/${user._id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("id_token") || ""
          )}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-between">
      {/* side nav*/}
      <Sidebar user={user} />
      {posts.length > 0 && <PostsList posts={posts} setPosts={setPosts} />}
      {user && user._id !== loggedInUser.user._id ? (
        <button onClick={handleAdd}>Add Friend</button>
      ) : (
        ""
      )}
    </div>
  );
}

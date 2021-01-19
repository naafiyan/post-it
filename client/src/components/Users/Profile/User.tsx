import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "../../../config/axios";
import Sidebar from "./Sidebar";
import PostsList from "../../Posts/PostsList";
import NewPost from "../../Posts/NewPost";

import { UserContext } from "../../contexts/UserContext";

export default function User({ match }: any) {
  const [user, setUser]: any = useState({ _id: 2 });
  const [isLoading, setIsLoading]: any = useState(true);

  const loggedInUser = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("/users/" + match.params.id);

      await setUser(res.data);

      const posts = await axios.get(`/users/${match.params.id}/posts`);
      await setPosts(posts.data);
      await setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [match.params.id]);

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
    <div>
      {" "}
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex justify-between">
          {/* side nav*/}
          <Sidebar
            user={user}
            loggedInUser={loggedInUser.user}
            handleAdd={handleAdd}
          />
          {posts.length > 0 && <PostsList posts={posts} setPosts={setPosts} />}
        </div>
      )}
    </div>
  );
}

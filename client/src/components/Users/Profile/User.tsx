import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import PostsList from "../../Posts/PostsList";

import API_URL from "../../../config/urls";

export default function User({ match }: any) {
  const [user, setUser]: any = useState();
  const [isLoading, setIsLoading]: any = useState(true);

  const [posts, setPosts] = useState([]);

  console.log(match.params.id);
  useEffect(() => {
    axios
      .get(API_URL + "/users/" + match.params.id)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // Once user is loaded, fetch posts made by user
  useEffect(() => {
    axios
      .get("http://localhost:3000/users/" + match.params.id + "/posts")
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  // If logged in show edit page options
  // If not logged in just show basic details

  return (
    <div className="flex justify-between">
      {/* side nav*/}
      <Sidebar user={user} />
      {posts && <PostsList posts={posts} setPosts={setPosts} />}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";

export const PostContext = React.createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts/")
      .then((res) => {
        console.log(res.data.posts);
        setPosts(res.data.posts);
      })
      .catch((err) => console.log(err));
  }, [update]);

  return (
    <PostContext.Provider value={{ posts, setPosts, update, setUpdate }}>
      {children}
    </PostContext.Provider>
  );
}

import React, { useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import PostCard from "./PostCard";

export default function PostsList(props: any) {
  const { posts, setPosts, setUpdate, update } = props;

  const updatePosts = (post: any) => {
    setUpdate(!update);
  };

  return (
    <div className="flex flex-col h-full items-center mx-auto w-full">
      <ul className="w-full">
        {posts.map((post: any) => (
          <li className="w-full" key={post._id}>
            <PostCard post={post} updatePosts={updatePosts} />
          </li>
        ))}
      </ul>
    </div>
  );
}

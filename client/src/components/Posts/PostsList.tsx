import React, { useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import PostCard from "./PostCard";

export default function PostsList(props: any) {
  const { posts } = props;
  const { updatePosts } = useContext(PostContext);

  return (
    <div className="flex flex-col items-center w-100">
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

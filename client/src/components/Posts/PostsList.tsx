import React, { useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import PostCard from "./PostCard";

export default function PostsList(props: any) {
  const { posts, setPosts } = props;

  const updatePosts = (post: any) => {
    const newPosts = posts.filter((a: any) => a !== post);
    console.log(newPosts);
    setPosts(posts.filter((a: any) => a !== post));
  };

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

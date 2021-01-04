import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import PostCard from "./PostCard";

export default function PostsPage() {
  const [posts, setPosts]: any = useState([]);

  const { user } = useContext(UserContext);

  // use setTimeOut to refresh for new posts every x seconds

  useEffect(() => {
    // get list of all posts
    axios
      .get("http://localhost:3000/posts/")
      .then((res) => {
        console.log(res.data.posts);
        setPosts(res.data.posts);
      })
      .catch((err) => console.log(err));
  }, []);

  const updatePosts = (post: any) => {
    console.log("I am getting called");
    const newPosts = posts.filter((a: any) => a !== post);
    console.log(newPosts);
    setPosts(posts.filter((a: any) => a !== post));
  };

  //useEffect(() => {}, [posts]);

  return (
    <div>
      {user && (
        <span className="my-4 w-full mr-4">
          <Link to="/posts/new">New Post</Link>
        </span>
      )}
      <div className="flex flex-col items-center w-100">
        <ul className="w-full">
          {posts.map((post: any) => (
            <li className="w-full" key={post._id}>
              <PostCard post={post} updatePosts={updatePosts} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import PostCard from "./PostCard";
import NewPost from "./NewPost";
import { PostContext } from "../contexts/PostContext";

import PostsList from "./PostsList";

export default function PostsPage() {
  //const [posts, setPosts]: any = useState([]);

  const { user } = useContext(UserContext);
  const { posts, setPosts, setUpdate, update } = useContext(PostContext);

  useEffect(() => {
    setUpdate(!update);
  }, []);

  // maybe create an auto refresh with setTimeout
  // could do it in PostContext

  // implementation for postpage

  return (
    <div className="flex justify-evenly">
      {user ? (
        <div className="ml-6 my-6">
          <NewPost />
        </div>
      ) : (
        <div className="">
          <p className="ml-6 my-6">You must be logged in to post!</p>
        </div>
      )}{" "}
      <PostsList
        posts={posts}
        setPosts={setPosts}
        setUpdate={setUpdate}
        update={update}
      />
    </div>
  );
}

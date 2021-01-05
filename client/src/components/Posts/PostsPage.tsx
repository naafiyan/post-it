import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import PostCard from "./PostCard";
import NewPost from "./NewPost";
import { PostContext } from "../contexts/PostContext";

export default function PostsPage() {
  //const [posts, setPosts]: any = useState([]);

  const { user } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);

  // maybe create an auto refresh with setTimeout
  // could do it in PostContext

  const updatePosts = (post: any) => {
    const newPosts = posts.filter((a: any) => a !== post);
    console.log(newPosts);
    setPosts(posts.filter((a: any) => a !== post));
  };

  return (
    <div>
      {user && (
        <span className="my-4 w-full mr-4">
          <NewPost />
        </span>
      )}
      {!user && <p>You must be logged in to post!</p>}
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

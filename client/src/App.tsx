import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Login from "./components/Users/Login";
import Post from "./components/Posts/Post";
import User from "./components/Users/Profile/User";
import PostsPage from "./components/Posts/PostsPage";
import Signup from "./components/Users/Signup";
import NewPost from "./components/Posts/NewPost";
import FriendPage from "./components/Users/Friends/FriendPage";

// Context
import { UserProvider } from "./components/contexts/UserContext";
import { PostProvider } from "./components/contexts/PostContext";

function App() {
  return (
    <UserProvider>
      <PostProvider>
        <Router>
          <div className="App bg-gray-100 min-h-screen">
            <Navbar />
            <Switch>
              <Route path="/" exact component={PostsPage} />
              <Route path="/login" exact component={Login} />
              <Route path="/sign-up" exact component={Signup} />
              <Route path="/posts/:id" exact component={Post} />
              <Route path="/users/:id" exact component={User} />
              <Route path="/friends" exact component={FriendPage} />
            </Switch>
          </div>
        </Router>
      </PostProvider>
    </UserProvider>
  );
}

export default App;

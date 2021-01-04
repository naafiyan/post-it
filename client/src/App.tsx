import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Login from "./components/Users/Login";
import Post from "./components/Posts/Post";
import User from "./components/Users/User";
import PostsPage from "./components/Posts/PostsPage";
import Signup from "./components/Users/Signup";
import NewPost from "./components/Posts/NewPost";

// Context
import { UserProvider } from "./components/contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={PostsPage} />
            <Route path="/login" exact component={Login} />
            <Route path="/sign-up" exact component={Signup} />
            <Route path="/posts/new" exact component={NewPost} />
            <Route path="/posts/:id" exact component={Post} />
            <Route path="/users/:id" exact component={User} />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { UserContext } from "./contexts/UserContext";
import axios from "axios";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleLogout = () => {
    axios.get("http://localhost:3000/users/log-out");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="flex justify-start bg-blue-400">
      <div className="m-auto">
        <NavLink to="/">Posts</NavLink>
      </div>

      <div className="mx-4 my-4">
        {isLoggedIn && (
          <div>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        )}
        {!isLoggedIn && (
          <div className="flex justify-end">
            <span className="mx-2">
              <NavLink to="/login">Login</NavLink>
            </span>
            <span>
              <NavLink to="/sign-up">Sign-Up</NavLink>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

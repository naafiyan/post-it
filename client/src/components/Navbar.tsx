import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { UserContext } from "./contexts/UserContext";
import axios from "axios";

import { useHistory } from "react-router-dom";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleLogout = () => {
    axios.get("http://localhost:3000/users/log-out");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user");
    setUser(null);
    history.push("/");
  };

  return (
    <div className="flex flex-col text-center sm:flex-row sm:text-left sm:justify-between px-6 bg-gray-800 text-white shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <NavLink to="/">
          <p className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">
            Posts
          </p>
        </NavLink>
      </div>

      <div className="mx-4 my-4">
        {isLoggedIn && user && (
          <div className="flex justify-end">
            <NavLink to={"/users/" + user._id}>
              <p className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">
                {user.username}
              </p>
            </NavLink>
            <button
              className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        )}
        {!isLoggedIn && (
          <div className="flex justify-end">
            <span className="mx-2">
              <NavLink to="/login">
                <p className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">
                  Login
                </p>
              </NavLink>
            </span>
            <span>
              <NavLink to="/sign-up">
                <p className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">
                  Sign Up
                </p>
              </NavLink>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

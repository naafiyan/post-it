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
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-gray-800 text-white shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <NavLink to="/">
          <p className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">
            Posts
          </p>
        </NavLink>
      </div>

      <div className="mx-4 my-4">
        {isLoggedIn && (
          <div>
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

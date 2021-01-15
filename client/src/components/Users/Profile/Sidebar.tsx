import React from "react";

import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Sidebar(props: any) {
  const { user, loggedInUser, handleAdd } = props;

  console.log(loggedInUser.friendList.includes(user._id));
  return (
    <div className="h-60 w-60 px-20 my-20">
      {user && (
        <div className="h-content w-60 bg-white shadow-lg rounded-lg flex flex-col items-center py-10">
          <Avatar src="" alt="Naafiyan Ahmed" />
          <h3 className="text-xl py-6">{user.username}</h3>
          <p className="px-6 pb-4 text-center">
            Hi my name is {user.username}.
          </p>

          {loggedInUser !== null && user._id !== loggedInUser._id ? (
            loggedInUser.friendList.includes(user._id) ? (
              <p>You are friends</p>
            ) : loggedInUser.friendRequests.includes(user._id) ? (
              <Link to={"/friends"}>
                <button className="border-solid text-white bg-green-500 w-max py-2 px-4 my-2 rounded-lg transition duration-200 ease-in-out transform hover:bg-green-600 hover:scale-110">
                  View Request
                </button>
              </Link>
            ) : (
              <button
                className="border-solid text-white bg-green-500 w-max py-2 px-4 my-2 rounded-lg transition duration-200 ease-in-out transform hover:bg-green-600 hover:scale-110"
                onClick={handleAdd}
              >
                Add Friend
              </button>
            )
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

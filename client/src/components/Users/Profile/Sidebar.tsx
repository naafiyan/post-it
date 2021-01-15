import React from "react";

import { Avatar } from "@material-ui/core";

export default function Sidebar(props: any) {
  const { user } = props;
  return (
    <div className="h-60 w-60 px-20 my-20">
      {user && (
        <div className="h-60 w-60 bg-white shadow-lg rounded-lg flex flex-col items-center py-10">
          <Avatar src="" alt="Naafiyan Ahmed" />
          <h3 className="text-xl py-6">{user.username}</h3>
          <p className="px-6 pb-4 text-center">
            Hi my name is {user.username}.
          </p>
        </div>
      )}
    </div>
  );
}

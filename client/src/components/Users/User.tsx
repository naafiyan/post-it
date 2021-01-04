import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function User() {
  const { user } = useContext(UserContext);

  // If logged in show edit page options
  // If not logged in just show basic details

  return (
    <div>
      <h3>{user.user.username}</h3>
    </div>
  );
}

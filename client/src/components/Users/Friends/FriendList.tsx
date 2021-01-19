import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../config/axios";

export default function FriendList({ user, setUpdate, update }: any) {
  const [friends, setFriends] = useState([]);

  // find a way to update the friendList and friendRequests of the localStorage that is sent and set in UserContext
  // directly updating the user friendRequests in localStorage??
  // or refetching the user friendRequests

  const fetchData = async () => {
    try {
      const res = await axios.get(`/users/${user._id}/friends`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("id_token") || ""
          )}`,
        },
      });
      await setFriends(res.data.list);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user !== null) {
      fetchData();
    }
  }, [update, user]);

  return (
    <div>
      <h3>Friends</h3>
      <ul>
        {user && friends.length > 0 ? (
          friends.map((friend: any) => (
            <li>
              <Link to={"/users/" + friend._id}>{friend.username}</Link>
            </li>
          ))
        ) : (
          <p>No Friends :(</p>
        )}
      </ul>
    </div>
  );
}

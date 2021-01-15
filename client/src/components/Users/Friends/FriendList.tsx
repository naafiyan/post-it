import React, { useEffect, useState } from "react";
import axios from "../../../config/axios";

export default function FriendList({ user, setUpdate, update }: any) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (user !== null) {
      axios
        .get(`/users/${user._id}/friends`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("id_token") || ""
            )}`,
          },
        })
        .then((res) => {
          setFriends(res.data.list);
          console.log(res.data.list);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [update]);

  return (
    <div>
      <h3>Friends</h3>
      <ul>
        {user && friends.length > 0 ? (
          friends.map((friend: any) => <li>{friend.username}</li>)
        ) : (
          <p>No Friends :(</p>
        )}
      </ul>
    </div>
  );
}

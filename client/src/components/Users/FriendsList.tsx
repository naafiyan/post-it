import React, { useContext, useEffect, useState } from "react";
import axios from "../../config/axios";
import { UserContext } from "../contexts/UserContext";

export default function FriendsList({ match }: any) {
  const [requests, setRequests] = useState([]);
  const userCtx: any = useContext(UserContext);
  const user = userCtx.user;

  console.log(user);

  // fetch user's friendRequests
  useEffect(() => {
    axios
      .get(`/users/${match.params.id}/requests`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("id_token") || ""
          )}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div></div>;
}

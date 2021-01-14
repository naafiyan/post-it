import { useContext, useEffect, useState } from "react";
import axios from "../../config/axios";
import { UserContext } from "../contexts/UserContext";

export default function FriendsList({ match }: any) {
  const [requests, setRequests] = useState([]);
  const userCtx: any = useContext(UserContext);
  const user = userCtx.user;

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
        const newRequests: any = requests;
        newRequests.push(res.data);
        setRequests(newRequests);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {requests.length > 0
        ? requests.map((friend: any) => <div>{friend.username}</div>)
        : ""}
    </div>
  );
}

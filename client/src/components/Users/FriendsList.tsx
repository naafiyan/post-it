import { useContext, useEffect, useState } from "react";
import axios from "../../config/axios";
import { UserContext } from "../contexts/UserContext";

export default function FriendsList({ match }: any) {
  const [requests, setRequests]: any = useState([[]]);
  const userCtx: any = useContext(UserContext);
  const user = userCtx.user;

  console.log("Mounted");

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
        setRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(requests);

  // TODO: why tf does requests not render properly
  return (
    <div>
      <ul>
        {requests && requests.length > 0
          ? requests.map((friend: any, idx: number) => (
              <li key={idx}>{friend.username}</li>
            ))
          : ""}
      </ul>
    </div>
  );
}

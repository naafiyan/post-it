import { useContext, useEffect, useState } from "react";
import axios from "../../config/axios";
import { UserContext } from "../contexts/UserContext";

export default function FriendsList({ match }: any) {
  const [requests, setRequests]: any = useState([[]]);
  const [update, setUpdate]: any = useState(false);
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
  }, [update]);

  console.log(requests);

  const handleAccept = async (id: any) => {
    try {
      const res = await axios.put(`/users/${user._id}/requests/accept/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("id_token") || ""
          )}`,
        },
      });
      console.log(res);

      // refreshes friendslist
      setUpdate(!update);
    } catch (err) {
      console.log(err);
    }
  };

  // TODO: why tf does requests not render properly
  return (
    <div>
      <ul>
        {requests && requests.length > 0
          ? requests.map((friend: any, idx: number) => (
              <li key={idx}>
                {" "}
                <div>
                  {friend.username}
                  <button onClick={() => handleAccept(friend._id)}>
                    Accept
                  </button>
                </div>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
}

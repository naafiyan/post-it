import { useContext, useEffect, useState } from "react";
import axios from "../../../config/axios";
import { UserContext } from "../../contexts/UserContext";

export default function FriendRequests({
  match,
  user,
  update,
  setUpdate,
}: any) {
  const [requests, setRequests]: any = useState([]);

  console.log("Mounted");

  // fetch user's friendRequests
  useEffect(() => {
    if (user !== null) {
      axios
        .get(`/users/${user._id}/requests`, {
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
    }
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
      <h3>Pending Requests</h3>
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

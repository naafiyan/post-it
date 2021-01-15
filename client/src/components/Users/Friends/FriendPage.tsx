import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import FriendList from "./FriendList";
import FriendRequests from "./FriendRequests";

export default function FriendsPage({ match }: any) {
  const [update, setUpdate]: any = useState(false);
  const userCtx: any = useContext(UserContext);
  const user = userCtx.user;
  return (
    <div>
      <FriendList match={match} />
      <FriendRequests
        match={match}
        user={user}
        update={update}
        setUpdate={setUpdate}
      />
    </div>
  );
}

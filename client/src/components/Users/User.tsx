import React, { useEffect, useState } from "react";
import axios from "axios";

export default function User({ match }: any) {
  const [user, setUser]: any = useState();
  const [isLoading, setIsLoading]: any = useState(true);

  console.log(match.params.id);
  useEffect(() => {
    axios
      .get("http://localhost:3000/users/" + match.params.id)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  });

  // If logged in show edit page options
  // If not logged in just show basic details

  return (
    <div>
      {!isLoading ? (
        user ? (
          <div>
            <h3>{user.username}</h3>
          </div>
        ) : (
          !user && <p>User not found</p>
        )
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

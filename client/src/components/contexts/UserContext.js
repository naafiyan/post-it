import React, { useEffect, useState } from "react";

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // figure out a way to have friend requests and friend list update instead of relying on the frozen localStorage item

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setUser(JSON.parse(localStorage.getItem("user") || ""));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

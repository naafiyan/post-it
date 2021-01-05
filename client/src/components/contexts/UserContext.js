import React, { useEffect, useState } from "react";

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      console.log(JSON.parse(localStorage.getItem("user") || ""));
      setUser(JSON.parse(localStorage.getItem("user") || ""));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userContext = useContext(UserContext);

  // handle login
  const handleSubmit = (form: any) => {
    form.preventDefault();
    axios
      .post("http://localhost:3000/users/login", { username, password })
      .then((res) => {
        userContext.setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    form.target.reset();
  };

  return (
    <div className="login">
      <form onSubmit={(e) => handleSubmit(e)} action="" method="post">
        <label htmlFor="username">Username:</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          placeholder="Enter Username"
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Enter Password"
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}

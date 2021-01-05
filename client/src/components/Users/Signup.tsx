import axios from "axios";
import { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (form: any) => {
    form.preventDefault();
    axios
      .post(
        "http://localhost:3000/users/sign-up",
        { username, password, email },
        { headers: { "Content-type": "application/json" } }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="sign-up">
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
        <label htmlFor="email">Email:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="Enter Email"
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}

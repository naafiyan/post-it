import axios from "../../config/axios";

export const handleLogin = (
  username: string,
  password: string,
  userContext: any,
  update: any,
  setUpdate: any,
  history: any
) => {
  axios
    .post(
      "/users/login",
      { username, password }
      //{ headers: { "Content-type": "application/json" } }
    )
    .then((res) => {
      userContext.setUser(res.data.user);
      localStorage.setItem("id_token", JSON.stringify(res.data.token));
      localStorage.setItem("userId", JSON.stringify(res.data.user._id));
      setUpdate(!update);
      history.push("/");
    })
    .catch((err) => {
      console.error(err);
    });
};

export const handleLogout = (history: any, setUser: any) => {
  axios.get("/users/log-out");
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");
  localStorage.removeItem("user");
  setUser(null);
  history.push("/");
};

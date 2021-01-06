import axios from "axios";
import API_URL from "../../config/urls";

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
      API_URL + "/users/login",
      { username, password }
      //{ headers: { "Content-type": "application/json" } }
    )
    .then((res) => {
      userContext.setUser(res.data.user);
      console.log(res.data);
      localStorage.setItem("id_token", JSON.stringify(res.data.token));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUpdate(!update);
      history.push("/");
    })
    .catch((err) => console.error(err));
};

export const handleLogout = (history: any, setUser: any) => {
  axios.get(API_URL + "/users/log-out");
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");
  localStorage.removeItem("user");
  setUser(null);
  history.push("/");
};

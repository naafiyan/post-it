import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userContext = useContext(UserContext);

  // handle login
  const handleSubmit = (form: any) => {
    form.preventDefault();
    axios
      .post(
        "http://localhost:3000/users/login",
        { username, password }
        //{ headers: { "Content-type": "application/json" } }
      )
      .then((res) => {
        userContext.setUser(res.data);
        localStorage.setItem("id_token", JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log(res.data);
      })
      .catch((err) => console.error(err));
    form.target.reset();
  };

  return (
    <div className="login flex flex-col h-90vh bg-gray-100 overflow-hidden">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Login
          </h2>

          <form
            className="mt-10"
            onSubmit={(e) => handleSubmit(e)}
            action=""
            method="post"
          >
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-gray-600 uppercase text-left"
            >
              Username:
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              placeholder="Enter Username"
              className="block w-full py-3 px-1 mt-2 
              text-gray-800 appearance-none 
              border-b-2 border-gray-100
              focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
            ></input>
            <label
              htmlFor="password"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase text-left"
            >
              Password:
            </label>
            <input
              className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Enter Password"
            ></input>
            <button
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
              type="submit"
            >
              Login
            </button>
            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <span className="underline text-center">
                <Link to="/sign-up">Sign Up</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

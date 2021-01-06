import axios from "axios";
import { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors]: any = useState({});

  const handleValidation = (form: any) => {
    // Add more validation i.e. username is already taken

    const fields: any = {
      username: form.target.username.value,
      password: form.target.password.value,
      email: form.target.email.value,
    };
    const locErrors = {
      username: "",
      password: "",
      email: "",
    };
    let isValid = true;
    //Name
    if (!fields["username"]) {
      isValid = false;
      locErrors["username"] = "Cannot be empty";
    }

    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z]+$/)) {
        isValid = false;
        locErrors["username"] = "Can only contain letters";
      }
    }

    // Password
    if (!fields["password"]) {
      isValid = false;
      locErrors["password"] = "Cannot be empty";
    }

    if (typeof fields["password"] !== "undefined") {
      if (fields["password"].length < 8) {
        isValid = false;
        locErrors["password"] = "Password must be atleast 8 characters";
      }
    }

    //Email
    if (!fields["email"]) {
      isValid = false;
      locErrors["email"] = "Cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        isValid = false;
        locErrors["email"] = "Email is not valid (i.e. abc@mail.com)";
      }
    }
    setErrors(locErrors);
    return isValid;
  };

  const handleSubmit = (form: any) => {
    form.preventDefault();
    if (!handleValidation(form)) {
      console.log("form err");
      return;
    }
    console.log(form.target.username.value);
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
    <div className="sign-up flex flex-col h-90vh bg-gray-100 overflow-hidden">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Sign Up
          </h2>
          <form
            className="mt-10"
            onSubmit={(e) => handleSubmit(e)}
            action=""
            method="post"
          >
            <label
              className="block text-xs font-semibold text-gray-600 uppercase text-left"
              htmlFor="username"
            >
              Username:{" "}
              <span className="text-red-500">{errors["username"]}</span>
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
              Password:{" "}
              <span className="text-red-500">{errors["password"]}</span>
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Enter Password"
              className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
            ></input>
            <label
              htmlFor="email"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase text-left"
            >
              Email: <span className="text-red-500">{errors["email"]}</span>
            </label>
            <input
              className="block w-full py-3 px-1 mt-2 mb-4
            text-gray-800 appearance-none 
            border-b-2 border-gray-100
            focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              placeholder="Enter Email"
            ></input>
            <button
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

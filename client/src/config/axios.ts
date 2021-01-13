import axios from "axios";

const instance = axios.create({
  //baseURL: "https://post-it-naafiyan.herokuapp.com/api",
  baseURL: "http://localhost:5000/api",
});

export default instance;

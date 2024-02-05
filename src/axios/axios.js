import axios from "axios";

const request = axios.create({
  baseURL: "https://foodi-aa6f.onrender.com/api/v1",
});

export default request;

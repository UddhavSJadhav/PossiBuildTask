import axios from "axios";

const API = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

export default API;

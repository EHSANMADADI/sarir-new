import axios from "axios";

const api = axios.create({
  baseURL: "https://195.191.45.56:17017",
});

export default api;
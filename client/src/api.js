import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://linkedin-clone-ifph.onrender.com/api"),
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;

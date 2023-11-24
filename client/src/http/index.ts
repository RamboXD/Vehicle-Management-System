import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json", // Set the default Content-Type here
  },
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // If you want to ensure Content-Type is set for every request:
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default $api;

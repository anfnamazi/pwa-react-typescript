import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

http.interceptors.request.use(
  (config) => {
    // More configuration
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default http;

import axios from "axios";

import { getToken } from "../utils/auth-storage";

const baseURL: string | undefined = import.meta.env.VITE_BASE_URL;

const http = axios.create({
  baseURL,
  timeout: 10000,
  timeoutErrorMessage: "The request took too long to process.",
});

http.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers["Authorization"] = `Bearer ${getToken()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(function (response) {
  return response;
});

export default http;

import axios from "axios";
import { USER_CREDENTIAL } from "../utils/Constants";
const apiClient = axios.create({
  baseURL: "http://localhost:4567",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// add authorization header automatically
apiClient.interceptors.request.use(
  (config) => {
    // Perform actions before the request is sent
    // For example, add an authorization header if the user is logged in
    const token = localStorage.getItem(USER_CREDENTIAL);
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    console.log("client api : Request:", config.headers); // For debugging
    return config;
  },
  (error) => {
    // Handle request errors (e.g., invalid configuration)
    // console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful responses (status code 2xx)
    // console.log('Response:', response);
    return response;
  },
  (error) => {
    // Handle error responses (status codes outside 2xx)
    // For example, redirect to login if the user is unauthorized
    // if (error.response?.status === 401) {
    //   window.location.href = '/login'; // Redirect to login page
    // }
    // console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;

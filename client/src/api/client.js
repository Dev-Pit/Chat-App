import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://localhost:4567/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  // timeout: 10000,
});

// add authorization header automatically
apiClient.interceptors.request.use(
  (config) => {
    // Perform actions before the request is sent
    // For example, add an authorization header if the user is logged in
    // Check if it's a POST request
    if (config.method === "post") {
      console.log("🚀 Intercepted POST request to:", config.url);
      console.log("📦 Request body:", config.data);

      // Example: attach a custom header or modify data
      // config.headers["X-Custom-Post-Header"] = "MERN-Rocks";
      // config.data.timestamp = new Date().toISOString(); // optional
    }

    console.log("\nclient api : Request:", config.headers); // For debugging
    return config;
  },
  (error) => {
    // Handle request errors (e.g., invalid configuration)
    console.error("\nRequest Error in Axios:", error);
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
    console.error("Response Error in Axios:", error);
    return Promise.reject(error);
  }
);

export default apiClient;

import apiClient from "./client";

const userApi = {
  userLogin: (data) => apiClient.post("/auth/login", data),
  postUser: (data) => apiClient.post("/auth/register", data),
};

export default userApi;

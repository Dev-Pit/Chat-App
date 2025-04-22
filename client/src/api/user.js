import apiClient from "./client";

const userApi = {
  userLogin: (data) => apiClient.post("/user/login", data),
  userLogout: () => apiClient.post("/user/logout"),

  postUser: (data) => apiClient.post("/user/register", data),
  dashboard: () => apiClient.get("/dashboard"),
};

export default userApi;

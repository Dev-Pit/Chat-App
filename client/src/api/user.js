import apiClient from "./client";

const userApi = {
  userLogin: (data) => {
    console.log(`client: userAPI: ${JSON.stringify(data)}`);
    return apiClient.post("/auth/login", data);
  },
  postUser: (data) => apiClient.post("/auth/register", data),
  dashboard: (data) => apiClient.post("/dashboard", data),
};

export default userApi;

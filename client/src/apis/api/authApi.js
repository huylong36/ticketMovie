import { ApiClient } from "../config";
const authApi = {
  loginApi: async (payload) => {
    return await ApiClient.post("/user/login", payload);
  },
  registerApi: async (payload) => {
    return await ApiClient.post("/user/register", payload);
  },
};
export default authApi;

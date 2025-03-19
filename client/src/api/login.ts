import { apiClient } from "./apiClient";

export const loginReq = async (email: string, password: string): Promise<any> => {
  try {
    const response = await apiClient.post("/user/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error("Login failed. Please try again");
  }
};
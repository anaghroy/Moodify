import axiosInstance from "../../../lib/axios";

export async function registerAPI(data) {
  const response = await axiosInstance.post("/auth/register", data);

  return response.data;
}
export async function loginAPI(data) {
  const response = await axiosInstance.post("/auth/login", data);

  return response.data;
}

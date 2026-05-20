import axiosInstance from "./axiosInstance";

export const getCourierMessagesApi = async (courierId) => {
  const response = await axiosInstance.get(`/chat/${courierId}`);
  return response.data;
};
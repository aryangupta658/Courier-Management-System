import axiosInstance from "./axiosInstance";

export const createCourierApi = async (data) => {
  const response = await axiosInstance.post("/couriers", data);
  return response.data;
};

export const getMyCouriersApi = async () => {
  const response = await axiosInstance.get("/couriers/my-couriers");
  return response.data;
};

export const trackCourierApi = async (trackingId) => {
  const response = await axiosInstance.get(`/couriers/track/${trackingId}`);
  return response.data;
};

export const getCourierByIdApi = async (id) => {
  const response = await axiosInstance.get(`/couriers/${id}`);
  return response.data;
};

export const cancelCourierApi = async (id) => {
  const response = await axiosInstance.put(`/couriers/${id}/cancel`);
  return response.data;
};
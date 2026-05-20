import axiosInstance from "./axiosInstance";

export const registerUserApi = async (formData) => {
  const response = await axiosInstance.post("/auth/register", formData);
  return response.data;
};

export const loginUserApi = async (formData) => {
  const response = await axiosInstance.post("/auth/login", formData);
  return response.data;
};

export const getProfileApi = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};

export const forgotPasswordApi = async (email) => {
  const response = await axiosInstance.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

export const resetPasswordApi = async (payload) => {
  const response = await axiosInstance.post("/auth/reset-password", payload);
  return response.data;
};
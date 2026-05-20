import axiosInstance from "./axiosInstance";

export const createRazorpayOrderApi = async (amount) => {
  const response = await axiosInstance.post("/payments/create-order", {
    amount,
  });

  return response.data;
};

export const verifyPaymentApi = async (paymentData) => {
  const response = await axiosInstance.post("/payments/verify", paymentData);
  return response.data;
};
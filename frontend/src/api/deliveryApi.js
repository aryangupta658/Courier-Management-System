import axiosInstance from "./axiosInstance";

export const getAssignedCouriersApi = async () => {
  const response = await axiosInstance.get("/delivery/assigned-couriers");
  return response.data;
};

export const updateDeliveryStatusApi = async (courierId, status) => {
  const response = await axiosInstance.put(
    `/delivery/couriers/${courierId}/status`,
    {
      status
    }
  );

  return response.data;
};

export const updateDeliveryLocationApi = async (courierId, lat, lng) => {
  const response = await axiosInstance.put(
    `/delivery/couriers/${courierId}/location`,
    {
      lat,
      lng
    }
  );

  return response.data;
};

export const uploadDeliveryProofApi = async (courierId, file) => {
  const formData = new FormData();
  formData.append("proofImage", file);

  const response = await axiosInstance.post(
    `/delivery/couriers/${courierId}/upload-proof`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return response.data;
};

export const sendDeliveryOtpApi = async (courierId) => {
  const response = await axiosInstance.post(
    `/delivery/couriers/${courierId}/send-delivery-otp`
  );

  return response.data;
};

export const verifyDeliveryOtpApi = async (courierId, otp) => {
  const response = await axiosInstance.post(
    `/delivery/couriers/${courierId}/verify-delivery-otp`,
    {
      otp
    }
  );

  return response.data;
};
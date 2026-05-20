import axiosInstance from "./axiosInstance";

export const getAdminStatsApi = async () => {
  const response = await axiosInstance.get("/admin/dashboard-stats");
  return response.data;
};

export const getAllUsersApi = async () => {
  const response = await axiosInstance.get("/admin/users");
  return response.data;
};

export const getUserByIdApi = async (id) => {
  const response = await axiosInstance.get(`/admin/users/${id}`);
  return response.data;
};

export const updateUserByAdminApi = async (id, data) => {
  const response = await axiosInstance.put(`/admin/users/${id}`, data);
  return response.data;
};

export const deleteUserByAdminApi = async (id) => {
  const response = await axiosInstance.delete(`/admin/users/${id}`);
  return response.data;
};

export const updateUserStatusApi = async (id, isActive) => {
  const response = await axiosInstance.put(`/admin/users/${id}/status`, {
    isActive,
  });
  return response.data;
};

export const getAllCouriersApi = async () => {
  const response = await axiosInstance.get("/admin/couriers");
  return response.data;
};

export const getCourierByAdminApi = async (id) => {
  const response = await axiosInstance.get(`/admin/couriers/${id}`);
  return response.data;
};

export const updateCourierByAdminApi = async (id, data) => {
  const response = await axiosInstance.put(`/admin/couriers/${id}`, data);
  return response.data;
};

export const deleteCourierByAdminApi = async (id) => {
  const response = await axiosInstance.delete(`/admin/couriers/${id}`);
  return response.data;
};

export const getDeliveryBoysApi = async () => {
  const response = await axiosInstance.get("/admin/delivery-boys");
  return response.data;
};

export const assignCourierApi = async (courierId, deliveryBoyId) => {
  const response = await axiosInstance.put(
    `/admin/couriers/${courierId}/assign`,
    {
      deliveryBoyId,
    }
  );
  return response.data;
};

export const updateCourierStatusApi = async (courierId, status, note = "") => {
  const response = await axiosInstance.put(
    `/admin/couriers/${courierId}/status`,
    {
      status,
      note,
    }
  );
  return response.data;
};
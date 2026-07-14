import axiosInstance from "./axiosInstance";

import { unwrapResponse } from "../utils/apiHelper";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

export const getProfile = async () => {
  return axiosInstance
    .get(API_ENDPOINTS.PROFILE.BASE)
    .then(unwrapResponse);
};

export const updateProfile = async (profile) => {
  return axiosInstance
    .put(API_ENDPOINTS.PROFILE.BASE, profile)
    .then(unwrapResponse);
};

export const changePassword = async (passwordData) => {
  return axiosInstance
    .put(
      API_ENDPOINTS.PROFILE.CHANGE_PASSWORD,
      passwordData
    )
    .then(unwrapResponse);
};
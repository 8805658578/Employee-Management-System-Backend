import axiosInstance from "./axiosInstance";
import { unwrapResponse } from "../utils/apiHelper";

import { API_ENDPOINTS } from "../utils/apiEndpoints";

export const getLeaves = async () => {
  return axiosInstance
    .get(API_ENDPOINTS.LEAVES.BASE)
    .then(unwrapResponse);
};

export const getLeaveById = async (id) => {
  return axiosInstance
    .get(API_ENDPOINTS.LEAVES.BASE + `/${id}`)
    .then(unwrapResponse);
};

export const createLeave = async (leave) => {
  return axiosInstance
    .post(API_ENDPOINTS.LEAVES.BASE, leave)
    .then(unwrapResponse);
};

export const approveLeave = async (id) => {
  return axiosInstance
    .put(API_ENDPOINTS.LEAVES.BASE + `/${id}/approve`)
    .then(unwrapResponse);
};

export const rejectLeave = async (id) => {
  return axiosInstance
    .put(API_ENDPOINTS.LEAVES.BASE + `/${id}/reject`)
    .then(unwrapResponse);
};

export const getLeaveHistory = async () => {
  return axiosInstance
    .get(API_ENDPOINTS.LEAVES.HISTORY)
    .then(unwrapResponse);
};
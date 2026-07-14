import axiosInstance from "./axiosInstance";
import { unwrapResponse } from "../utils/apiHelper";

import { API_ENDPOINTS } from "../utils/apiEndpoints";

export const getDepartments = async () => {
  return axiosInstance
    .get(API_ENDPOINTS.DEPARTMENTS.BASE)
    .then(unwrapResponse);
};

export const getDepartmentById = async (id) => {
  return axiosInstance
    .get(API_ENDPOINTS.DEPARTMENTS.BASE + `/${id}`)
    .then(unwrapResponse);
};

export const createDepartment = async (department) => {
  return axiosInstance
    .post(API_ENDPOINTS.DEPARTMENTS.BASE, department)
    .then(unwrapResponse);
};

export const updateDepartment = async (id, department) => {
  return axiosInstance
    .put(API_ENDPOINTS.DEPARTMENTS.BASE + `/${id}`, department)
    .then(unwrapResponse);
};

export const deleteDepartment = async (id) => {
  return axiosInstance
    .delete(API_ENDPOINTS.DEPARTMENTS.BASE + `/${id}`)
    .then(unwrapResponse);
};
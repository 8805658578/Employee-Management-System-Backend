import axiosInstance from "./axiosInstance";

import { unwrapResponse } from "../utils/apiHelper";

import { API_ENDPOINTS } from "../utils/apiEndpoints";

export const getEmployees = async () => {
  return axiosInstance
    .get(API_ENDPOINTS.EMPLOYEES.BASE)
    .then(unwrapResponse);
};


export const getEmployeeById = async (id) => {
  return axiosInstance
    .get(API_ENDPOINTS.EMPLOYEES.BASE + `/${id}`)
    .then(unwrapResponse);
};

export const createEmployee = async (employee) => {
  return axiosInstance
    .post(API_ENDPOINTS.EMPLOYEES.BASE, employee)
    .then(unwrapResponse);
};

export const updateEmployee = async (id, employee) => {
  return axiosInstance
    .put(API_ENDPOINTS.EMPLOYEES.BASE + `/${id}`, employee)
    .then(unwrapResponse);
};

export const deleteEmployee = async (id) => {
  return axiosInstance
    .delete(API_ENDPOINTS.EMPLOYEES.BASE + `/${id}`)
    .then(unwrapResponse);
};
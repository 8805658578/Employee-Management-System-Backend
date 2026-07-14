import axiosInstance from "./axiosInstance";
import { unwrapResponse } from "../utils/apiHelper";

import { API_ENDPOINTS } from "../utils/apiEndpoints";

export const getDashboardSummary = async () => {
  return axiosInstance
    .get(API_ENDPOINTS.DASHBOARD.SUMMARY)
    .then(unwrapResponse);
};
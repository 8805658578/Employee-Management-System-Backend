export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    LOGOUT: "/api/v1/auth/logout",
    REFRESH: "/api/v1/auth/refresh",
  },

  DASHBOARD: {
    SUMMARY: "/api/v1/dashboard/summary",
  },

  EMPLOYEES: {
    BASE: "/api/v1/employees",
  },

  DEPARTMENTS: {
    BASE: "/api/v1/departments",
  },

  LEAVES: {
    BASE: "/api/v1/leaves",
    HISTORY: "/api/v1/leaves/history",
  },

  PROFILE: {
    BASE: "/api/v1/profile",
    CHANGE_PASSWORD: "/api/v1/profile/change-password",
  },
};
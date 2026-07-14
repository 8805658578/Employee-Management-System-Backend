import axiosInstance from "./axiosInstance";

/**
 * Login User
 */
export const login = async (credentials) => {
  const response = await axiosInstance.post(
    "/api/v1/auth/login",
    credentials
  );

  return response.data;
};

/**
 * Register User
 */
export const register = async (userData) => {
  const response = await axiosInstance.post(
    "/api/v1/auth/register",
    userData
  );

  return response.data;
};

/**
 * Validate JWT Token
 */
export const validateToken = async (token) => {
  const response = await axiosInstance.get(
    "/api/v1/auth/validate",
    {
      params: {
        token,
      },
    }
  );

  return response.data;
};

/**
 * Logout
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
import { STORAGE_KEYS } from "./apiConstants";

export const getToken = () => {
  return localStorage.getItem(
    STORAGE_KEYS.TOKEN
  );
};

export const getUser = () => {
  const user = localStorage.getItem(
    STORAGE_KEYS.USER
  );

  return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
  localStorage.removeItem(
    STORAGE_KEYS.TOKEN
  );

  localStorage.removeItem(
    STORAGE_KEYS.USER
  );
};

let redirecting = false;

export const redirectToLogin = () => {
  if (redirecting) return;

  redirecting = true;

  clearAuth();

  window.location.replace("/login");
};
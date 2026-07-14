import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { STORAGE_KEYS } from "../utils/apiConstants";
import { clearAuth } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(
      STORAGE_KEYS.TOKEN
    );

    const storedUser = localStorage.getItem(
      STORAGE_KEYS.USER
    );

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (jwtToken, loggedInUser) => {
    localStorage.setItem(
      STORAGE_KEYS.TOKEN,
      jwtToken
    );

    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(loggedInUser)
    );

    setToken(jwtToken);
    setUser(loggedInUser);
  };

  const register = (jwtToken, registeredUser) => {
    localStorage.setItem(
      STORAGE_KEYS.TOKEN,
      jwtToken
    );

    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(registeredUser)
    );

    setToken(jwtToken);
    setUser(registeredUser);
  };

  const logout = () => {
    clearAuth();

    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(
    token && user
  );

  const hasRole = (roles) =>
    user && roles.includes(user.role);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
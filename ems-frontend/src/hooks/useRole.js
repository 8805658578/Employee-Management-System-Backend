import { useAuth } from "../context/AuthContext";

const useRole = () => {
  const { user } = useAuth();

  return {
    role: user?.role,

    isAdmin:
      user?.role === "ADMIN",

    isHR:
      user?.role === "HR",

    isEmployee:
      user?.role ===
      "EMPLOYEE",
  };
};

export default useRole;
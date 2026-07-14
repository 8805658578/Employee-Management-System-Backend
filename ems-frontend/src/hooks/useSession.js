import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const useSession = () => {
  const navigate = useNavigate();

  const {
    user,
    token,
    logout,
  } = useAuth();

  useEffect(() => {
    if (!token || !user) {
      logout();
      navigate("/login", {
        replace: true,
      });
    }
  }, [
    token,
    user,
    logout,
    navigate,
  ]);
};

export default useSession;
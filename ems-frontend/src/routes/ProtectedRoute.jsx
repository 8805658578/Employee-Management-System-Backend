import { Navigate, Outlet } from "react-router-dom";

import Loader from "../components/common/Loader";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
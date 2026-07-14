import {
  Navigate,
  Outlet,
} from "react-router-dom";

import Loader from "../components/common/Loader";

import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ allowedRoles }) => {
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

  if (
    !allowedRoles.includes(user.role)
  ) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <Outlet />;
};

export default RoleRoute;
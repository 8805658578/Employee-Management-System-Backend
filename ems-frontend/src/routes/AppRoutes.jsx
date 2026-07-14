import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import ProtectedLayout from "../layouts/ProtectedLayout";

import { ROLES } from "../utils/roles";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Unauthorized from "../pages/errors/Unauthorized";

import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";

import EmployeeList from "../pages/employees/EmployeeList";
import DepartmentList from "../pages/departments/DepartmentList";
import LeaveList from "../pages/leaves/LeaveList";

import AddEmployee from "../pages/employees/AddEmployee";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<ProtectedLayout />}>
          {/* Dashboard & Profile */}
          <Route
            element={
              <RoleRoute
                allowedRoles={[
                  ROLES.ADMIN,
                  ROLES.HR,
                  ROLES.EMPLOYEE,
                ]}
              />
            }
          >
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />
          </Route>

          {/* Employee & Leave */}
          <Route
            element={
              <RoleRoute
                allowedRoles={[
                  ROLES.ADMIN,
                  ROLES.HR,
                ]}
              />
            }
          >
            <Route
              path="/employees"
              element={<EmployeeList />}
            />

            <Route
              path="/employees/add"
              element={<AddEmployee />}
            />

            <Route
              path="/leaves"
              element={<LeaveList />}
            />
          </Route>

        {/* Department */}
        <Route
          element={
            <RoleRoute
              allowedRoles={[ROLES.ADMIN]}
            />
          }
        >
          <Route
            path="/departments"
            element={<DepartmentList />}
          />
        </Route>
      </Route>
    </Route>

      {/* Default Route */ }
  <Route
    path="/"
    element={<Login />}
  />

  {/* 404 Route */ }
  <Route
    path="*"
    element={<Unauthorized />}
  />
    </Routes >
  );
};

export default AppRoutes;
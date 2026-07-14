import { ROLES } from "./roles";

export const permissions = {
  canManageEmployees: (role) =>
    [
      ROLES.ADMIN,
      ROLES.HR,
    ].includes(role),

  canManageDepartments: (role) =>
    role === ROLES.ADMIN,

  canApproveLeaves: (role) =>
    [
      ROLES.ADMIN,
      ROLES.HR,
    ].includes(role),

  canViewDashboard: (role) =>
    Object.values(ROLES).includes(role),
};
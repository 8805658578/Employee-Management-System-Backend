import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaCalendarCheck,
  FaUser,
} from "react-icons/fa";

import { ROLES } from "./roles";

export const navigationItems = [
  {
    title: "Dashboard",
    icon: FaHome,
    path: "/dashboard",
    roles: [
      ROLES.ADMIN,
      ROLES.HR,
      ROLES.EMPLOYEE,
    ],
  },

  {
    title: "Employees",
    icon: FaUsers,
    path: "/employees",
    roles: [
      ROLES.ADMIN,
      ROLES.HR,
    ],
  },

  {
    title: "Departments",
    icon: FaBuilding,
    path: "/departments",
    roles: [
      ROLES.ADMIN,
    ],
  },

  {
    title: "Leaves",
    icon: FaCalendarCheck,
    path: "/leaves",
    roles: [
      ROLES.ADMIN,
      ROLES.HR,
      ROLES.EMPLOYEE,
    ],
  },

  {
    title: "Profile",
    icon: FaUser,
    path: "/profile",
    roles: [
      ROLES.ADMIN,
      ROLES.HR,
      ROLES.EMPLOYEE,
    ],
  },
];
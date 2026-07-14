import {
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaUserCheck,
} from "react-icons/fa";

import DashboardCard from "./DashboardCard";

const SummaryGrid = ({ summary }) => {
  const stats = [
    {
      title: "Employees",
      value: summary?.totalEmployees ?? 0,
      color: "bg-blue-600",
      icon: <FaUsers />,
    },
    {
      title: "Departments",
      value: summary?.totalDepartments ?? 0,
      color: "bg-green-600",
      icon: <FaBuilding />,
    },
    {
      title: "Pending Leaves",
      value: summary?.pendingLeaves ?? 0,
      color: "bg-orange-500",
      icon: <FaCalendarAlt />,
    },
    {
      title: "Active Employees",
      value: summary?.activeEmployees ?? 0,
      color: "bg-purple-600",
      icon: <FaUserCheck />,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <DashboardCard
          key={item.title}
          {...item}
        />
      ))}
    </div>
  );
};

export default SummaryGrid;
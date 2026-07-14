import {
  FaUserTie,
  FaBuilding,
  FaCalendarAlt,
  FaIdBadge,
} from "react-icons/fa";

const ProfileStats = ({ profile }) => {
  const stats = [
    {
      icon: <FaIdBadge />,
      title: "Employee ID",
      value: profile.employeeCode || "N/A",
    },
    {
      icon: <FaUserTie />,
      title: "Role",
      value: profile.role,
    },
    {
      icon: <FaBuilding />,
      title: "Department",
      value: profile.departmentName,
    },
    {
      icon: <FaCalendarAlt />,
      title: "Joining Date",
      value: profile.joiningDate || "N/A",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-xl bg-white p-6 shadow-md"
        >
          <div className="mb-4 text-3xl text-blue-600">
            {item.icon}
          </div>

          <p className="text-sm text-gray-500">
            {item.title}
          </p>

          <h3 className="mt-2 font-semibold">
            {item.value}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default ProfileStats;
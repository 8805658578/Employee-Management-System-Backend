import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      title: "Add Employee",
      path: "/employees/add",
    },
    {
      title: "Add Department",
      path: "/departments/add",
    },
    {
      title: "Apply Leave",
      path: "/leaves/apply",
    },
    {
      title: "View Profile",
      path: "/profile",
    },
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid gap-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.path}
            className="rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white transition hover:bg-blue-700"
          >
            {action.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
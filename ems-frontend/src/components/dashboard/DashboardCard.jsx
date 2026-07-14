const DashboardCard = ({
  title,
  value,
  icon,
  color = "bg-blue-600",
}) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
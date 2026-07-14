const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      employee: "Rahul Sharma",
      action: "Applied Leave",
      date: "09 Jul 2026",
    },
    {
      id: 2,
      employee: "Priya Patil",
      action: "Added Employee",
      date: "09 Jul 2026",
    },
    {
      id: 3,
      employee: "Amit Joshi",
      action: "Updated Profile",
      date: "08 Jul 2026",
    },
    {
      id: 4,
      employee: "Sneha Kulkarni",
      action: "Joined Department",
      date: "08 Jul 2026",
    },
  ];

  return (
    <div className="rounded-xl bg-white shadow-md">
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">
          Recent Activity
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-3 text-left">Employee</th>
              <th className="px-6 py-3 text-left">Activity</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  {item.employee}
                </td>

                <td className="px-6 py-4">
                  {item.action}
                </td>

                <td className="px-6 py-4">
                  {item.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivity;
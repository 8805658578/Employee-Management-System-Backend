const statusClasses = {
  PENDING:
    "bg-yellow-100 text-yellow-800 border-yellow-300",

  APPROVED:
    "bg-green-100 text-green-800 border-green-300",

  REJECTED:
    "bg-red-100 text-red-800 border-red-300",
};

const LeaveStatusBadge = ({ status }) => {
  const badgeClass =
    statusClasses[status] ??
    "bg-gray-100 text-gray-800 border-gray-300";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass}`}
    >
      {status}
    </span>
  );
};

export default LeaveStatusBadge;
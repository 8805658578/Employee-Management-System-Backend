const LeaveSearch = ({
  search,
  setSearch,
}) => {
  return (
    <input
      type="text"
      placeholder="Search leave requests..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-600"
    />
  );
};

export default LeaveSearch;
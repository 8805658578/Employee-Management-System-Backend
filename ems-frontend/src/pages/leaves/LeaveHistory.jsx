import useLeaves from "../../hooks/useLeaves";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

import LeaveTable from "../../components/leaves/LeaveTable";

const LeaveHistory = () => {
  const {
    leaves,
    loading,
    error,
  } = useLeaves();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage message={error} />
    );
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Leave History
      </h1>

      <LeaveTable
        leaves={leaves}
        role="EMPLOYEE"
      />

    </div>
  );
};

export default LeaveHistory;
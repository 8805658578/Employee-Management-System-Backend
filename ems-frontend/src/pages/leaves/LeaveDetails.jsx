import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import LeaveStatusBadge from "../../components/leaves/LeaveStatusBadge";

import { getLeaveById } from "../../services/leaveService";

const LeaveDetails = () => {
  const { id } = useParams();

  const [leave, setLeave] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadLeave = async () => {
      try {
        const data = await getLeaveById(id);

        setLeave(data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load leave request."
        );
      } finally {
        setLoading(false);
      }
    };

    loadLeave();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage message={error} />
    );
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow-md">

      <h1 className="mb-6 text-3xl font-bold">
        Leave Details
      </h1>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <strong>Employee:</strong>{" "}
          {leave.employeeName}
        </div>

        <div>
          <strong>Leave Type:</strong>{" "}
          {leave.leaveType}
        </div>

        <div>
          <strong>Start Date:</strong>{" "}
          {leave.startDate}
        </div>

        <div>
          <strong>End Date:</strong>{" "}
          {leave.endDate}
        </div>

        <div>
          <strong>Status:</strong>{" "}
          <LeaveStatusBadge
            status={leave.status}
          />
        </div>

        <div className="md:col-span-2">
          <strong>Reason:</strong>

          <p className="mt-2 text-gray-600">
            {leave.reason}
          </p>
        </div>

      </div>

    </div>
  );
};

export default LeaveDetails;
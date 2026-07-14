import { Link } from "react-router-dom";

import {
  FaEye,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

import LeaveStatusBadge from "./LeaveStatusBadge";

const LeaveTable = ({
  leaves,
  role,
  onApprove,
  onReject,
}) => {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-3 text-left">
              Employee
            </th>

            <th className="px-6 py-3 text-left">
              Type
            </th>

            <th className="px-6 py-3 text-left">
              Start
            </th>

            <th className="px-6 py-3 text-left">
              End
            </th>

            <th className="px-6 py-3 text-left">
              Status
            </th>

            <th className="px-6 py-3 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {leaves.map((leave) => (

            <tr
              key={leave.id}
              className="border-b hover:bg-slate-50"
            >

              <td className="px-6 py-4">
                {leave.employeeName}
              </td>

              <td className="px-6 py-4">
                {leave.leaveType}
              </td>

              <td className="px-6 py-4">
                {leave.startDate}
              </td>

              <td className="px-6 py-4">
                {leave.endDate}
              </td>

              <td className="px-6 py-4">
                <LeaveStatusBadge
                  status={leave.status}
                />
              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                  <Link
                    to={`/leaves/${leave.id}`}
                    className="text-blue-600"
                  >
                    <FaEye />
                  </Link>

                  {(role === "ADMIN" ||
                    role === "HR") &&
                    leave.status ===
                      "PENDING" && (
                      <>
                        <button
                          onClick={() =>
                            onApprove(
                              leave.id
                            )
                          }
                          className="text-green-600"
                        >
                          <FaCheck />
                        </button>

                        <button
                          onClick={() =>
                            onReject(
                              leave.id
                            )
                          }
                          className="text-red-600"
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default LeaveTable;
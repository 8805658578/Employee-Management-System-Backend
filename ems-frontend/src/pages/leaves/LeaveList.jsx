import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";
import Pagination from "../../components/common/Pagination";

import LeaveSearch from "../../components/leaves/LeaveSearch";
import LeaveTable from "../../components/leaves/LeaveTable";

import useLeaves from "../../hooks/useLeaves";

import {
  approveLeave,
  rejectLeave,
} from "../../services/leaveService";

import { useAuth } from "../../context/AuthContext";

const PAGE_SIZE = 10;

const LeaveList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    leaves,
    loading,
    error,
    refreshLeaves,
  } = useLeaves();

  const { user } = useAuth();

  const filteredLeaves = useMemo(() => {
    const keyword = search.toLowerCase();

    return leaves.filter(
      (leave) =>
        leave.employeeName
          ?.toLowerCase()
          .includes(keyword) ||
        leave.leaveType
          ?.toLowerCase()
          .includes(keyword)
    );
  }, [leaves, search]);

  const totalPages = Math.ceil(
    filteredLeaves.length / PAGE_SIZE
  );

  const paginatedLeaves = filteredLeaves.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);

      await Swal.fire({
        icon: "success",
        title: "Leave Approved",
        timer: 1500,
        showConfirmButton: false,
      });

      refreshLeaves();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Approval Failed",
        text:
          error.response?.data?.message ||
          "Unable to approve leave.",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id);

      await Swal.fire({
        icon: "success",
        title: "Leave Rejected",
        timer: 1500,
        showConfirmButton: false,
      });

      refreshLeaves();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Rejection Failed",
        text:
          error.response?.data?.message ||
          "Unable to reject leave.",
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (filteredLeaves.length === 0) {
    return (
      <EmptyState
        title="No Leave Requests"
        description="No leave requests were found."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">
          Leave Management
        </h1>

        <Link
          to="/leaves/apply"
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Apply Leave
        </Link>
      </div>

      <LeaveSearch
        search={search}
        setSearch={setSearch}
      />

      <LeaveTable
        leaves={paginatedLeaves}
        onApprove={handleApprove}
        onReject={handleReject}
        user={user}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default LeaveList;
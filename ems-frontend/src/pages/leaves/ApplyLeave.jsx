import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import LeaveForm from "../../components/leaves/LeaveForm";

import { createLeave } from "../../services/leaveService";

const ApplyLeave = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleApplyLeave = async (
    leave
  ) => {
    try {
      setLoading(true);

      await createLeave(leave);

      await Swal.fire({
        icon: "success",
        title: "Leave Applied Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/leaves");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text:
          error.response?.data?.message ||
          "Unable to apply leave.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">

      <h1 className="mb-6 text-3xl font-bold">
        Apply Leave
      </h1>

      <LeaveForm
        onSubmit={handleApplyLeave}
        loading={loading}
      />

    </div>
  );
};

export default ApplyLeave;
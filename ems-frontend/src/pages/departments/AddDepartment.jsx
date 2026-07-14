import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import DepartmentForm from "../../components/departments/DepartmentForm";

import { createDepartment } from "../../services/departmentService";

const AddDepartment = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCreateDepartment = async (
    department
  ) => {
    try {
      setLoading(true);

      await createDepartment(department);

      await Swal.fire({
        icon: "success",
        title: "Department Added Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/departments");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          error.response?.data?.message ||
          "Unable to add department.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">

      <h1 className="mb-6 text-3xl font-bold">
        Add Department
      </h1>

      <DepartmentForm
        onSubmit={handleCreateDepartment}
        loading={loading}
      />

    </div>
  );
};

export default AddDepartment;
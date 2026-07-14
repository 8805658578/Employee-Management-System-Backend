import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import EmployeeForm from "../../components/employees/EmployeeForm";

import { createEmployee } from "../../services/employeeService";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleCreateEmployee = async (
    employee
  ) => {
    try {
      setLoading(true);

      await createEmployee(employee);

      await Swal.fire({
        icon: "success",
        title: "Employee Added Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/employees");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          error.response?.data?.message ||
          "Unable to add employee.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">

      <h1 className="mb-6 text-3xl font-bold">
        Add Employee
      </h1>

      <EmployeeForm
        onSubmit={handleCreateEmployee}
        loading={loading}
      />

    </div>
  );
};

export default AddEmployee;
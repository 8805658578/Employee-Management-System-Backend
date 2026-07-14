import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import EmployeeForm from "../../components/employees/EmployeeForm";

import {
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeService";

const EditEmployee = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const data = await getEmployeeById(id);

        setEmployee(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            "Unable to load employee.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [id]);

  const handleUpdateEmployee = async (data) => {
    try {
      setLoading(true);

      await updateEmployee(id, data);

      await Swal.fire({
        icon: "success",
        title: "Employee Updated Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/employees");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          "Unable to update employee.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !employee) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">

      <h1 className="mb-6 text-3xl font-bold">
        Edit Employee
      </h1>

      <EmployeeForm
        defaultValues={employee}
        onSubmit={handleUpdateEmployee}
        loading={loading}
      />

    </div>
  );
};

export default EditEmployee;
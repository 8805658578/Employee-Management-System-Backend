import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

import { getEmployeeById } from "../../services/employeeService";

const EmployeeDetails = () => {
  const { id } = useParams();

  const [employee, setEmployee] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadEmployee =
      async () => {
        try {
          const data =
            await getEmployeeById(id);

          setEmployee(data);
        } catch (err) {
          setError(
            err.response?.data?.message ||
              "Unable to load employee."
          );
        } finally {
          setLoading(false);
        }
      };

    loadEmployee();
  }, [id]);

  if (loading) return <Loader />;

  if (error)
    return (
      <ErrorMessage message={error} />
    );

  return (
    <div className="rounded-xl bg-white p-8 shadow-md">

      <h1 className="mb-6 text-3xl font-bold">
        Employee Details
      </h1>

      <div className="grid gap-4 md:grid-cols-2">

        <div>
          <strong>ID:</strong>{" "}
          {employee.id}
        </div>

        <div>
          <strong>Name:</strong>{" "}
          {employee.name}
        </div>

        <div>
          <strong>Email:</strong>{" "}
          {employee.email}
        </div>

        <div>
          <strong>Department:</strong>{" "}
          {employee.departmentName}
        </div>

        <div>
          <strong>Role:</strong>{" "}
          {employee.role}
        </div>

        <div>
          <strong>Status:</strong>{" "}
          {employee.status}
        </div>

      </div>

    </div>
  );
};

export default EmployeeDetails;
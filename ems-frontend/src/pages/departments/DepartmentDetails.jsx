import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

import { getDepartmentById } from "../../services/departmentService";

const DepartmentDetails = () => {
  const { id } = useParams();

  const [department, setDepartment] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadDepartment = async () => {
      try {
        const data =
          await getDepartmentById(id);

        setDepartment(data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load department."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDepartment();
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
        Department Details
      </h1>

      <div className="space-y-4">

        <div>
          <strong>ID:</strong>{" "}
          {department.id}
        </div>

        <div>
          <strong>Name:</strong>{" "}
          {department.name}
        </div>

        <div>
          <strong>Description:</strong>{" "}
          {department.description}
        </div>

      </div>

    </div>
  );
};

export default DepartmentDetails;
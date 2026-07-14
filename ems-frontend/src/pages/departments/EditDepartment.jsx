import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import DepartmentForm from "../../components/departments/DepartmentForm";

import {
  getDepartmentById,
  updateDepartment,
} from "../../services/departmentService";

import Loader from "../../components/common/Loader";

const EditDepartment = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [department, setDepartment] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDepartment = async () => {
      try {
        const data = await getDepartmentById(id);

        setDepartment(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            "Unable to load department.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadDepartment();
  }, [id]);

  const handleUpdateDepartment = async (
    formData
  ) => {
    try {
      setLoading(true);

      await updateDepartment(id, formData);

      await Swal.fire({
        icon: "success",
        title: "Department Updated Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/departments");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          "Unable to update department.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !department) {
    return <Loader />;
  }

  return (
    <div className="mx-auto max-w-3xl">

      <h1 className="mb-6 text-3xl font-bold">
        Edit Department
      </h1>

      <DepartmentForm
        defaultValues={department}
        onSubmit={handleUpdateDepartment}
        loading={loading}
      />

    </div>
  );
};

export default EditDepartment;
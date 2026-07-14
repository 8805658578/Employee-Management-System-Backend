import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";
import Pagination from "../../components/common/Pagination";

import DepartmentSearch from "../../components/departments/DepartmentSearch";
import DepartmentTable from "../../components/departments/DepartmentTable";

import useDepartments from "../../hooks/useDepartments";
import { deleteDepartment } from "../../services/departmentService";

const PAGE_SIZE = 10;

const DepartmentList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    departments,
    loading,
    error,
    refreshDepartments,
  } = useDepartments();

  const filteredDepartments = useMemo(() => {
    const keyword = search.toLowerCase();

    return departments.filter(
      (department) =>
        department.name?.toLowerCase().includes(keyword) ||
        department.description?.toLowerCase().includes(keyword)
    );
  }, [departments, search]);

  const totalPages = Math.ceil(
    filteredDepartments.length / PAGE_SIZE
  );

  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Department?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await deleteDepartment(id);

      await Swal.fire({
        icon: "success",
        title: "Department Deleted",
        timer: 1500,
        showConfirmButton: false,
      });

      refreshDepartments();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error.response?.data?.message ||
          "Unable to delete department.",
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (filteredDepartments.length === 0) {
    return (
      <EmptyState
        title="No Departments Found"
        description="No departments match your search."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">
          Departments
        </h1>

        <Link
          to="/departments/add"
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Add Department
        </Link>
      </div>

      <DepartmentSearch
        search={search}
        setSearch={setSearch}
      />

      <DepartmentTable
        departments={paginatedDepartments}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default DepartmentList;
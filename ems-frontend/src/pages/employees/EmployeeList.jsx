import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";
import Pagination from "../../components/common/Pagination";

import EmployeeSearch from "../../components/employees/EmployeeSearch";
import EmployeeTable from "../../components/employees/EmployeeTable";

import useEmployees from "../../hooks/useEmployees";
import useRole from "../../hooks/useRole";

import { deleteEmployee } from "../../services/employeeService";

const PAGE_SIZE = 10;

const EmployeeList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    employees,
    loading,
    error,
    refreshEmployees,
  } = useEmployees();

  const { isAdmin, isHR } = useRole();

  const filteredEmployees = useMemo(() => {
    const keyword = search.toLowerCase();

    return employees.filter(
      (employee) =>
        `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(keyword) ||
        employee.email?.toLowerCase().includes(keyword)
    );
  }, [employees, search]);

  const totalPages = Math.ceil(
    filteredEmployees.length / PAGE_SIZE
  );

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Employee?",
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
      await deleteEmployee(id);

      await Swal.fire({
        icon: "success",
        title: "Employee Deleted",
        timer: 1500,
        showConfirmButton: false,
      });

      refreshEmployees();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error.response?.data?.message ||
          "Unable to delete employee.",
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (filteredEmployees.length === 0) {
    return (
      <EmptyState
        title="No Employees Found"
        description="There are no employees matching your search."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Employees
        </h1>

        {(isAdmin || isHR) && (
          <Link
            to="/employees/add"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add Employee
          </Link>
        )}
      </div>

      <EmployeeSearch
        search={search}
        setSearch={setSearch}
      />

      <EmployeeTable
        employees={paginatedEmployees}
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

export default EmployeeList;
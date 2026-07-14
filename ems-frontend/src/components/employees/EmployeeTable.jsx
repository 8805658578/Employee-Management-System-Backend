import { Link } from "react-router-dom";

import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const EmployeeTable = ({
  employees,
  onDelete,
}) => {
  const { hasRole } = useAuth();

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-5 py-3 text-left">
              ID
            </th>

            <th className="px-5 py-3 text-left">
              Name
            </th>

            <th className="px-5 py-3 text-left">
              Email
            </th>

            <th className="px-5 py-3 text-left">
              Department
            </th>

            <th className="px-5 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="border-b hover:bg-slate-50"
            >
              <td className="px-5 py-4">
                {employee.id}
              </td>

              <td className="px-5 py-4">
                {employee.name}
              </td>

              <td className="px-5 py-4">
                {employee.email}
              </td>

              <td className="px-5 py-4">
                {employee.departmentName}
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-center gap-4">
                  <Link
                    to={`/employees/${employee.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </Link>

                  {hasRole([
                    "ADMIN",
                    "HR",
                  ]) && (
                    <>
                      <Link
                        to={`/employees/edit/${employee.id}`}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete?.(
                            employee.id
                          )
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
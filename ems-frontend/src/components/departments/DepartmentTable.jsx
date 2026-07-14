import { Link } from "react-router-dom";

import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const DepartmentTable = ({
  departments,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-md">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-3 text-left">
              ID
            </th>

            <th className="px-6 py-3 text-left">
              Department
            </th>

            <th className="px-6 py-3 text-left">
              Description
            </th>

            <th className="px-6 py-3 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {departments.map((department) => (

            <tr
              key={department.id}
              className="border-b hover:bg-slate-50"
            >

              <td className="px-6 py-4">
                {department.id}
              </td>

              <td className="px-6 py-4">
                {department.name}
              </td>

              <td className="px-6 py-4">
                {department.description}
              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-4">

                  <Link
                    to={`/departments/${department.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </Link>

                  <Link
                    to={`/departments/edit/${department.id}`}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaEdit />
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      onDelete(department.id)
                    }
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default DepartmentTable;
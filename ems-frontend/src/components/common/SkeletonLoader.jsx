const SkeletonLoader = ({
  rows = 5,
  columns = 4,
}) => {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md">

      <div className="animate-pulse">

        <div className="border-b bg-gray-100 p-4">

          <div className="h-6 w-48 rounded bg-gray-300"></div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <tbody>

              {[...Array(rows)].map((_, row) => (
                <tr
                  key={row}
                  className="border-b"
                >
                  {[...Array(columns)].map(
                    (_, column) => (
                      <td
                        key={column}
                        className="p-4"
                      >
                        <div className="h-4 rounded bg-gray-200"></div>
                      </td>
                    )
                  )}
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default SkeletonLoader;
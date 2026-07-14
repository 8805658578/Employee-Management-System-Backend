const ResponsiveTable = ({
  headers,
  children,
}) => {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-md">

      <table className="min-w-full">

        <thead className="bg-slate-800 text-white">

          <tr>

            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-4 text-left font-semibold"
              >
                {header}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {children}

        </tbody>

      </table>

    </div>
  );
};

export default ResponsiveTable;
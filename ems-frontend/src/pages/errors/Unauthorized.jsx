import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">

      <FaLock
        className="mb-6 text-red-500"
        size={80}
      />

      <h1 className="text-5xl font-bold">
        403
      </h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Access Denied
      </h2>

      <p className="mt-3 max-w-md text-gray-600">
        You don't have permission to access this page.
      </p>

      <Link
        to="/dashboard"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        Back to Dashboard
      </Link>

    </div>
  );
};

export default Unauthorized;
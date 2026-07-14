import { FaBars } from "react-icons/fa";

import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { toggleSidebar } =
    useSidebar();

  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">

      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <FaBars size={20} />
        </button>

        <h1 className="text-xl font-semibold">
          Employee Management System
        </h1>

      </div>

      <div className="text-right">

        <p className="font-medium">
          {user?.name}
        </p>

        <p className="text-sm text-gray-500">
          {user?.role}
        </p>

      </div>

    </header>
  );
};

export default Navbar;
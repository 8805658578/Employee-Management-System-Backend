import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

import useSession from "../hooks/useSession";

const ProtectedLayout = () => {
  useSession();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-x-auto p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ProtectedLayout;
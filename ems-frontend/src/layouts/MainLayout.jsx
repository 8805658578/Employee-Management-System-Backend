import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
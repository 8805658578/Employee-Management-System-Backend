import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

import { navigationItems } from "../../utils/navigation";
import { useSidebar } from "../../context/SidebarContext";
import useRole from "../../hooks/useRole";

const Sidebar = () => {
  const {
    isOpen,
    closeSidebar,
  } = useSidebar();

  const { role } = useRole();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 bg-slate-900 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-700 p-5 lg:hidden">
          <h2 className="text-lg font-bold">
            EMS
          </h2>

          <button
            onClick={closeSidebar}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="space-y-2 p-4">
          {navigationItems
            .filter((item) =>
              item.roles.includes(role)
            )
            .map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                      isActive
                        ? "bg-blue-600"
                        : "hover:bg-slate-800"
                    }`
                  }
                >
                  <Icon />

                  {item.title}
                </NavLink>
              );
            })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
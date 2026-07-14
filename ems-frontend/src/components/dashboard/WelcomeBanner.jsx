import { useAuth } from "../../context/AuthContext";

const WelcomeBanner = () => {
  const { user } = useAuth();

  return (
    <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
      <h1 className="text-3xl font-bold">
        Welcome,
        {" "}
        {user?.name || "User"} 👋
      </h1>

      <p className="mt-3 text-blue-100">
        Manage employees, departments and leave requests
        from a single dashboard.
      </p>
    </div>
  );
};

export default WelcomeBanner;
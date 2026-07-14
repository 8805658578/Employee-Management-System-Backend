import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import SummaryGrid from "../../components/dashboard/SummaryGrid";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";
import ChartPlaceholder from "../../components/dashboard/ChartPlaceholder";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

import useDashboard from "../../hooks/useDashboard";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-600">
        Welcome to Employee Management System
      </p>
    </div>
  );
};

export default Dashboard;
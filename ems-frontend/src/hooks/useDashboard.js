import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";

const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const data = await getDashboardSummary();

      setDashboardData(data);

      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    dashboardData,
    loading,
    error,
    refreshDashboard: loadDashboard,
  };
};

export default useDashboard;
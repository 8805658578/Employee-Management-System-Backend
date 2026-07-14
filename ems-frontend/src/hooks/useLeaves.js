import { useEffect, useState } from "react";

import { getLeaves } from "../services/leaveService";

const useLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadLeaves = async () => {
    try {
      setLoading(true);

      const data = await getLeaves();

      setLeaves(data);

      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load leave requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  return {
    leaves,
    setLeaves,
    loading,
    error,
    refreshLeaves: loadLeaves,
  };
};

export default useLeaves;
import { useEffect, useState } from "react";

import { getDepartments } from "../services/departmentService";

const useDepartments = () => {
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadDepartments = async () => {
    try {
      setLoading(true);

      const data = await getDepartments();

      setDepartments(data);

      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load departments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  return {
    departments,
    setDepartments,
    loading,
    error,
    refreshDepartments: loadDepartments,
  };
};

export default useDepartments;
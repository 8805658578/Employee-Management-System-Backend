import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const data = await getEmployees();

      setEmployees(data.content || []);

      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load employees."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return {
    employees,
    setEmployees,
    loading,
    error,
    refreshEmployees: loadEmployees,
  };
};

export default useEmployees;
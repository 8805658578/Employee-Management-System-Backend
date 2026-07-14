import { useEffect, useState } from "react";

import { getProfile } from "../services/profileService";

const useProfile = () => {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadProfile = async () => {
    try {
      setLoading(true);

      const data = await getProfile();

      setProfile(data);

      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    refreshProfile: loadProfile,
  };
};

export default useProfile;
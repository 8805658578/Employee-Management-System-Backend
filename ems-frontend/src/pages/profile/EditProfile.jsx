import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import ProfileForm from "../../components/profile/ProfileForm";

import useProfile from "../../hooks/useProfile";

import {
  updateProfile,
} from "../../services/profileService";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

const EditProfile = () => {
  const navigate = useNavigate();

  const {
    profile,
    loading,
    error,
    refreshProfile,
  } = useProfile();

  const [saving, setSaving] =
    useState(false);

  const handleUpdate = async (data) => {
    try {
      setSaving(true);

      await updateProfile(data);

      await refreshProfile();

      await Swal.fire({
        icon: "success",
        title: "Profile Updated Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/profile");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          err.response?.data?.message ||
          "Unable to update profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage message={error} />
    );
  }

  return (
    <div className="mx-auto max-w-3xl">

      <h1 className="mb-6 text-3xl font-bold">
        Edit Profile
      </h1>

      <ProfileForm
        defaultValues={profile}
        onSubmit={handleUpdate}
        loading={saving}
      />

    </div>
  );
};

export default EditProfile;
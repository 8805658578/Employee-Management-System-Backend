import { Link } from "react-router-dom";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

import ProfileCard from "../../components/profile/ProfileCard";
import ProfileStats from "../../components/profile/ProfileStats";

import useProfile from "../../hooks/useProfile";

const Profile = () => {
  const {
    profile,
    loading,
    error,
  } = useProfile();

  if (loading) return <Loader />;

  if (error) {
    return (
      <ErrorMessage message={error} />
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <div className="flex gap-3">

          <Link
            to="/profile/edit"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Edit Profile
          </Link>

          <Link
            to="/profile/change-password"
            className="rounded-lg bg-slate-700 px-5 py-2 text-white hover:bg-slate-800"
          >
            Change Password
          </Link>

        </div>

      </div>

      <ProfileStats profile={profile} />

      <ProfileCard profile={profile} />

    </div>
  );
};

export default Profile;
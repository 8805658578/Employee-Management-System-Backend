import {
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaBuilding,
  FaUserCircle,
} from "react-icons/fa";

const ProfileCard = ({ profile }) => {
  return (
    <div className="rounded-xl bg-white p-8 shadow-md">

      <div className="flex flex-col items-center">

        <FaUserCircle
          size={110}
          className="text-blue-600"
        />

        <h2 className="mt-4 text-3xl font-bold">
          {profile.name}
        </h2>

        <span className="mt-2 rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
          {profile.role}
        </span>

      </div>

      <hr className="my-8" />

      <div className="grid gap-6 md:grid-cols-2">

        <div className="flex items-center gap-3">
          <FaEnvelope className="text-blue-600" />
          <span>{profile.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaPhone className="text-green-600" />
          <span>{profile.phone}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaBriefcase className="text-purple-600" />
          <span>{profile.designation}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaBuilding className="text-orange-600" />
          <span>{profile.departmentName}</span>
        </div>

      </div>

    </div>
  );
};

export default ProfileCard;
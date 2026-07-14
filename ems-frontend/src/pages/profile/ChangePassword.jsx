import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

import { changePassword } from "../../services/profileService";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await changePassword({
        currentPassword:
          data.currentPassword,
        newPassword: data.newPassword,
      });

      reset();

      await Swal.fire({
        icon: "success",
        title: "Password Changed Successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Change Password Failed",
        text:
          error.response?.data?.message ||
          "Unable to change password.",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordField = (
    label,
    name,
    visible,
    setVisible,
    validation
  ) => (
    <div>
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <div className="relative">

        <input
          type={
            visible ? "text" : "password"
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 outline-none focus:border-blue-600"
          {...register(name, validation)}
        />

        <button
          type="button"
          onClick={() =>
            setVisible((prev) => !prev)
          }
          className="absolute right-4 top-3 text-gray-500"
        >
          {visible ? (
            <FaEyeSlash />
          ) : (
            <FaEye />
          )}
        </button>

      </div>

      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name].message}
        </p>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-xl">

      <h1 className="mb-6 text-3xl font-bold">
        Change Password
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl bg-white p-8 shadow-md"
      >

        {renderPasswordField(
          "Current Password",
          "currentPassword",
          showCurrent,
          setShowCurrent,
          {
            required:
              "Current password is required",
          }
        )}

        {renderPasswordField(
          "New Password",
          "newPassword",
          showNew,
          setShowNew,
          {
            required:
              "New password is required",
            minLength: {
              value: 8,
              message:
                "Password must be at least 8 characters",
            },
          }
        )}

        {renderPasswordField(
          "Confirm Password",
          "confirmPassword",
          showConfirm,
          setShowConfirm,
          {
            required:
              "Confirm password is required",
            validate: (value) =>
              value === newPassword ||
              "Passwords do not match",
          }
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Updating..."
            : "Change Password"}
        </button>

      </form>

    </div>
  );
};

export default ChangePassword;
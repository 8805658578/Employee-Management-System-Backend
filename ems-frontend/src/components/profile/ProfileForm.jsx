import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Input from "../ui/Input";

const ProfileForm = ({
  defaultValues = {},
  onSubmit,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl bg-white p-8 shadow-md"
    >
      <Input
        label="Full Name"
        placeholder="Enter your name"
        error={errors.name}
        {...register("name", {
          required: "Name is required",
        })}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter email"
        error={errors.email}
        {...register("email", {
          required: "Email is required",
        })}
      />

      <Input
        label="Phone"
        placeholder="Enter phone number"
        error={errors.phone}
        {...register("phone", {
          required: "Phone number is required",
        })}
      />

      <Input
        label="Designation"
        placeholder="Enter designation"
        error={errors.designation}
        {...register("designation")}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default ProfileForm;
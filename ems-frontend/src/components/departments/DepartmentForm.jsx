import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Input from "../ui/Input";

const DepartmentForm = ({
  onSubmit,
  defaultValues = {},
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
        label="Department Name"
        placeholder="Enter department name"
        error={errors.name}
        {...register("name", {
          required: "Department name is required",
          minLength: {
            value: 2,
            message:
              "Department name must be at least 2 characters",
          },
        })}
      />

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={5}
          placeholder="Enter department description"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-600"
          {...register("description", {
            required: "Description is required",
          })}
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Department"}
      </button>
    </form>
  );
};

export default DepartmentForm;
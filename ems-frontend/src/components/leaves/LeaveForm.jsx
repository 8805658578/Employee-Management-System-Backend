import { useEffect } from "react";
import { useForm } from "react-hook-form";

const LeaveForm = ({
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
      <div>
        <label className="mb-2 block font-medium">
          Leave Type
        </label>

        <select
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 outline-none"
          {...register("leaveType", {
            required: "Leave type is required",
          })}
        >
          <option value="">
            Select Leave Type
          </option>

          <option value="CASUAL">
            Casual Leave
          </option>

          <option value="SICK">
            Sick Leave
          </option>

          <option value="EARNED">
            Earned Leave
          </option>

          <option value="MATERNITY">
            Maternity Leave
          </option>

          <option value="PATERNITY">
            Paternity Leave
          </option>
        </select>

        {errors.leaveType && (
          <p className="mt-1 text-sm text-red-500">
            {errors.leaveType.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Start Date
          </label>

          <input
            type="date"
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
            {...register("startDate", {
              required: "Start date is required",
            })}
          />

          {errors.startDate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
            End Date
          </label>

          <input
            type="date"
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
            {...register("endDate", {
              required: "End date is required",
            })}
          />

          {errors.endDate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.endDate.message}
            </p>
          )}
        </div>

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Reason
        </label>

        <textarea
          rows={5}
          placeholder="Enter leave reason..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-600"
          {...register("reason", {
            required: "Reason is required",
            minLength: {
              value: 10,
              message:
                "Reason must contain at least 10 characters",
            },
          })}
        />

        {errors.reason && (
          <p className="mt-1 text-sm text-red-500">
            {errors.reason.message}
          </p>
        )}

      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Apply Leave"}
      </button>

    </form>
  );
};

export default LeaveForm;
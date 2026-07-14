import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../ui/Input";
import { getDepartments } from "../../services/departmentService";

const EmployeeForm = ({
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

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const response = await getDepartments();

        setDepartments(response.content || response);
      } catch (error) {
        console.error(error);
      }
    };

    loadDepartments();
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-xl bg-white p-8 shadow-md"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="First Name"
          error={errors.firstName}
          {...register("firstName", {
            required: "First Name is required",
          })}
        />

        <Input
          label="Last Name"
          error={errors.lastName}
          {...register("lastName", {
            required: "Last Name is required",
          })}
        />
      </div>

      <Input
        label="Email"
        type="email"
        error={errors.email}
        {...register("email", {
          required: "Email is required",
        })}
      />

      <Input
        label="Mobile Number"
        error={errors.mobileNumber}
        {...register("mobileNumber", {
          required: "Mobile Number is required",
        })}
      />

      <Input
        label="Address"
        error={errors.address}
        {...register("address")}
      />

      <div>
        <label className="mb-2 block font-medium">
          Gender
        </label>

        <select
          className="w-full rounded-lg border px-4 py-2"
          {...register("gender", {
            required: "Gender is required",
          })}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {errors.gender && (
          <p className="mt-1 text-sm text-red-500">
            {errors.gender.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Date of Birth"
          type="date"
          error={errors.dateOfBirth}
          {...register("dateOfBirth", {
            required: "Date of Birth is required",
          })}
        />

        <Input
          label="Date of Joining"
          type="date"
          error={errors.dateOfJoining}
          {...register("dateOfJoining", {
            required: "Date of Joining is required",
          })}
        />
      </div>

      <Input
        label="Salary"
        type="number"
        error={errors.salary}
        {...register("salary", {
          required: "Salary is required",
          valueAsNumber: true,
        })}
      />

      <Input
        label="Designation"
        error={errors.designation}
        {...register("designation", {
          required: "Designation is required",
        })}
      />

      <div>
        <label className="mb-2 block font-medium">
          Department
        </label>

        <select
          className="w-full rounded-lg border px-4 py-2"
          {...register("departmentId", {
            required: "Department is required",
            valueAsNumber: true,
          })}
        >
          <option value="">Select Department</option>

          {departments.map((department) => (
            <option
              key={department.id}
              value={department.id}
            >
              {department.name}
            </option>
          ))}
        </select>

        {errors.departmentId && (
          <p className="mt-1 text-sm text-red-500">
            {errors.departmentId.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Status
        </label>

        <select
          className="w-full rounded-lg border px-4 py-2"
          {...register("status", {
            required: "Status is required",
          })}
        >
          <option value="">Select Status</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>

        {errors.status && (
          <p className="mt-1 text-sm text-red-500">
            {errors.status.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
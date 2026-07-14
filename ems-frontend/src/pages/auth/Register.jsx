import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";

import Input from "../../components/ui/Input";
import { register as registerApi } from "../../services/authService";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
      };

      await registerApi(payload);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          error.response?.data?.message ||
          "Unable to Register",
      });
    }
  };

  return (
    <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-xl">
      <div className="flex flex-col items-center">
        <FaUserPlus
          size={70}
          className="text-green-600"
        />

        <h2 className="mt-4 text-3xl font-bold">
          Register
        </h2>

        <p className="text-gray-500">
          Create Your Account
        </p>
      </div>

      <form
        className="mt-8 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Username"
          placeholder="Enter Username"
          error={errors.username}
          {...register("username", {
            required: "Username is required",
          })}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter Email"
          error={errors.email}
          {...register("email", {
            required: "Email is required",
          })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter Password"
          error={errors.password}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          })}
        />

        <div>
          <label className="mb-2 block font-medium">
            Role
          </label>

          <select
            className="w-full rounded-lg border p-3"
            {...register("role", {
              required: "Role is required",
            })}
          >
            <option value="">Select Role</option>
            <option value="ADMIN">ADMIN</option>
            <option value="HR">HR</option>
            <option value="EMPLOYEE">EMPLOYEE</option>
          </select>

          {errors.role && (
            <p className="mt-1 text-sm text-red-500">
              {errors.role.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
        >
          Register
        </button>
      </form>

      <p className="mt-6 text-center">
        Already have an account?
        <Link
          to="/login"
          className="ml-2 font-semibold text-blue-600"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
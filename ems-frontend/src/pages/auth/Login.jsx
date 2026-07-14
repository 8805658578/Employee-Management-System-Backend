import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";

import Input from "../../components/ui/Input";
import { login as loginApi } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit = async (data) => {
    console.log("Submitted Data:", data);

    try {
        const response = await loginApi({
            username: data.username,
            password: data.password,
        });

        console.log("API Response:", response);

        login(response.token, {
            username: response.username,
            role: response.role,
        });

        navigate("/dashboard");
    } catch (error) {
        console.log(error);
    }
};

    return (
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
            <div className="flex flex-col items-center">
                <FaUserCircle
                    className="text-blue-600"
                    size={70}
                />

                <h2 className="mt-4 text-3xl font-bold">
                    Login
                </h2>

                <p className="text-gray-500">
                    Employee Management System
                </p>
            </div>

            <form
                className="mt-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    label="Username"
                    type="text"
                    placeholder="Enter Username"
                    error={errors.username}
                    {...register("username", {
                        required: "Username is required",
                    })}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter Password"
                    error={errors.password}
                    {...register("password", {
                        required: "Password is required",
                    })}
                />

                <button
                    type="submit"
                    className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    Login
                </button>
            </form>

            <p className="mt-6 text-center">
                Don't have an account?

                <Link
                    to="/register"
                    className="ml-2 font-semibold text-blue-600"
                >
                    Register
                </Link>
            </p>
        </div>
    );
};

export default Login;
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/app/store/authSlice";
import axiosInstance from "@/app/api/axiosInstance";
import { jwtDecode } from "jwt-decode"; // 👈 you forgot this

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(loginData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(loginData.password)) {
      newErrors.password = "Password must include at least one special character";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axiosInstance.post("/user/login", {
        email: loginData.email,
        password: loginData.password,
      });

      const { token, user } = res.data;

      // Save token + redux state
      localStorage.setItem("token", token);
      dispatch(loginSuccess({ user, token }));

      // ✅ Decode token to get role
      const decoded = jwtDecode(token);
      const role = Number(decoded.role);

      // ✅ Redirect based on role
      const roleRoutes = {
        1: "/",
        2: "/team-dashboard",
        3: "/",
        4: "/associate-partner-dashboard",
      };
      const redirectPath = roleRoutes[role] || "/";
      router.push(redirectPath);

      // Reset form
      setLoginData({ email: "", password: "" });
    } catch (error) {
      console.error("Login error:", error);
      setServerError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section
      className="bg-cover bg-center py-5 px-10"
      style={{ backgroundImage: "url('/assets/Verticle.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-10 bg-white border my-10 mt-30 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

        <button
          type="submit"
          className="w-full rounded-[5px] bg-[#FEC63F] border-l-[15px] border-l-[#C09837] px-[14px] py-[12px] hover:bg-[#C09837] text-black font-medium transition duration-300"
        >
          Login
        </button>

        <div className="flex justify-between text-sm mt-4">
          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
          <Link href="/signup" className="text-blue-600 hover:underline">
            Create Account
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;

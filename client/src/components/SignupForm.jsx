"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role_id: "",
  });

  const [roles, setRoles] = useState([]);
    const router = useRouter();

  // Fetch roles from backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.role_id
    ) {
      alert("All fields are required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role_id: formData.role_id,
      });

      alert("Signup successful!");
router.push("/login");

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role_id: "",
      });
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <section
      className="bg-cover bg-center py-5 px-10"
      style={{ backgroundImage: "url('/assets/Verticle.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-10 bg-white border my-10 space-y-4 mt-30"
      >
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="role_id"
          value={formData.role_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Role</option>
          {roles
  .filter((role) => role.name.toLowerCase() !== "admin") // 🔐 block admin explicitly
  .map((role) => (
    <option key={role.id} value={role.id}>
      {role.name === "team"
        ? "Team Member"
        : role.name === "client"
        ? "Client"
        : role.name === "associate partner"
        ? "Associate Partner"
        : role.name}
    </option>
))}
        </select>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full rounded-[5px] bg-[#FEC63F] border-l-[15px] border-l-[#C09837] px-[14px] py-[12px] hover:bg-[#C09837] text-black font-medium transition duration-300"
        >
          Sign Up
        </button>

        <div className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;

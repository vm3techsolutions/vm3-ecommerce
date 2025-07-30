"use client";

import React, { useState } from "react";
import Link from "next/link";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
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
    // 👉 Replace this with your actual API call
    console.log("Form submitted:", formData);

    // ✅ Clear form after successful signup
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    alert("Signup successful!");

  } catch (error) {
    console.error("Signup error:", error);
  }
};
  return (
         <section
        className="bg-cover bg-center  py-5 px-10 "
        style={{ backgroundImage: "url('/assets/Verticle.jpg')" }}>


            <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-10 bg-white border my-10 space-y-4 mt-30"
    >
      <h2 className="text-2xl font-bold text-center">Create Account</h2>

      <div>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

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

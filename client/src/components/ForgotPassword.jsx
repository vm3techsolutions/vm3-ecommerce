"use client";

import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      // Replace with actual API call
      console.log("Sending password reset for:", email);

      // Simulate success
      setSuccessMsg("Password reset link has been sent to your email.");
      setEmail(""); // Clear input
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 bg-white border rounded shadow mt-30 mb-10" 
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-3"
      >
        Send Reset Link
      </button>
    </form>
  );
};

export default ForgotPassword;

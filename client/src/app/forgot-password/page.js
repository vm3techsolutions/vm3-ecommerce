
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // ✅ use axios directly

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleForgot = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      // ✅ call your backend endpoint
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forgot-password`, {
        email,
      });

      setMessage(res.data.message || "Password reset link sent to your email.");
      setEmail("");

      // Optional: redirect to login after 4 sec
      setTimeout(() => router.push("/login"), 4000);
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.message || "Failed to send reset link.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-10 bg-white border my-10 rounded-lg shadow space-y-4">
      <h2 className="text-2xl font-bold text-center">Forgot Password</h2>

      {message && <p className="text-green-600 text-sm text-center">{message}</p>}
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      <form onSubmit={handleForgot} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

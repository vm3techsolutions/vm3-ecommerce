// "use client";

// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";

// export default function ResetPassword() {
//   const { token } = useParams();   // ✅ Next.js grabs token from URL
//   const router = useRouter();

//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleReset = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     if (newPassword !== confirmPassword) {
//       return setError("Passwords do not match.");
//     }

//     try {
//       console.log("Frontend sending token:", token);

//       const res = await axios.post(
//         `http://localhost:5000/api/auth/reset-password/${token}`,
//         { newPassword, confirmPassword }
//       );

//       setMessage(res.data.message || "Password reset successful. Redirecting...");
//       setTimeout(() => router.push("/login"), 3000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to reset password.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-10 bg-white border my-10 rounded-lg shadow space-y-4">
//       <h2 className="text-2xl font-bold text-center">Reset Password</h2>

//       {message && <p className="text-green-600 text-sm text-center">{message}</p>}
//       {error && <p className="text-red-600 text-sm text-center">{error}</p>}

//       <form onSubmit={handleReset} className="space-y-4">
//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           Reset Password
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ResetPassword({ token }) {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      console.log("Frontend sending token:", token);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reset-password/${token}`,
        { newPassword, confirmPassword }
      );

      setMessage(res.data.message || "Password reset successful!");
      setTimeout(() => router.push("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-10 bg-white border my-10 rounded-lg shadow space-y-4">
      <h2 className="text-2xl font-bold text-center">Reset Password</h2>
      {message && <p className="text-green-600 text-sm text-center">{message}</p>}
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

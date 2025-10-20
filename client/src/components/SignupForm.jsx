// // "use client";

// // import React, { useState , useEffect } from "react";
// // import Link from "next/link";
// // import { useDispatch } from "react-redux";
// // import { signupSuccess } from "@/app/store/authSlice";
// // import { useRouter } from "next/navigation";
// // import axios from "axios"; // <--- axios imported

// // const SignupForm = () => {
// //   const dispatch = useDispatch();
// //   const router = useRouter();

// //   const [formData, setFormData] = useState({
// //    name: "",
// //     email: "",
// //     phone: "",
// //     password: "",
// //     confirmPassword: "",
// //     role_id: "",
// //   });

  
// //   const [roles, setRoles] = useState([]);
  

// //   // Fetch roles from backend
// // useEffect(() => {
// //   const fetchRoles = async () => {
// //     try {
// //       const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/roles`;
// //       console.log("Fetching roles from:", url);
// //       const response = await axios.get(url);
// //       console.log("Roles response:", response.data);
// //       setRoles(response.data.roles || response.data);
// //     } catch (error) {
// //       console.error("Failed to fetch roles:", error.message);
// //     }
// //   };

// //   fetchRoles();
// // }, []);


// //   const [errors, setErrors] = useState({});
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //     setErrors({ ...errors, [e.target.name]: "" });
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     if (!formData.name.trim()) newErrors.name = "Name is required";
   

// //     if (!/^\d{10}$/.test(formData.phone))
// //       newErrors.phone = "Enter a valid 10-digit mobile number";

// //     if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(formData.email))
// //       newErrors.email = "Enter a valid email address";

// //     if (formData.password.length < 6)
// //       newErrors.password = "Password must be at least 6 characters";
// //     else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password))
// //       newErrors.password = "Password must include a special character";

// //     if (formData.password !== formData.confirmPassword)
// //       newErrors.confirmPassword = "Passwords do not match";

   

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// // const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   if (!validateForm()) return;

// //   const { confirmPassword, ...dataToSend } = formData;

// //   setLoading(true);
// //   try {
// //     const response = await axios.post(
// //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`,
// //       dataToSend
// //     );

// //     const result = response.data;
// //     dispatch(signupSuccess({ user: result.user, token: result.token }));
// //     // localStorage.setItem("token", result.token); 
// //     localStorage.setItem("user", JSON.stringify(result.user)); // stringify user object
// // localStorage.setItem("token", result.token);
// //     alert("Signup successful!");

// //     // 🎯 Role-based redirection
// //     const roleId = result.user.role_id;
// //     switch (roleId) {
// //       case 1: // example: Admin
// //         router.push("/team-dashboard");
// //         break;
// //       case 2: // example: Client
// //         router.push("/client-dashboard");
// //         break;
// //       case 3: // example: Associate Partner
// //         router.push("/associate-partner-dashboard");
// //         break;
// //       default:
// //         router.push("/packages");
// //     }
// //   } catch (error) {
// //     const msg =
// //       error?.response?.data?.message || "Signup failed. Please try again.";
// //     alert(msg);
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// //   return (
// //         <section
// //       className="bg-cover bg-center py-5 px-10"
// //       style={{ backgroundImage: "url('/assets/Verticle.jpg')" }}
//     >
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-md mx-auto p-10 bg-white border my-10 space-y-4 mt-30"
//       >
//         <h2 className="text-2xl font-bold text-center">Create Account</h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <select
//           name="role_id"
//           value={formData.role_id}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         >
//           <option value="">Select Role</option>
//           {roles
//   .filter((role) => role.name.toLowerCase() !== "admin") // 🔐 block admin explicitly
//   .map((role) => (
//     <option key={role.id} value={role.id}>
//       {role.name === "team"
//         ? "Team Member"
//         : role.name === "client"
//         ? "Client"
//         : role.name === "associate partner"
//         ? "Associate Partner"
//         : role.name}
//     </option>
// ))}
//         </select>

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full rounded-[5px] bg-[#FEC63F] border-l-[15px] border-l-[#C09837] px-[14px] py-[12px] hover:bg-[#C09837] text-black font-medium transition duration-300"
//         >
//           Sign Up
//         </button>

//         <div className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <Link href="/login" className="text-blue-600 hover:underline">
//             Login here
//           </Link>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default SignupForm;
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { signupSuccess } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignupForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role_id: "",
  });

  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch roles from backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/roles`;
        const response = await axios.get(url);
        setRoles(response.data.roles || response.data);
      } catch (error) {
        console.error("Failed to fetch roles:", error.message);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccessMessage(""); // clear success on input change
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit mobile number";

    if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password))
      newErrors.password = "Password must include a special character";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

   

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { confirmPassword, ...dataToSend } = formData;

    setLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`,
        dataToSend
      );

      const result = response.data;

      dispatch(signupSuccess({ user: result.user, token: result.token }));
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);

      setSuccessMessage("Signup successful! 🎉");
      setTimeout(() => {
        router.push("/login");
      }, 1500); // short delay so success message shows
      // 🎯 Role-based redirect
      const roleId = result.user.role_id;
      setTimeout(() => {
        switch (roleId) {
          case 1:
            router.push("/team-dashboard");
            break;
          case 2:
            router.push("/client-dashboard");
            break;
          case 3:
            router.push("/associate-partner-dashboard");
            break;
          default:
            router.push("/packages");
        }
        
      }, 1500); // short delay so success message shows
    } catch (error) {
      const msg =
        error?.response?.data?.message || "";
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-cover bg-center py-5 px-10"
      style={{ backgroundImage: "url('/assets/Verticle.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-10 bg-white border my-10 space-y-4 mt-30 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        {successMessage && (
          <p className="text-green-600 text-center">{successMessage}</p>
        )}
        {errors.general && (
          <p className="text-red-600 text-center">{errors.general}</p>
        )}

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        {/* Role */}
        <select
          name="role_id"
          value={formData.role_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Role</option>
          {roles
            .filter((role) => role.name.toLowerCase() !== "admin")
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
        {errors.role_id && (
          <p className="text-red-500 text-sm">{errors.role_id}</p>
        )}

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-[5px] bg-[#FEC63F] border-l-[15px] border-l-[#C09837] px-[14px] py-[12px] hover:bg-[#C09837] text-black font-medium transition duration-300 disabled:opacity-60"
        >
          {loading ? "Signing Up..." : "Sign Up"}
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

export default SignupForm;

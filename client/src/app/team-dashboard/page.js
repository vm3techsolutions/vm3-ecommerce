"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const TeamDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const decoded = jwtDecode(token);
    if (decoded.role !== 2) {
      router.push("/unauthorized"); // you can create this page
    }
  }, []);

  return <h1 className="text-center p-10 text-2xl font-bold">Team Dashboard</h1>;
};

export default TeamDashboard;

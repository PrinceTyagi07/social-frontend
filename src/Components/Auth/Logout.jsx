

// Logout.js (Separate Component)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {Apis} from "../../All_Apis"
const {
  logout
}=Apis
const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(logout, {
        method: "POST", // Or POST
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.ok) {
        Cookies.remove("cookie");
        navigate("/"); // Redirect after logout
        console.log("Logout successful");
      } else {
        const data = await response.json();
        console.error("Logout failed:", data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className=" text-lg shadow-2xl shadow-amber-900 bg-amber-300 rounded-md mb-2 text-red-500 font-semibold transition-transform duration-200 hover:scale-90 active:scale-120"
    >
      Logout
    </button>
  );
};

export default Logout;
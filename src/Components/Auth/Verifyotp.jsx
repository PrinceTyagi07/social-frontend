// Verifyotp.js
import React, { useState } from "react";

const Verifyotp = ({ verifyOTP }) => {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setOtp(value);
    verifyOTP(value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-1">
        OTP Verification <span className="text-red-600">*</span>
      </label>
      <input
        type="text"
        value={otp}
        onChange={handleChange}
        maxLength="6"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
        placeholder="Enter 6-digit OTP"
      />
    </div>
  );
};

export default Verifyotp;

import React, { useState, useEffect } from "react";
import Verifyotp from "./Verifyotp";
import VideoKYC from "./VideoKYC";
import { sendOTP, verifyOTPWithBackend } from "./otpService";
import { useNavigate } from "react-router-dom";
import { Apis } from "../../All_Apis";

const { signupApi } = Apis;

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    aadhaarNumber: "",
    phone: "",
    accountType: "Visitor" // Added missing required field
  });
  const [otpSent, setOtpSent] = useState(false);
  const [backendOTP, setBackendOTP] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step === 4) {
      navigate("/login");
    }
  }, [step, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendOTP = async () => {
    const { email, phone, aadhaarNumber, password, confirmPassword } = userData;

    if (!email || !phone || !aadhaarNumber || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await sendOTP({ email, phone });
      if (result.success) {
        setOtpSent(true);
        setBackendOTP(result.otp);
        setStep(2);
      } else {
        setError(result.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (otp) => {
    setLoading(true);
    try {
      const result = await verifyOTPWithBackend({ otp, sentOtp: backendOTP });
      if (result.success) {
        setOtpVerified(true);
        setStep(3);
        setError("");
      } else {
        setError("Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong during OTP verification.");
    } finally {
      setLoading(false);
    }
  };

  const handleKycComplete = async () => {
    setLoading(true);
    try {
      const response = await fetch(signupApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userData,
          otp: backendOTP // Include the verified OTP
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to complete signup");
      }

      if (response.status === 201) {
        setStep(4);
      } else {
        setError(data.message || "Failed to complete signup.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Error saving data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>

      {step === 1 && (
        <>
          {["firstName", "lastName", "username", "email", "password", "confirmPassword", "phone", "aadhaarNumber"].map((field) => (
            <input
              key={field}
              type={
                field === "password" || field === "confirmPassword"
                  ? "password"
                  : field === "email"
                  ? "email"
                  : "text"
              }
              name={field}
              placeholder={
                field === "confirmPassword"
                  ? "Confirm Password"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={userData[field]}
              onChange={handleInputChange}
              className="w-full mb-3 px-4 py-2 border rounded"
            />
          ))}
          <button
            onClick={handleSendOTP}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-blue-300"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
          {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        </>
      )}

      {step === 2 && (
        <>
          <Verifyotp verifyOTP={handleVerifyOTP} loading={loading} />
          {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        </>
      )}

      {step === 3 && <VideoKYC onComplete={handleKycComplete} loading={loading} />}

      {step === 4 && (
        <div className="text-center">
          <h2 className="text-green-600 text-xl font-bold mb-4">Signup Successful!</h2>
          <p className="text-sm">Thank you for verifying your identity.</p>
        </div>
      )}
    </div>
  );
};

export default Signup;
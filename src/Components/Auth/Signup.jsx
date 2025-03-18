import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Verifyotp from "./Verifyotp";
import { Apis } from "../../All_Apis";

const { signupApi, otpApi } = Apis;

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [openOtpField, setOpenOtpField] = useState(false);
  const [closeOtpButton, setCloseOtpButton] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "Visitor",
    contactNumber: "",
    aadhaarNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const verifyOTP = (newOTP) => {
    setOtp(newOTP);
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
      isValid = false;
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required.";
      isValid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    if (!formData.contactNumber || !/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be 10 digits.";
      isValid = false;
    }

    if (!formData.aadhaarNumber || !/^\d{12}$/.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = "Aadhaar number must be 12 digits.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sendOTP = async () => {
    if (!validate()) return;
    setCloseOtpButton(true);
    setOpenOtpField(true);
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(otpApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("OTP sent successfully! Check your email.");
      } else {
        setMessage(result.message || "Failed to send OTP. Try again.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        if (!otp) {
          setMessage("Please enter OTP before signing up.");
          return;
        }

        const SignUpdata = { ...formData, otp };
        console.log(SignUpdata);

        const response = await fetch(signupApi, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(SignUpdata),
        });

        const result = await response.json();
        console.log("Signup Response:", result);

        if (result.success) {
          console.log("Signup successful", result);
          navigate("/login");
        } else {
          setMessage(result.message || "Signup failed. Try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border-gray-300 rounded-lg mt-7">
      <h2 className="text-2xl font-bold text-center mb-4">Create a New Account</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
        <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
        <InputField label="Username" name="username" value={formData.username} onChange={handleChange} error={errors.username} />
        <InputField label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} type="email" />
        <InputField label="Password" name="password" value={formData.password} onChange={handleChange} error={errors.password} type="password" />
        <InputField label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} type="password" />
        <InputField label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} error={errors.contactNumber} />
        <InputField label="Aadhaar Number" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} error={errors.aadhaarNumber} />

        {!closeOtpButton && (
          <button type="button" onClick={sendOTP} className="w-full py-2 mb-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-md transition-transform duration-200 hover:scale-95 active:scale-110">
            Send OTP
          </button>
        )}

        {openOtpField && (
          <div>
            <Verifyotp verifyOTP={verifyOTP} />
            <button type="submit" className="w-full py-2 rounded-md bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold transition-transform duration-200 active:scale-110">
              Sign Up
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, error, type = "text" }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold">{label} <span className="text-red-600 text-lg">*</span></label>
    <input type={type} name={name} value={value} onChange={onChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default Signup;

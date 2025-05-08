import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Apis } from "../../All_Apis";

const { loginApi } = Apis;

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userToken = Cookies.get("cookie");
    try {
      const decodedToken = jwtDecode(userToken);
      setUsername(decodedToken.username);
      if (userToken) {
        navigate(`profile/:${decodedToken.username}`);
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setServerError("");
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        // Simulate API call
        setTimeout(() => {
          console.log("Login successful", formData);
          Cookies.set("cookie", "dummy_token", { expires: 7 });
          navigate(`/profile/:${formData.emailOrUsername}`);
        }, 1000);
      } catch (error) {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="emailOrUsername" className="block text-sm font-semibold">
            Email or Username <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="emailOrUsername"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {serverError && <p className="text-red-500 text-sm text-center mb-2">{serverError}</p>}

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold transition-transform duration-200 hover:scale-95 active:scale-110"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
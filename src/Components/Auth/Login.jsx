import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie to manage cookies
import { jwtDecode } from "jwt-decode";
import {Apis} from "../../All_Apis"
const {
  loginApi
}=Apis
const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [serverError, setServerError] = useState(""); // State for backend errors
  const navigate = useNavigate();
  const [username, setusername] = useState(""); // State for backend errors
 
  
  // 🔹 Redirect to home if already logged in
  useEffect(() => {
     const userToken = Cookies.get("cookie"); // Get token from cookies (cookie is the name set by backend)
    try {
          const decodedToken = jwtDecode(userToken); // Decode JWT
           setusername (decodedToken.username); // Assuming the token has a "username" field
          // console.log("decodeed token ->",decodedToken);
        } catch (error) {
          console.error("Invalid token:", error);
        }
    // console.log("userToken is ", userToken);
    if (userToken) {
      navigate(`profile/:${username}`); // Redirect to home if token exists
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setServerError(""); // Reset server error on input change
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // if (!formData.emailOrUsername || !/\S+@\S+\.\S+/.test(formData.emailOrUsername)) {
    //   newErrors.emailOrUsername = "Valid emailOrUsername is required.";
    //   isValid = false;
    // }

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
        const response = await fetch(loginApi, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Login successful", data);

          // 🔹 Save token in cookies with expiration (e.g., 7 days)
          Cookies.set("cookie", data.token, { expires: 7, secure: true }); // Update the cookie name to match backend

          navigate(`/profile/:${username}`); // Redirect to home after successful login
        } else {
          setServerError(data.message || "Invalid emailOrUsername or password.");
        }
      } catch (error) {
        setServerError("Something went wrong. Please try again.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-3 rounded-lg mb-4">
      <h2 className="text-2xl font-bold text-center mb-4">Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        {/* emailOrUsername Input */}
        <div className="mb-4">
          <label htmlFor="emailOrUsername" className="block text-sm font-semibold">
            emailOrUsername <span className="text-red-600 text-lg">*</span>
          </label>
          <input
            type="emailOrUsername"
            id="emailOrUsername"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          {errors.emailOrUsername && <p className="text-red-500 text-sm">{errors.emailOrUsername}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">
            Password <span className="text-red-600 text-lg">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Server Error Message */}
        {serverError && <p className="text-red-500 text-sm text-center mb-2">{serverError}</p>}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full  py-2 rounded-md bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold transition-transform duration-200 hover:scale-95 active:scale-110"
        >
          Login
        </button>
      </form>
      
    </div>
  );
};

export default Login;

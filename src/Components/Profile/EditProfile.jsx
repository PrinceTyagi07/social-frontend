import React, { useState } from "react";
import { motion } from "framer-motion";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    profilePhoto: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} // Starts small
      animate={{ opacity: 1, scale: 1 }} // Grows up on render
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center min-h-screen px-2 "
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md mt-10 shadow-md m-2 shadow-orange-400">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border-2 border-orange-500 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
          />

          {/* Username */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full px-4 py-2 border-2 border-orange-500 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
          />

          {/* Bio */}
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write something about yourself..."
            rows="3"
            className="w-full px-4 py-2 border-2 border-orange-500 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
          ></textarea>

          {/* Profile Photo URL */}
          <input
            type="text"
            name="profilePhoto"
            value={formData.profilePhoto}
            onChange={handleChange}
            placeholder="Profile photo URL"
            className="w-full px-4 py-2 border-2 border-orange-500 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
          />

          {/* Submit Button with Click Interaction */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }} // Shrinks on click
            className="w-full py-2 px-4 rounded-md text-white font-semibold bg-gradient-to-r from-orange-500 to-red-400 hover:from-red-400 hover:to-orange-500 transition duration-300"
          >
            Update Profile
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default EditProfile;

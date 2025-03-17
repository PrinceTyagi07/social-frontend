import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  // const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [showSuggestions, setShowSuggestions] = useState(false); // New state for suggestions visibility
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setUsers([]);
      return;
    }
    // setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://socialappbackend-n15j.onrender.com/api/v1/auth/UserSearch?search=${searchTerm}`,
          { headers: { Authorization: `Bearer ${Cookies.get("cookie")}` } }
        );

        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchUsers, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="lg:w-full mx-5 max-w-md md:mx-auto   mt-6">
      <input
        type="text"
        placeholder="Search for users..."
        className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-3 focus:ring-orange-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mt-2 bg-white shadow-md rounded-xl shadow-amber-400 max-h-60 overflow-y-auto">
        {loading ? (
          <p className="text-center py-2 text-gray-500">Loading...</p>
        ) : users.length > 0 ? (
          users.map((user, index) => (
            <Link to={`/userProfile/${user._id}`} key={index}>
              <div className="p-3 border-b border-gray-200 flex gap-2">
                <img src={user.image} alt="" className="rounded-full w-[30px] h-[30px]" />
                <p className="text-gray-500 text-sm">{user.username}</p>
              </div>
            </Link>
          ))
        ) : (
          searchTerm && <p className="text-center py-2 text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBox;

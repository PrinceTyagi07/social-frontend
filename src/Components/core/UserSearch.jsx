import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    limit: 10,
  });

  // Fetch users based on search term and pagination
  const fetchUsers = async (searchTerm, page = 1, limit = 10) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://socialappbackend-n15j.onrender.com/api/users/search?search=${searchTerm}&page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${Cookies.get("cookie")}` } }
        
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data.data); // Set the fetched users
      setPagination(data.pagination); // Update pagination metadata
    } catch (err) {
      setError(err);
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search term changes
  useEffect(() => {
    if (searchTerm) {
      fetchUsers(searchTerm, pagination.currentPage, pagination.limit);
      setShowSuggestions(true); // Show suggestions when there's a search term
    } else {
      setUsers([]); // Clear suggestions if search term is empty
      setShowSuggestions(false); // Hide suggestions
    }
  }, [searchTerm, pagination.currentPage, pagination.limit]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPagination((prev) => ({ ...prev, currentPage: 1 })); // Reset to page 1 on new search
  };

  // Handle suggestion click
  const handleSuggestionClick = (user) => {
    setSearchTerm(user.username); // Fill the search box with the clicked username
    setShowSuggestions(false); // Hide the suggestions
    // You can also navigate to the user's profile page here if needed
  };

  // Handle input blur
  const handleBlur = () => {
    // Optional: Hide suggestions when the input loses focus (after a small delay)
    setTimeout(() => setShowSuggestions(false), 200); // Small delay to allow suggestion click
  };

  // Handle pagination (next page)
  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  // Handle pagination (previous page)
  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={handleSearchChange}
        onBlur={handleBlur} // Handle blur event
      />

      {showSuggestions && users.length > 0 && ( // Conditionally render suggestions
        <ul className="suggestions">
          {users.map((user) => (
            <li key={user._id} onClick={() => handleSuggestionClick(user)}>
              <img src={user.image} alt={user.username} /> {/* Display profile picture */}
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      )}

      {showSuggestions && users.length === 0 && searchTerm && (
        <p className="no-suggestions">No users found</p>
      )}

      {/* Pagination controls */}
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={pagination.currentPage === 1}>
            Previous
          </button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
import React, { useState, useEffect } from "react";
import { FaPlus, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import PostsSection from "../Components/Profile/PostsSection";
import { Apis } from "../All_Apis";
import ShareProfileButton from "../Components/Profile/ShareProfileButton";

const { getCreatorPosts, followUser: followApi, unfollowUser: unfollowApi, getFollowersAndFollowing} = Apis;

const Profile = () => {
  const [userImg, setUserImg] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userAbout, setUserAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [creatorId, setCreatorId] = useState(null);
  const [followersCount, setFollowersCount] = useState(3452);
  const [followingCount, setFollowingCount] = useState(50);
  const [isFollowing, setIsFollowing] = useState(false);

  // Get user ID from cookie
  const getUserIdFromCookie = () => {
    try {
      const token = Cookies.get("cookie");
      if (!token) throw new Error("No token found");
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      console.error("Error decoding token:", error);
      setError("Authentication error. Please log in again.");
      setLoading(false);
      return null;
    }
  };




  // Fetch posts for the profile user
  const fetchPosts = async () => {
    if (!creatorId) return;

    try {
      const res = await fetch(`${getCreatorPosts}?Creator=${creatorId}`, {
        headers: { Authorization: `Bearer ${Cookies.get("cookie")}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch posts");
      }

      const result = await res.json();
      
       
        setUserImg(result.data.image);
        setUserName(result.data.username);
        setUserAbout(result.data.about);

      if (result.data && Array.isArray(result.data.posts)) {
        setPosts(result.data.posts);
      } else {
        console.warn("Unexpected API response structure:", result);
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err.message);
    }
  };

  // // Follow a user
  // const handleFollow = async () => {
  //   try {
  //     const res = await fetch(`${followApi}/${creatorId}`, {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${Cookies.get("cookie")}` },
  //     });

  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       throw new Error(errorData.message || "Failed to follow user");
  //     }

  //     setIsFollowing(true);
  //     setFollowersCount((prev) => prev + 1);
  //   } catch (err) {
  //     console.error("Error following user:", err);
  //     setError(err.message);
  //   }
  // };

  // // Unfollow a user
  // const handleUnfollow = async () => {
  //   try {
  //     const res = await fetch(`${unfollowApi}/${creatorId}`, {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${Cookies.get("cookie")}` },
  //     });

  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       throw new Error(errorData.message || "Failed to unfollow user");
  //     }

  //     setIsFollowing(false);
  //     setFollowersCount((prev) => prev - 1);
  //   } catch (err) {
  //     console.error("Error unfollowing user:", err);
  //     setError(err.message);
  //   }
  // };

  // Fetch followers and following count
  const fetchFollowersAndFollowing = async () => {
    if (!creatorId) return;

    try {
      const res = await fetch(`${getFollowersAndFollowing}/${creatorId}`, {
        headers: { Authorization: `Bearer ${Cookies.get("cookie")}` },
      });


      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch followers/following");
      }

      const data = await res.json();


      setFollowersCount(data.followers.length || 0);
      setFollowingCount(data.following.length || 0);

      const currentUserId = getUserIdFromCookie();
      setIsFollowing(data.followers.includes(currentUserId));
    } catch (err) {
      console.error("Error fetching followers/following:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    const storedCreatorId = getUserIdFromCookie();
    if (!storedCreatorId) return;

    setCreatorId(storedCreatorId);
    setLoading(true);
   


    const fetchData = async () => {
      try {
        await fetchFollowersAndFollowing();
        await fetchPosts();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [creatorId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Username and Upper Icons Section */}
      <div className="flex items-center justify-between h-[6vh] border-b mb-5 px-2">
        <h2 className="font-semibold text-lg">{userName}</h2>
        <div className="flex gap-3 text-xl">
          <FaPlus className="cursor-pointer text-gray-700 hover:text-orange-500 transition" />
          <Link to="/profileSetting">
            <FaBars className="cursor-pointer text-gray-700 hover:text-orange-500 transition" />
          </Link>
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex justify-between items-center px-4">
        <img
          src={userImg}
          alt="Profile"
          className="w-[80px] h-[80px] rounded-full border-2 border-orange-500"
        />
        <div className="flex gap-8 text-center">
          <div>
            <h3 className="font-semibold text-gray-700">Posts</h3>
            <p className="font-medium">{posts.length}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Followers</h3>
            <p className="font-medium">{followersCount}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Following</h3>
            <p className="font-medium">{followingCount}</p>
          </div>
        </div>
      </div>

      {/* User Bio */}
      <div className="px-4 mt-3">
        <h5 className="font-semibold text-lg">{userName}</h5>
        <p className="text-gray-600">{userAbout}</p>
      </div>

      {/* Follow/Unfollow and Share Buttons */}
      <div className="flex justify-between px-4 mt-4">
        {/* {isFollowing ? (
          <button onClick={handleUnfollow} className="profile-btn">Unfollow</button>
        ) : (
          <button onClick={handleFollow} className="profile-btn">Follow</button>
        )} */}

       <Link to="/editprofile"><button className="w-full py-2 px-4 rounded-md text-white font-semibold bg-gradient-to-r from-orange-500 to-red-400 hover:from-red-400 hover:to-orange-500 transition duration-300">Edit profile</button></Link>
        <ShareProfileButton username={userName}/>
      </div>

      {/* Posts Section */}
      
      <PostsSection posts={posts} />
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FaHandHoldingHeart } from "react-icons/fa6";

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [likeCounts, setLikeCounts] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `https://socialappbackend-n15j.onrender.com/api/v1/profile/getUserDetails/${id}`,
                    { headers: { Authorization: `Bearer ${Cookies.get("cookie")}` } }
                );
                const userData = response.data.data;
                setUser(userData);

                // Extract posts and calculate like counts
                const posts = userData.posts;
                const likeCountMap = {};
                posts.forEach((post) => {
                    likeCountMap[post._id] = post.CommentsAndLike.filter(
                        (comment) => comment.like === true
                    ).length;
                });

                setLikeCounts(likeCountMap);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [id]);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="py-2 flex flex-col items-start rounded shadow mb-10">
            {/* Upper Section */}
            <div className="flex justify-between w-full gap-2 mx-auto px-4">
                <div>
                    <img
                        src={user.image}
                        alt="Profile"
                        className="w-[80px] h-[80px] rounded-full border-2 border-orange-500"
                    />
                    <div className="flex flex-col mt-2 gap-3 items-center">
                        <h2 className="">{user.username}</h2>
                        <h2>{user.additionalDetails?.about || "No bio available"}</h2>
                    </div>
                </div>
                <div className="flex gap-7 text-center mt-4">
                    <div>
                        <h3 className="font-semibold text-gray-700">Posts</h3>
                        <p className="font-medium">{user.posts.length}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700">Followers</h3>
                        <p className="font-medium">{user.followers.length}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700">Following</h3>
                        <p className="font-medium">{user.following.length}</p>
                    </div>
                </div>
            </div>

            {/* Follow and Share Buttons */}
            <div className="flex justify-between w-full px-10">
                <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className="w-[26vw] h-[6vh] py-1 px-2 rounded-sm text-white font-semibold bg-gradient-to-r from-orange-500 to-red-400 hover:from-red-400 hover:to-orange-500 transition duration-300 hover:scale-90"
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </button>
                <button className="w-[26vw] h-[6vh] py-1 px-2 rounded-sm text-white font-semibold bg-gradient-to-r from-orange-500 to-red-400 hover:from-red-400 hover:to-orange-500 transition duration-300 hover:scale-90">
                    Share Profile
                </button>
            </div>

            {/* Posts Section */}
            <div className="w-full flex">
                <h2 className="mx-auto font-semibold text-xl">Posts</h2>
            </div>
            <div className="flex flex-col">
                {user.posts.map((post) => (
                    <div key={post._id} className="p-1">
                        <img
                            src={post.postUrl}
                            alt="User Post"
                            className="w-full h-auto rounded"
                        />
                        <div className="flex items-center gap-2">
                            <FaHandHoldingHeart className="text-red-500" />
                            <span className="text-sm text-gray-500">
                                {likeCounts[post._id] || 0} Likes
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserProfile;

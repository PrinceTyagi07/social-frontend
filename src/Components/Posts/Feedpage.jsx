import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { FaHandHoldingHeart, FaPaperPlane } from "react-icons/fa6";
import { LiaCommentsSolid } from "react-icons/lia";
import { Apis } from "../../All_Apis";
import { jwtDecode } from "jwt-decode";
import { FaUserCircle } from "react-icons/fa";

const { togglelike, createComment } = Apis;

const Feedpage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [showCommentBox, setShowCommentBox] = useState({});

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://socialappbackend-n15j.onrender.com/api/v1/post/getAllPosts",
        { headers: { Authorization: `Bearer ${Cookies.get("cookie")}` } }
      );
      const data = response.data.data;
      // console.log(response.data.data)
      setPosts(data);

      const initialLikeCounts = {};
      const initialLikedPosts = {};

      for (const post of data) {
        const detailedCommentsAndLikes = await Promise.all(
          post.CommentsAndLike.map(async (id) => {
            try {
              const commentLikeResponse = await axios.get(

                `https://socialappbackend-n15j.onrender.com/api/v1/post/getAllCommentsLike/${id}`
              );
              console.log("post",post)
              return commentLikeResponse.data.data;
            } catch (error) {
              console.error(`Error fetching comments and likes for ID ${id}:`, error);
              return null;
            }
          })
        );
        const getcookie = () => Cookies.get("cookie");
        const decodedToken = jwtDecode(getcookie());
     

      
        initialLikeCounts[post._id] = detailedCommentsAndLikes.filter((cl) => cl.like === true).length;
        initialLikedPosts[post._id] = detailedCommentsAndLikes.some(
          (cl) => cl.user._id === decodedToken.id && cl.like === true
        );
         }

      setLikeCounts(initialLikeCounts);
      setLikedPosts(initialLikedPosts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(
        togglelike,
        { postId },
        { headers: { Authorization: `Bearer ${Cookies.get("cookie")}` } }
      );

      const result = response.data;
      setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
      setLikeCounts((prev) => ({ ...prev, [postId]: result.likeCount || 0 }));
    } catch (err) {
      console.error("Like Error:", err.message);
    }
  };

  const handleShowComments = async (postId) => {
    setShowCommentBox((prev) => ({ ...prev, [postId]: !prev[postId] }));

    if (!comments[postId]) {
      try {
        const response = await axios.get(
          `https://socialappbackend-n15j.onrender.com/api/v1/post/${postId}/comments`,
          { headers: { Authorization: `Bearer ${Cookies.get("cookie")}` } }
        );
        setComments((prev) => ({ ...prev, [postId]: response.data.data }));
      } catch (err) {
        console.error("Comment Fetch Error:", err.message);
      }
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!commentInput[postId]) return;

    try {
      const response = await axios.post(
        createComment,
        { postId, comment: commentInput[postId] },
        { headers: { Authorization: `Bearer ${Cookies.get("cookie")}` } }
      );

      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), response.data.comment],
      }));

      setCommentInput((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Comment Error:", err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mb-20">
      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-300">{error}</p>}
      <div className="space-y-6">
        
        {posts.map((post) => (
          <div key={post._id} className="  p-3 rounded gap-2 flex flex-col relative">
            <p className="flex  items-center w-fit  justify-start gap-2 "><span className="rounded-full  overflow-hidden h-[40px] w-[40px]">
              <img src={post.creatorId.image} alt="" />
            </span>
              {post.creatorId.username}</p>
            <div className="flex items-center gap-2">
            {/* Media Handling (Image or Video) */}
            {post.postUrl.includes(".mp4") || post.postUrl.includes(".webm") ? (
              <video className="w-full rounded-md" src={post.postUrl} controls />
            ) : (
              <img className="w-full rounded-md" src={post.postUrl} alt="Post" />
            )}

  
            </div>

             <div className=""><p className="">{post.description}</p></div>
            <div className="flex gap-4 items-center text-2xl mt-2">
              <span
                className={`cursor-pointer ${likedPosts[post._id] ? "text-red-500" : "text-gray-600"}`}
                onClick={() => handleLike(post._id)}
              >
                <FaHandHoldingHeart />
              </span>
              <span className="text-sm text-gray-500">{likeCounts[post._id] || 0} Likes</span>
              <span className="cursor-pointer text-gray-600" onClick={() => handleShowComments(post._id)}>
                <LiaCommentsSolid />
              </span>
            </div>
            {/* show comment  */}
            {showCommentBox[post._id] && (
              <div className="mt-2">
                {comments[post._id]?.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <img className="w-[20px] h-[20px] rounded-full" src={c.user.image} alt="" />
                    <p>
                     
                      <strong>{c.user.username}:</strong> {c.comment}
                    </p>
                  </div>
                ))}
                <div className="relative">
                  <input
                    placeholder="Enter Your Comment"
                    className="border p-1 w-full"
                    value={commentInput[post._id] || ""}
                    onChange={(e) => setCommentInput({ ...commentInput, [post._id]: e.target.value })}
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={() => handleCommentSubmit(post._id)}>
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            )}
            <div className="w-8[vw] mt-5 h-[1px] bg-black"></div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Feedpage;

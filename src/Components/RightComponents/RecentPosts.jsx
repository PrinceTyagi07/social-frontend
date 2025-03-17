import React, { useEffect, useState } from "react";

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/post/getRecentPosts");
        const data = await response.json();
        if (data.success) {
          setPosts(data.data);
        } else {
          setError("Failed to fetch posts.");
        }
      } catch (error) {
        setError("Error fetching recent posts.");
        console.error("Error fetching recent posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 max-h-fit">
      <h2 className="text-2xl font-semibold mb-6 text-center">Recent Posts (Last 20 Days)</h2>

      <div className="flex flex-col w-full gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="flex flex-col justify-between p-4 bg-white shadow-md rounded-lg max-h-fit">
              {/* Post Image */}
              {/* {post.postUrl && (
                <img
                  src={post.postUrl}
                  alt="Post"
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )} */}

              {/* User Info */}
              <div className="flex items-center min:w-full gap-3">
                <img
                  src={post.creatorId.image}
                  alt={post.creatorId.username}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{post.description}</h3>
                  <p className="text-sm text-gray-500">@{post.creatorId.username}</p>
                </div>
              </div>

              {/* Comments & Likes */}
              <div className="mt-3">
                <h4 className="text-sm font-semibold text-gray-700">Comments & Likes:</h4>
                {post.CommentsAndLike.length > 0 ? (
                  <ul className="text-gray-600">
                    {post.CommentsAndLike.slice(0, 3).map((comment, index) => (
                      <li key={index} className="flex justify-between items-center text-sm bg-gray-200 px-3 py-1 rounded-md my-1">
                        <span>{comment.comment || "No comment"}</span>
                        {comment.like ? <span className="text-green-500">👍</span> : null}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm">No comments yet</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No recent posts available</div>
        )}
      </div>
    </div>
  );
};

export default RecentPosts;

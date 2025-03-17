import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ReactPlayer from "react-player";

const isVideo = (url) => url && /\.(mp4|mov|webm|ogg|mkv)$/i.test(url);
const isImage = (url) => url && /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

const PostsSection = ({ posts }) => {
  
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isMediaVideo, setIsMediaVideo] = useState(false);

  // Reset selected media when user navigates away (cleanup effect)
  useEffect(() => {
    return () => {
      setSelectedMedia(null);
      setIsMediaVideo(false);
    };
  }, []);

  return (
    <div>
      <div className="text-center mt-6">
        <h1 className="font-bold text-lg text-gray-800">Posts</h1>
      </div>

      <div className="grid grid-cols-3 gap-2 px-4 mt-3">
        {posts?.map((post) => (
        
          <div
          
            key={post._id}
            className="w-full h-[220px] bg-gray-200 rounded-md flex items-center justify-center relative cursor-pointer"
            onClick={() => {
              setSelectedMedia(post.postUrl);
              setIsMediaVideo(isVideo(post.postUrl));
            }}
          >
            
            {isVideo(post.postUrl) ? (
              <ReactPlayer
                url={post.postUrl}
                playing={false} // Prevent autoplay on re-render
                width="100%"
                height="100%"
                controls={false}
                playIcon={<FaPlay className="text-red-400 text-4xl" />}
              />
            ) : isImage(post.postUrl) ? (
              <img
                src={post.postUrl}
                alt="Post"
                className="object-cover w-full h-full rounded-md"
              />
            ) : (
              <p className="text-gray-500">No content available</p>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Media Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.2, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          >
            {isMediaVideo ? (
              <ReactPlayer
                
                url={selectedMedia}
                width="90%"
                height="90%"
                controls={true}
                onEnded={() => setSelectedMedia(null)} // Close modal on video end
              />
            ) : (
              <img src={selectedMedia} alt="Full Image" className="max-w-full max-h-full rounded-md" />
            )}
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setSelectedMedia(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostsSection;

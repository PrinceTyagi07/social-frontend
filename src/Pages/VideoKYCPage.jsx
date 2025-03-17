import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const VideoKYCPage = () => {
  const [isFaceVisible, setIsFaceVisible] = useState(false);
  const [isFaceCaptured, setIsFaceCaptured] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoStream, setVideoStream] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        });
        videoRef.current.srcObject = stream;
        setVideoStream(stream);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (video && canvas) {
      canvas.width = video.videoWidth; // Set canvas width to video width
      canvas.height = video.videoHeight; // Set canvas height to video height
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setIsFaceCaptured(true);

      matchFaceWithAadhaarPhoto().then((isMatched) => {
        if (isMatched) {
          navigate('/login'); // Use navigate for redirection
        } else {
          alert('Face matching failed, please try again.');
          setIsFaceCaptured(false); // Reset capture state if matching fails
        }
      });
    }
  };

  const matchFaceWithAadhaarPhoto = async () => {
    console.log('Matching face with Aadhaar photo...');
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 2000); // Simulate matching delay
    });
  };

  const checkFaceVisibility = () => {
    // Placeholder for face detection logic.  Use a library here.
    // Example using a timeout (replace with actual detection):
    setTimeout(() => {
        // In a real application, you'd use a face detection library 
        // to determine if a face is present and centered.
        const faceDetected = true; // Replace with your face detection logic

        setIsFaceVisible(faceDetected);
    }, 500); // Check after a short delay
  };

  useEffect(() => {
    let interval;
    if (videoRef.current && videoStream) { // Check if videoStream is available
      interval = setInterval(checkFaceVisibility, 1000);
    }

    return () => clearInterval(interval);
  }, [videoStream]); // Add videoStream to the dependency array

  return (
    <div className="video-kyc-container">
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          width="100%"
          height="auto"
          className="video-feed"
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} /> {/* Remove fixed width/height */}
      </div>

      <div className="controls">
        {!isFaceVisible ? (
          <p>Please position your face clearly in front of the camera.</p>
        ) : !isFaceCaptured ? (
          <button
            onClick={capturePhoto}
            className="capture-btn bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-md"
          >
            Capture Face
          </button>
        ) : (
          <p>Face captured successfully. Verifying...</p>
        )}
      </div>
    </div>
  );
};

export default VideoKYCPage;
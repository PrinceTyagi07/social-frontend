import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const VideoKYC = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [photo, setPhoto] = useState(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "user",
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
    setStep(3); // move to next step automatically
  };

  useEffect(() => {
    if (step === 2) {
      setProgress(0);
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            capture(); // Take photo after 3 seconds (100%)
            return 100;
          }
          return prev + 10;
        });
      }, 300); // 300ms x 10 steps = ~3 seconds

      return () => clearInterval(timer);
    }
  }, [step]);

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 3) {
      if (onComplete) onComplete(photo); // optional callback
     navigate("/login")
    }
  };

  return (
    <div className="video-kyc max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Video KYC Verification</h2>

      {step === 1 && (
        <div className="text-center">
          <div className="bg-blue-100 p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-2">Instructions for Video KYC</h3>
            <ul className="text-left list-disc pl-5 space-y-1">
              <li>Make sure you're in a well-lit area</li>
              <li>Keep your face clearly visible</li>
              <li>Remove any accessories like glasses or hats</li>
              <li>Have your original ID proof ready</li>
            </ul>
          </div>
          <button
            onClick={handleContinue}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="text-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="rounded-lg shadow-md"
          />
          <div className="w-full bg-gray-200 h-2 mt-4">
            <div
              className="bg-blue-500 h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-gray-600">Capturing your photo in 3 seconds...</p>
        </div>
      )}

      {step === 3 && photo && (
        <div className="text-center">
          <p className="mb-2">Captured Image:</p>
          <img
            src={photo}
            alt="Captured"
            className="rounded-md shadow-md mb-4 mx-auto"
          />
          <button
            onClick={handleContinue}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Finish Verification
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoKYC;

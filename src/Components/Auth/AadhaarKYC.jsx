import React, { useState } from "react";

const AadhaarKYC = ({ onSubmit, onBack }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      setError("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    setError("");
    onSubmit(aadhaarNumber);
  };

  return (
    <div className="aadhaar-kyc">
      <h2 className="text-2xl font-bold text-center mb-4">Aadhaar eKYC Verification</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          For a seamless experience, please verify your identity using Aadhaar.
          This helps us ensure the security of your account.
        </p>
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full mr-3">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            Your information is securely encrypted and will not be shared
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aadhaar">
            Aadhaar Number
          </label>
          <input
            type="text"
            id="aadhaar"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
            maxLength="12"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
            placeholder="Enter 12-digit Aadhaar number"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onBack}
            className="py-2 px-4 border border-gray-300 rounded-md text-gray-700"
          >
            Back
          </button>
          <button
            type="submit"
            className="py-2 px-4 rounded-md bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold"
          >
            Verify Aadhaar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AadhaarKYC;
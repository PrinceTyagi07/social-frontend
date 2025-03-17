import React, { useState, useRef, useEffect } from "react";

const Verifyotp = (props) => {
    const { verifyOTP } = props;

    const [otp, setotp] = useState("");
    const otpRefs = useRef([]);

    const handleOTPChange = (index, e) => {
        const value = e.target.value;
        if (!/^[0-9]?$/.test(value)) return;

        let newOtp = otp.split("");
        newOtp[index] = value;
        newOtp = newOtp.join("");
        setotp(newOtp);

        if (value && index < 5) {
            otpRefs.current[index + 1].focus();
        }
    };


    useEffect(() => {
        if (otp.length === 6) {  // Check if OTP is complete
            handleverifyOTP(otp); // Call the function here
        }
    }, [otp]); // This effect runs whenever the otp state changes

    const handleverifyOTP = (newOTP) => {
        console.log(newOTP);
        verifyOTP(newOTP);

    };

    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>

            <div className="flex justify-center gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={otp[index] || ""}
                        onChange={(e) => handleOTPChange(index, e)}
                        className="w-10 h-10 text-center border border-gray-300 rounded-md text-lg"
                    />
                ))}

            </div>

        </div>
    );
};

export default Verifyotp;
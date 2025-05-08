// OTPService.js
import { Apis } from "../../All_Apis";
const { otpApi } = Apis;

export const sendOTP = async ({ email, phone, aadhaar }) => {
  try {
    const response = await fetch(otpApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone, aadhaar }),
    });

    const result = await response.json();
    console.log("Result for OTP:", result);

    if (response.ok) {
      return { success: true, otp: result.otp, message: "OTP sent successfully!" };
    } else {
      return { success: false, message: result.message || "Failed to send OTP." };
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Something went wrong." };
  }
};

export const verifyOTPWithBackend = async ({ otp, sentOtp }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (otp === sentOtp) {
        resolve({ success: true });
      } else {
        resolve({ success: false, message: "Invalid OTP" });
      }
    }, 1000);
  });
};

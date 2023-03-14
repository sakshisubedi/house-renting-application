import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendEmailVerificationToken, verifyUserEmail } from "./auth";
import { useAuth, useNotification } from "./context/hookIndex";
import Submit from "./Submit";
import NavBar from "../NavBar"

// OTP input length setting
const OTP_LENGTH = 6;
let currentOTPIndex;

// Check if the input format is correct
const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};

// Thanks to Sakshi for adding the userType parameter to optimize the duplicated structure of landlord. 
export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  // Get current user's verifing status
  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  const isVerified = profile?.isVerified;

  const inputRef = useRef();
  const { updateNotification } = useNotification();

  const { state } = useLocation();
  const user = state?.user;
  const userType = state?.userType;

  const navigate = useNavigate();

  // Jump to next input field
  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex);
  };

  const handleOtpChange = ({ target }) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length);

    if (!value) focusPrevInputField(currentOTPIndex);
    else focusNextInputField(currentOTPIndex);
    setOtp([...newOtp]);
  };

  // Handle user's resend otp request via resendEmailVerificationToken API
  const handleOTPResend = async () => {
    const { error, message } = await resendEmailVerificationToken(user.id);

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
  };

  const handleKeyDown = ({ key }, index) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      focusPrevInputField(currentOTPIndex);
    }
  };

  // First validate otp format, then use verifyUserEmail API to send use's credentials to server on submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) {
      return updateNotification("error", "invalid OTP");
    }

    const {
      error,
      message,
      user: userResponse,
    } = await verifyUserEmail({
      OTP: otp.join(""),
      userId: user.id,
      userType
    });
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    localStorage.setItem("auth-token", userResponse.token);
    localStorage.setItem("user-type", userResponse.userType);
    isAuth();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) navigate('/landing');
    if (isLoggedIn && isVerified) navigate('/landing');
  }, [user, isLoggedIn, isVerified]);

  return (
    <div>
      <NavBar />

      {/* Background color and position of verification card */}
      <div className="fixed inset-0 bg-gray-200 -z-10 flex justify-center items-center">

          {/* Verification card and header */}
          <form onSubmit={handleSubmit} className={"bg-white drop-shadow-lg rounded p-6 space-y-6"}>
            <div>
              <h1 style={{ color: '#505050', fontSize: "18px", fontWeight: "600", fontStyle: "normal", fontFamily: "Inter"}}>
                Please enter the OTP to verify your account
              </h1>
              <p className="text-center text-black">
                OTP has been sent to your email
              </p>
            </div>

            {/* Verification Input */}
            <div className="flex justify-center items-center space-x-4">
              {otp.map((_, index) => {
                return (
                  <input
                    ref={activeOtpIndex === index ? inputRef : null}
                    key={index}
                    type="number"
                    value={otp[index] || ""}
                    onChange={handleOtpChange}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 border-2 focus:border-black rounded bg-transparent outline-none text-center text-black font-semibold text-xl spin-button-none"
                  />
                );
              })}
            </div>

            {/* Verification button */}
            <div>
              <Submit value="Verify Account" />
              <button
                onClick={handleOTPResend}
                type="button"
                className="text-blue-500 font-semibold hover:underline mt-2"
              >
                No OTP?
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}

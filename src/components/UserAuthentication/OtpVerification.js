import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { useOtpverificationMutation } from "../../Redux/Action";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const OTPVerification = ({ onBackClick }) => {
  const data = useSelector((state) => state["rootReducer"]["userSlice"]);

  const [
    otpverification,
    {
      isLoading: isOtpLoading,
      isSuccess: isOtpSuccess,
      isError: isOtpError,
      data: otpData,
      error: otpError,
    },
  ] = useOtpverificationMutation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [alertVisible, setAlertVisible] = useState(true);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkOtpLength = otp.filter((elem) => elem.length > 0);
    const isNumber = /^[0-9]*$/.test(parseInt(checkOtpLength.join("")));
    console.log(isNumber);
    if (checkOtpLength.length !== 6) {
      toast.error("otp length must be 6 digit", { autoClose: "2000" });
      return;
    }
    if (!isNumber) {
      toast.error("otp must be digits not alphabetic or special character", {
        autoClose: "2000",
      });
      return;
    }
    if (data.userId) {
      console.log("data", data);
      otpverification({
        otp: parseInt(checkOtpLength.join("")),
        id: data.userId,
      });
    } else toast.error("otp is not valid", { autoClose: "2000s" });

    // Handle OTP verification logic here
  };

  useEffect(() => {
    console.log("useEffect hook is called");
    if (isOtpSuccess === true) {
      console.log("useEffect condition is verified");
      toast.success("otp verify successfully", {
        autoClose: "2000",
        onClose: () => navigate("/login"),
      });
      if (isOtpError === true)
        toast.error("otp is not valid", { autoClose: "2000" });
    }
  }, [otpData, otpError]);

  return (
    <>
      {alertVisible && (
        <div
          id="otp-alert"
          class="flex justify-between items-start sm:items-center p-4 mb-4 text-sm text-fg-brand-strong rounded-base bg-brand-softer bg-blue-100 text-blue-800"
          role="alert"
        >
          <div class="flex items-start sm:items-center">
            <svg
              class="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <p>
              <span class="font-medium me-1">Info alert!</span>
              If you don’t see the OTP verification code in your inbox, please
              check your email’s spam folder.
            </p>
          </div>

          <button
            type="button"
            onclick="document.getElementById('otp-alert').style.display='none'"
            class="ms-4 text-blue-800 hover:text-blue-900"
            onClick={() => setAlertVisible(!alertVisible)}
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-[30%]">
          <button
            onClick={onBackClick}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" onClick={() => navigate(-1)} />
            Back
          </button>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Verify Email
            </h2>
            <p className="text-gray-600">
              We've sent a verification code to your email
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg py-2.5 font-medium hover:bg-blue-700 transition-colors"
            >
              {isOtpLoading ? "Loading......." : "Verify Number"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Didn't receive the code?{" "}
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Resend
              </button>
            </p>
          </div>
        </div>
        {console.log(
          "otppayload",
          isOtpLoading,
          isOtpSuccess,
          isOtpError,
          otpData,
          otpError,
        )}
        {console.log("otpverification", otp)}
      </div>
    </>
  );
};

export default OTPVerification;

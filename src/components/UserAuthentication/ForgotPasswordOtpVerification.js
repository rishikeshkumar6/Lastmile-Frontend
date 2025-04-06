import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { toast } from "react-toastify";
import { useForgotPasswordOtpVerificationMutation } from "../../Redux/Action";

const ForgotPasswordOtpVerifications = ({ onBackClick }) => {
  const [
    forgotPasswordOtpVerification,
    { isLoading, isSuccess, isError, data, error },
  ] = useForgotPasswordOtpVerificationMutation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
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
    console.log("checkotpLength", checkOtpLength.join(""));
    forgotPasswordOtpVerification({ otp: parseInt(checkOtpLength.join("")) });

    // Handle OTP verification logic here
  };

  useEffect(() => {
    console.log("useEffect hook is called");
    if (isSuccess === true) {
      console.log("useEffect condition is verified");
      toast.success("otp verify successfully", {
        autoClose: "2000",
        onClose: () => navigate("/resetpassword"),
      });
      if (error === true && error?.statusCode === 201)
        toast.error(data["errorMessage"], { autoClose: "2000" });
    }
  }, [data, error]);

  return (
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
            Verify Phonenumber
          </h2>
          <p className="text-gray-600">
            We've sent a verification code to your phonenumber
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
           {isLoading?'Loading........':'Verify Number'}
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

      {console.log("------rtk query check------", {
        isLoading,
        isSuccess,
        isError,
        data,
        error,
      })}
    </div>
  );
};

export default ForgotPasswordOtpVerifications;

import React, { useState, useEffect } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { useForgotPasswordMutation } from "../../Redux/Action";
import { toast } from "react-toastify";
import * as Yup from "yup";
const ForgotPassword = ({ onBackClick }) => {
  const [forgotPassword, { isLoading, isSuccess, isError, data, error }] =
    useForgotPasswordMutation();
  const [forgotPaasowrd, setForgotPassword] = useState({
    email: "",
  });

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("fill valid email")
      .required("email is required field"),
  });
  useEffect(() => {
    if (isSuccess === true && data?.statusCode === 201) {
      toast.success(data["message"], {
        autoClose: 2000,
        onClose: () => navigate("/forgotpasswordotpverification"),
      });
    }
    if (isError === true) {
      console.log("error is print");
    }
  }, [data, error]);

  const navigate = useNavigate();
  return (
    <Formik
      enableReinitialize={true}
      initialValues={forgotPaasowrd}
      validationSchema={forgotPasswordSchema}
      onSubmit={(fields) => {
        forgotPassword(fields);
      }}
      render={({ values, errors }) => {
        return (
          <Form>
            <div className="flex items-center justify-center h-screen">
              <div className="bg-white rounded-2xl shadow-xl p-8 w-[30%]">
                <button className="flex items-center text-gray-600 hover:text-gray-800 mb-6">
                  <ArrowLeft
                    className="h-5 w-5 mr-2"
                    onClick={() => navigate(-1)}
                  />
                  Back to login
                </button>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Forgot Password?
                  </h2>
                  {values.resetPasswordMethod !== "email" ? (
                    <p className="text-gray-600">
                      Enter your email to reset your password
                    </p>
                  ) : (
                    <p className="text-gray-600">
                      Enter your email address to reset your password
                    </p>
                  )}
                </div>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Field
                        type="email"
                        name="email"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="enter your mail id"
                      />
                    </div>
                    <>
                      <span className="text-red-600">
                        <ErrorMessage
                          name={
                            values.resetPasswordMethod !== "email"
                              ? "phonenumber"
                              : "email"
                          }
                        />
                      </span>
                    </>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white rounded-lg py-2.5 font-medium hover:bg-blue-700 transition-colors"
                  >
                    {isLoading ? "Loading......." : "Reset Password"}
                  </button>
                </div>
              </div>
              {console.log(values)}
              {console.log("errors", errors)}
              {console.log("----rtk query state---", {
                isLoading,
                isSuccess,
                isError,
                data,
                error,
              })}
            </div>
          </Form>
        );
      }}
    />
  );
};

export default ForgotPassword;

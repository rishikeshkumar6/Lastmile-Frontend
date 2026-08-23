import React, { useState, useEffect } from "react";
import { Mail, Lock, PhoneOutgoing } from "lucide-react";
import { Link } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { loginFormSchema } from "../../Validation/FormSchema";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../Redux/Action";

import { toast } from "react-toastify";
import { userManageState } from "../../Redux/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    loginMethod: "email",
    email: "",
    phonenumber: "",
    password: "",
  });
  const [login, { isLoading, isSuccess, isError, data, error }] =
    useLoginMutation();

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess === true) {
      dispatch(
        userManageState({
          type: "token",
          token: data.token,
        }),
      );
      navigate("/dashboard");
    } else if (isError === true) {
      console.log("errors catching", error);
      console.log(error);
      if (error.status === "FETCH_ERROR") {
        toast.error(error.error, { autoClose: "2000" });
      }
      if (
        error.data !== undefined &&
        error.data["errorMessage"] !== undefined
      ) {
        toast.error(error.data["errorMessage"], { autoClose: "2000" });
      }
    }
  }, [data, error]);

  const handleChange = (e, setFieldValue) => {
    const { value } = e.target;

    setFieldValue("loginMethod", value);
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={loginForm}
      validationSchema={loginFormSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={(fields) => {
        login(fields);
      }}
    >
      {({ values, errors, setFieldValue }) => (
        <Form>
          <div className="flex items-center justify-center h-screen">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-[25%]">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Sign In
              </h2>
              <div className="space-y-6">
                {/* Email Field */}

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700 flex flex-col gap-2">
                    login with{" "}
                    <div className="flex gap-5">
                      <div className="flex items-center gap-2">
                        <Field
                          type="radio"
                          name="loginMethod"
                          value="email"
                          id="email"
                          className="mt-1"
                          onChange={(e) => {
                            handleChange(e, setFieldValue);
                          }}
                        />
                        <label htmlFor="email"> email</label>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Field
                          type="radio"
                          name="loginMethod"
                          value="phonenumber"
                          id="phonenumber"
                          className="mt-1"
                          onChange={(e) => {
                            handleChange(e, setFieldValue);
                          }}
                        />
                        <label htmlFor="phonenumber"> phonenumber</label>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    {values.loginMethod === "email" ? (
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    ) : (
                      <PhoneOutgoing className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    )}
                    <Field
                      type={
                        values.loginMethod === "phonenumber"
                          ? "number"
                          : "email"
                      }
                      name={
                        values.loginMethod === "phonenumber"
                          ? "phonenumber"
                          : "email"
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={
                        values.loginMethod === "phonenumber"
                          ? "Enter your phonenumber"
                          : "Enter your email"
                      }
                    />
                    <span className="text-red-400 absolute w-[100%] left-0 bottom-[-25px]">
                      <ErrorMessage
                        name={
                          values.loginMethod === "phonenumber"
                            ? "phonenumber"
                            : "email"
                        }
                      />
                    </span>
                  </div>
                </div>

                {/* Phone Number Field */}
                {/* {values.loginMethod === "phonenumber" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Field
                        type="text"
                        name="phonenumber"
                        className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your phone number"
                      />
                      <span className="text-red-400 absolute w-[100%] left-0 bottom-[-25px]">
                        <ErrorMessage name="phonenumber" />
                      </span>
                    </div>
                  </div>
                )} */}
                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Field
                      type="password"
                      name="password"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your password"
                    />
                    <span
                      className={`text-red-400 absolute w-[100%] left-0 top-[40px]`}
                    >
                      <ErrorMessage name="password" />
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className={`text-sm text-blue-600 hover:text-blue-800 font-medium ${
                    errors?.password?.length > 40
                      ? "w-[100%] flex justify-end"
                      : ""
                  }`}
                >
                  <Link to={"/forgotpassword"}>Forgot password?</Link>
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-lg py-2.5 font-medium hover:bg-blue-700 transition-colors"
                >
                  {isLoading ? "Loading....." : "Sign In"}{" "}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    disabled={isLoading ? true : false}
                  >
                    <Link to={"/register"}>Sign up</Link>
                  </button>
                </p>
              </div>
            </div>
            {console.log("errors", errors?.password?.length > 40)}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

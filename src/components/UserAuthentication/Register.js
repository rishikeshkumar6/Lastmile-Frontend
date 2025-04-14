import React, { useState, useEffect } from "react";
import { Mail, Lock, User, PhoneCall, PhoneOutgoing } from "lucide-react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { registerSchema } from "../../Validation/FormSchema";
import { useRegisterMutation } from "../../Redux/Action";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userManageState } from "../../Redux/userSlice";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = useState({
    name: "",
    phonenumber: "",
    email: "",
    password: "",
    permission: false,
  });
  const [register, { isLoading, isSuccess, isError, data, error }] =
    useRegisterMutation();

  useEffect(() => {
    if (isSuccess === true) {
      dispatch(
        userManageState({
          type: "userid",
          userId: data.id,
        })
      );
      toast.success("user register successfully", {
        autoClose: "3000",
        onClose: () => navigate("/otpverifaction"),
      });
    } else if (isError === true) {
      toast.error(
        error?.data?.error?.errors[0]?.message || error.data["errorMessage"],
        {
          autoClose: "3000",
        }
      );
    }
  }, [data, error]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={registerForm}
      validationSchema={registerSchema}
      onSubmit={(fields) => {
        register(fields);
      }}
      render={({ values, errors, setFieldValue }) => {
        const handleClick = (setFieldValue, currentValues) => {
          setFieldValue("permission", !currentValues);
        };
        return (
          <Form>
            <div className="flex items-center justify-center h-screen">
              <div className="bg-white rounded-2xl shadow-xl p-8 w-[30%]">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                  Create Account
                </h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Field
                        type="text"
                        name="name"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full name"
                      />
                      <span className="absolute w-[100%] bottom-[-25px] left-0 text-red-400">
                        {" "}
                        <ErrorMessage name="name" className="absolute" />
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Phonenumber
                    </label>
                    <div className="relative">
                      <PhoneOutgoing className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Field
                        type="number"
                        name="phonenumber"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your phonenumber"
                      />
                      <span className="absolute w-[100%] bottom-[-25px] left-0 text-red-400">
                        {" "}
                        <ErrorMessage name="phonenumber" className="absolute" />
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Field
                        type="email"
                        name="email"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email"
                      />
                      <span className="absolute w-[100%] bottom-[-25px] left-0 text-red-400">
                        {" "}
                        <ErrorMessage name="email" className="absolute" />
                      </span>
                    </div>
                  </div>
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
                        placeholder="Create a password"
                      />
                      <span className="absolute w-[100%] bottom-[-25px] left-0 text-red-400">
                        {" "}
                        <ErrorMessage name="password" className="absolute" />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center  gap-3">
                    <Field
                      id="permission"
                      type="checkbox"
                      className="text-[15px] mt-1"
                      name="permission"
                    />
                    <label htmlFor="permission">
                      i accept all the
                      <span className="text-blue-600 hover:text-blue-800 font-medium">
                        {" "}
                        terms{" "}
                      </span>
                      and{" "}
                      <span className="text-blue-600 hover:text-blue-800 font-medium">
                        condition
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white rounded-lg py-2.5 font-medium hover:bg-blue-700 transition-colors"
                  >
                    {isLoading ? "Loading......" : "Sign Up"}
                  </button>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      <Link to="/login"> Sign in</Link>
                    </button>
                  </p>
                </div>
              </div>
              {console.log(errors)}
              {console.log(values.permission)}
              {console.log({ isLoading, isSuccess, isError, data })}
              {console.log("hey i am error field", error)}
            </div>
          </Form>
        );
      }}
    />
  );
};

export default SignupForm;

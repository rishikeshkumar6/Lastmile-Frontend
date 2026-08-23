import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "../Redux/Action";
import { isLoggedin, userManageState } from "../Redux/userSlice";
import LoadingScreen from "../components/Loader.jsx";

const ProtectedRoutes = () => {
  const { isLoading, isSuccess, isError, data, error } = useGetUserQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess === true) {
      dispatch(userManageState(data));
      dispatch(isLoggedin(true));
    }
    if (isError === true) {
      dispatch(isLoggedin(false));
    }
  }, [data, error]);
  console.log("protected routing", isLoading, isError, isSuccess);
  // Show a loading state
  if (isLoading) return <LoadingScreen />;
  if (isError) return <Navigate to="/login" />; // Redirect to login if token is invalid

  return <Outlet />;

  // Allow access to protected routes if authenticated
};

export default ProtectedRoutes;

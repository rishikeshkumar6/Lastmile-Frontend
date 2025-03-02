import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "../Redux/Action";
import { isLoggedin } from "../Redux/userSlice";

const ProtectedRoutes = () => {
  const { isLoading, isSuccess, isError, data, error } = useGetUserQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess === true) {
      dispatch(isLoggedin(true));
    }
    if (isError === true) {
      dispatch(isLoggedin(false));
    }
  }, [data, error]);
  console.log("protected routing", isLoading, isError, isSuccess);
  if (isLoading) return <p>Loading...</p>; // Show a loading state

  if (isError) return <Navigate to="/login" />; // Redirect to login if token is invalid

  return <Outlet />;

  // Allow access to protected routes if authenticated
};

export default ProtectedRoutes;

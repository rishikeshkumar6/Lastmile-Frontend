import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useGetUserQuery } from "../Redux/Action";

const ProtectedRoutes = () => {
  const { isLoading, isSuccess, isError } = useGetUserQuery();

  if (isLoading) return <p>Loading...</p>; // Show a loading state

  if (isError) return <Navigate to="/login" />; // Redirect to login if token is invalid

  return <Outlet />; // Allow access to protected routes if authenticated
};

export default ProtectedRoutes;

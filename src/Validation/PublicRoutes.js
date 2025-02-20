import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useGetUserQuery } from "../Redux/Action";
import { useSelector } from "react-redux";

const PublicRoutes = () => {
  // const data = useSelector((state) => state.userSlice.token);
  const { isLoading, isSuccess, isError } = useGetUserQuery();
  const location = useLocation();
  console.log("url location", location.pathname);
  if (isLoading) return <p>Loading...</p>; // Show a loading message

  if (isSuccess) return <Navigate to="/dashboard" />; // Redirect to dashboard if authenticated

  return location.pathname === "/" ? (
    <Navigate to={"/login"} replace />
  ) : (
    <Outlet />
  ); // Allow access to public routes if not authenticated
};

export default PublicRoutes;

import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useGetUserQuery } from "../Redux/Action";
import { useDispatch } from "react-redux";
import { isLoggedin } from "../Redux/userSlice";
import { useEffect } from "react";
import LoadingScreen from "../components/Loader.jsx";

const PublicRoutes = () => {
  // const data = useSelector((state) => state.userSlice.token);
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
  console.log("public routes", isLoading, isSuccess, isError);
  const location = useLocation();
  console.log("url location", location.pathname);
  if (isLoading) return <LoadingScreen />;
  if (isSuccess) return <Navigate to="/dashboard" />;
  // Redirect to dashboard if authenticated

  return <Outlet />; // Allow access to public routes if not authenticated
};

export default PublicRoutes;

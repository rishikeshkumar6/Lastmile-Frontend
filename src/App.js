import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Home from "./pages/Home.js";
import PublicRoutes from "./Validation/PublicRoutes.js";
import ProtectedRoutes from "./Validation/ProtectedRouting.js";
import Order from "./pages/OrderDashboard.js";
import OrderCreation from "./pages/OrderCreation.js";
import OrderDetail from "./pages/orderDetails.js";
import OrderTraking from "./pages/OrderTraking.js";
import Drawers from "./pages/Testing.js";
import ResponsibleTable from "./components/testing.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrackingInformation from "./pages/Testing.js";
import Subscriptions from "./pages/Subscriptions.js";
import LoginForm from "./components/UserAuthentication/Login.js";
import SignupForm from "./components/UserAuthentication/Register.js";
import ForgotPassword from "./components/UserAuthentication/ForgotPassword.js";
import OTPVerification from "./components/UserAuthentication/OtpVerification.js";

function App() {
  const data = useSelector((state) => state.userSlice.token);
  return (
    <BrowserRouter>
      {data ? <Header /> : null}
      <ToastContainer />
      <Routes>
        <Route path="*" element={<h1>this page is not exist</h1>} />

        <Route element={<PublicRoutes />}>
          <Route path="/" element={<h1>this is a landing page</h1>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/otpverifaction" element={<OTPVerification />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/ordercreate" element={<OrderCreation />} />
          <Route path="/orderdetails" element={<OrderDetail />} />
          <Route path="/ordertracking" element={<OrderTraking />} />
          <Route path="/drawer" element={<Drawers />} />
          <Route path="/subscription" element={<Subscriptions />} />
          <Route path="/testing" element={<TrackingInformation />} />
          <Route path="*" element={<h1>this page does'nt exist</h1>} />
          <Route
            path="/order/ordercreate/:orderid/:slug"
            element={<OrderCreation />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

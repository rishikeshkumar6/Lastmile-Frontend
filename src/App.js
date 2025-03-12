import "./App.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import PublicRoutes from "./Validation/PublicRoutes.js";
import ProtectedRoutes from "./Validation/ProtectedRouting.js";
import Order from "./pages/OrderDashboard.js";
import OrderCreation from "./pages/OrderCreation.js";
import OrderDetail from "./pages/orderDetails.js";
import OrderTraking from "./pages/OrderTraking.js";
import Drawers from "./pages/Testing.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrackingInformation from "./pages/Testing.js";
import Subscriptions from "./pages/Subscriptions.js";
import LoginForm from "./components/UserAuthentication/Login.js";
import SignupForm from "./components/UserAuthentication/Register.js";
import ForgotPassword from "./components/UserAuthentication/ForgotPassword.js";
import OTPVerification from "./components/UserAuthentication/OtpVerification.js";
import WalletHistory from "./components/Payment/WalletHistory.js";
import Dashboard from "./pages/Dashboard.js";
import Label from "./pages/Label.js";
import Barcode from "./pages/BarcodeScanner.js";
import { LoadingScreen } from "./components/LoadingUi.js";
import Loader from "./components/Loader.jsx";

const Home = lazy(() => import("./pages/Home.js"));
function App() {
  const data = useSelector((state) => state["rootReducer"]["userSlice"]);
  return (
    <BrowserRouter>
      {data.isLoggedin && <Header />}
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="*" element={<h1>this page is not exist</h1>} />

          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<SignupForm />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/otpverifaction" element={<OTPVerification />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wallethistory" element={<WalletHistory />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/ordercreate" element={<OrderCreation />} />
            <Route path="/orderdetails" element={<OrderDetail />} />
            <Route path="/ordertracking" element={<OrderTraking />} />
            <Route path="/drawer" element={<Drawers />} />
            <Route path="/subscription" element={<Subscriptions />} />
            <Route path="/testing" element={<TrackingInformation />} />
            <Route path="/label" element={<Label />} />
            <Route path="/barcode-scanner" element={<Barcode />} />
            <Route path="*" element={<h1>this page does'nt exist</h1>} />
            <Route
              path="/order/ordercreate/:orderid/:slug"
              element={<OrderCreation />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

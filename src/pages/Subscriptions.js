// import React, { useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import { useLazySubscriptionsCreationQuery } from "../Redux/Action";
// const Subscriptions = () => {
//   console.log(process.env.REACT_APP_RAZORPAY_KEY_ID);
//   const [
//     subscriptionsCreation,
//     { isLoading, isSuccess, isError, data, error },
//   ] = useLazySubscriptionsCreationQuery();

//   useEffect(() => {
//     if (isSuccess && data && data.response?.id) {
//       console.log("Subscription Data:", data.response);

//       var options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         subscription_id: data.response.id,
//         handler: function (response) {
//           console.log("Razorpay Response:", response);
//         },
//       };
//       console.log("options checking----", options);
//       var paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//       paymentObject.on("payment.failed", function (response) {
//         console.error("Payment Failed:", response.error);
//       });
//     } else {
//       console.error("Error in useEffect: Data or isSuccess invalid.");
//     }
//   }, [data, isSuccess]);

//   const handleClick = (e) => {
//     e.preventDefault();
//     subscriptionsCreation();
//   };
//   return (
//     <section className="flex gap-6">
//       <Sidebar />
//       <div className="w-[90%] m-[auto]">
//         <button onClick={handleClick}>Buy Subscription</button>
//       </div>
//       {console.log("just check this part", {
//         isLoading,
//         isSuccess,
//         isError,
//         data,
//         error,
//       })}
//     </section>
//   );
// };

// export default Subscriptions;

import React from "react";
import {
  Check,
  Truck,
  History,
  Bell,
  Shield,
  BarChart as ChartBar,
  Clock,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="bg-indigo-100 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function PricingCard() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-50 max-w-md w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Premium Plan</h2>
        <div className="mt-4">
          <span className="text-5xl font-bold">$29</span>
          <span className="text-gray-600">/month</span>
        </div>
      </div>

      <div className="space-y-4">
        {[
          "Enhanced order tracking and transparency",
          "Detailed delivery insights and analytics",
          "Priority customer support",
          "Advanced customization options",
          "Real-time shipping updates",
          "Comprehensive order history",
        ].map((feature, index) => (
          <div key={index} className="flex items-center">
            <Check className="w-5 h-5 text-indigo-600 mr-3" />
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>

      <button className="mt-8 w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
        Upgrade Now
      </button>
    </div>
  );
}

function App() {
  return (
    <section className="flex gap-6 bg-slate-50 ">
      <Sidebar />
      <div className="min-h-screen bg-gray-50 m-[auto] mt-10">
        {/* Hero Section */}
        <div className="bg-indigo-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Elevate Your Shipping Experience
            </h1>
            <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
              Get premium features that enhance transparency, provide detailed
              insights, and deliver exceptional customer experience.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              icon={Truck}
              title="Enhanced Transparency"
              description="Detailed courier, tracking, and payment information with no hidden surprises."
            />
            <FeatureCard
              icon={History}
              title="Order History Insights"
              description="Chronological view of order progress including placement, shipping, and delivery status."
            />
            <FeatureCard
              icon={Bell}
              title="Proactive Updates"
              description="Real-time notifications about current location, delays, and estimated delivery dates."
            />
            <FeatureCard
              icon={Shield}
              title="Exception Handling"
              description="Structured handling of RTO and NDR scenarios with clear resolution steps."
            />
            <FeatureCard
              icon={ChartBar}
              title="Analytics Dashboard"
              description="Comprehensive analytics on delivery success rates and customer feedback."
            />
            <FeatureCard
              icon={Clock}
              title="Delivery Confirmation"
              description="Capture recipient details, signatures, and feedback for quality assurance."
            />
          </div>

          {/* Pricing Section */}
          <div className="flex justify-center">
            <PricingCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;

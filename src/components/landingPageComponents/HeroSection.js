import React from "react";
import { useNavigate } from "react-router-dom";
import { Truck, Package, BarChart3, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 ">
      <div className="w-full max-w-7xl mx-auto px-4 py-4 flex justify-between items-center flex flex-col">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Unlock Complete Order Visibility and Streamlined Logistics
            </h1>
            <p className="text-xl mb-8 text-indigo-100">
              Take control of your e-commerce operations with our powerful
              platform designed for sellers on Flipkart, Amazon, and other major
              marketplaces.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center"
                onClick={() => navigate("/login")}
              >
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
                onClick={() => navigate("/login")}
              >
                Watch Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className=" p-6 ">
              <img src="/5602455.webp" className="rounded-md w-full h-auto" />
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <div className="bg-indigo-500 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Complete Tracking</h3>
            <p className="text-indigo-100">
              Track every order with courier names, AWB numbers, and real-time
              status updates.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <div className="bg-indigo-500 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Inventory Management</h3>
            <p className="text-indigo-100">
              Stay on top of stock levels, batch numbers, and product lifecycle
              information.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <div className="bg-indigo-500 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-indigo-100">
              Gain insights into delivery performance, customer satisfaction,
              and operational efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

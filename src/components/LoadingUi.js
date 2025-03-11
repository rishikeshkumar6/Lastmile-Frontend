import React, { useState, useEffect } from "react";
import { Truck, BarChart2 } from "lucide-react";
import { logisticsFacts } from "./LoadingPageData";
export function LoadingScreen() {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [fadeState, setFadeState] = useState("in");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setCurrentFactIndex((prev) => (prev + 1) % logisticsFacts.length);
        setFadeState("in");
      }, 500); // Half of the transition time
    }, 3000); // Change fact every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const currentFact = logisticsFacts[currentFactIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-8 space-x-3">
          <Truck className="w-12 h-12 text-blue-400 animate-bounce" />
          <BarChart2 className="w-12 h-12 text-blue-400 animate-pulse" />
          <h1 className="text-3xl font-bold text-white">Logistics Solutions</h1>
        </div>

        {/* Loading Bar */}
        <div className="w-full bg-blue-800 rounded-full h-2 mb-8">
          <div className="bg-blue-400 h-2 rounded-full animate-[loading_3s_ease-in-out_infinite]"></div>
        </div>

        {/* Fact Card */}
        <div
          className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 transition-opacity duration-1000 ${
            fadeState === "in" ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-xl font-semibold text-blue-300 mb-3">
            {currentFact.title}
          </h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            {currentFact.description}
          </p>
          <div className="border-t border-blue-800 pt-4">
            <p className="text-blue-300 font-medium">
              <span className="text-blue-400 font-bold">Bigger Impact: </span>
              {currentFact.impact}
            </p>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center mt-8">
          <p className="text-blue-300 animate-pulse">
            Loading amazing logistics solutions...
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Clock, Mail, Sparkles, Zap, Shield, Rocket } from "lucide-react";
import Sidebar from "./Sidebar";

function ComingSoonui() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubscribed(true);
    setIsLoading(false);
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Built with performance in mind, delivering instant results",
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Secure by Design",
      description: "Enterprise-grade security protecting your data",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      title: "AI Powered",
      description: "Advanced algorithms that learn and adapt to your needs",
    },
  ];

  const milestones = [
    { title: "Design Phase", status: "completed", date: "Jan 2024" },
    { title: "Development", status: "completed", date: "Feb 2024" },
    { title: "Testing & QA", status: "current", date: "Mar 2024" },
    { title: "Launch", status: "upcoming", date: "Apr 2024" },
  ];

  return (
    <section className="flex gap-6">
      <Sidebar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 w-[90%] m-[auto] z-[1]">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <header className="pt-8 pb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold text-xl">
                    Chat Module
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="pt-20 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
                  <Clock className="w-4 h-4 mr-2" />
                  Coming Soon
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                  The Future is
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Almost Here
                  </span>
                </h1>

                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  We're crafting something extraordinary that will revolutionize
                  how you work. Get ready for an experience that combines
                  cutting-edge technology with intuitive design.
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-12">
                {Object.entries(countdown).map(([unit, value]) => (
                  <div
                    key={unit}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {value.toString().padStart(2, "0")}
                    </div>
                    <div className="text-sm text-gray-400 capitalize">
                      {unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default ComingSoonui;

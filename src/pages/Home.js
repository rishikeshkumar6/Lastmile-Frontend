import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Truck,
  Package,
  BarChart3,
  ClipboardList,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import HeroSection from "../components/landingPageComponents/HeroSection";
import FeatureSection from "../components/landingPageComponents/FeatureSection";
import TestimonialSection from "../components/landingPageComponents/TestomonialSection";
import PricingSection from "../components/landingPageComponents/PricingSection";
import Footer from "../components/landingPageComponents/Footer";

function App() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">LogiTrack</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#benefits"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Benefits
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Pricing
            </a>
          </nav>
          <div>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main>
        <HeroSection />
        <FeatureSection />
        <TestimonialSection />
        <PricingSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;

import React from "react";
import {
  ClipboardList,
  Clock,
  BarChart3,
  Package,
  Truck,
  ShieldCheck,
  MapPin,
  CreditCard,
  RefreshCw,
  Tag,
  Box,
  Calendar,
} from "lucide-react";

const features = [
  {
    title: "Comprehensive Order Information",
    icon: <ClipboardList className="h-8 w-8 text-indigo-600" />,
    description:
      "Access courier names, tracking numbers, shipping charges, discounts, taxes, total amounts, and payment status for every order.",
    items: [
      "Courier Name & Tracking Number",
      "Shipping Charges & Discounts",
      "Tax & Total Amount Paid",
      "Payment Status Tracking",
    ],
  },
  {
    title: "Enhanced Order History",
    icon: <Clock className="h-8 w-8 text-indigo-600" />,
    description:
      "Get detailed timelines from order placement to delivery, with in-transit updates and delivery confirmations.",
    items: [
      "Complete Order Timeline",
      "In-Transit Status Updates",
      "Delivery Confirmation Details",
      "Customer Feedback Tracking",
    ],
  },
  {
    title: "Advanced Operational Insights",
    icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
    description:
      "Track AWB numbers, SKUs, exact delivery locations, insurance details, and special handling instructions.",
    items: [
      "AWB Number Management",
      "SKU Identification System",
      "GPS Delivery Coordinates",
      "Insurance & Special Handling",
    ],
  },
  {
    title: "Delivery & Fulfillment Information",
    icon: <Truck className="h-8 w-8 text-indigo-600" />,
    description:
      "Manage fulfillment centers, packaging types, and expected fulfillment dates for better planning.",
    items: [
      "Fulfillment Center Tracking",
      "Packaging Type Identification",
      "Expected Fulfillment Dates",
      "Service Type Classification",
    ],
  },
  {
    title: "Product & Inventory Management",
    icon: <Package className="h-8 w-8 text-indigo-600" />,
    description:
      "Monitor stock availability, warranty information, batch numbers, and expiration dates.",
    items: [
      "Real-time Stock Availability",
      "Warranty Information Tracking",
      "Batch Numbers & Expiry Dates",
      "Product Lifecycle Management",
    ],
  },
  {
    title: "Returns & Refunds",
    icon: <RefreshCw className="h-8 w-8 text-indigo-600" />,
    description:
      "Streamline return policies, refund statuses, and return label generation for hassle-free returns.",
    items: [
      "Return Policy Management",
      "Refund Status Tracking",
      "Return Label Generation",
      "NDR Management System",
    ],
  },
];

const FeatureSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for E-commerce Sellers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform provides comprehensive tools to help you manage your
            logistics operations efficiently and deliver exceptional customer
            experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div id="benefits" className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benefits for Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empower your logistics team to minimize errors, resolve delivery
              issues quickly, and maintain excellent customer experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-indigo-600 text-white p-8 rounded-lg">
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-semibold mb-6">
                  For Operations Teams
                </h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <ShieldCheck className="h-6 w-6 mr-3 flex-shrink-0" />
                    <span>
                      Reduce delivery errors by up to 45% with complete order
                      visibility
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-6 w-6 mr-3 flex-shrink-0" />
                    <span>
                      Save 15+ hours per week on manual tracking and customer
                      service
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-6 w-6 mr-3 flex-shrink-0" />
                    <span>
                      Improve delivery accuracy with precise location tracking
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Box className="h-6 w-6 mr-3 flex-shrink-0" />
                    <span>
                      Optimize inventory management with real-time stock
                      insights
                    </span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <button className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-md">
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  For Business Growth
                </h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CreditCard className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Increase customer satisfaction by 38% with transparent
                      delivery updates
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Tag className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Reduce return rates by 25% with better order management
                    </span>
                  </li>
                  <li className="flex items-start">
                    <BarChart3 className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Gain actionable insights to optimize your logistics
                      operations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Calendar className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Plan more effectively with predictive delivery estimates
                    </span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors">
                    See Case Studies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

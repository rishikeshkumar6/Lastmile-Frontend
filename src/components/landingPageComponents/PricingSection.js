import React from "react";
import { CheckCircle2, X } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "₹100",
    period: "per month",
    description: "Essential features for small sellers",
    features: [
      "Basic order tracking",
      "Courier name & tracking number",
      "Payment status tracking",
      "Basic order timeline",
      "Email support",
      "Up to 100 orders/month",
    ],
    notIncluded: [
      "Advanced operational insights",
      "Return & NDR management",
      "Inventory management",
      "Priority support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Medium",
    price: "₹500",
    period: "per month",
    description: "Advanced features for growing businesses",
    features: [
      "Everything in Basic, plus:",
      "Enhanced order history",
      "In-transit updates",
      "Delivery confirmation",
      "Return & refund management",
      "Basic inventory tracking",
      "Priority email support",
      "Up to 500 orders/month",
    ],
    notIncluded: [
      "Advanced analytics",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Pro",
    price: "₹1,000",
    period: "per month",
    description: "Complete solution for established sellers",
    features: [
      "Everything in Medium, plus:",
      "Advanced operational insights",
      "GPS delivery coordinates",
      "Insurance & special handling",
      "Product lifecycle management",
      "Advanced analytics dashboard",
      "API access for integration",
      "Dedicated account manager",
      "24/7 priority support",
      "Unlimited orders",
    ],
    notIncluded: [],
    cta: "Get Started",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="py-20 bg-gray-50"
      style={{ display: "none" }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your business needs and scale as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
                plan.popular ? "border-2 border-indigo-600 relative" : ""
              }`}
            >
              {plan.popular && (
                <div className="bg-indigo-600 text-white text-center py-1 px-4 absolute top-0 right-0 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <button
                  className={`w-full py-3 rounded-md font-medium transition-colors ${
                    plan.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
              <div className="border-t border-gray-100 p-8">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Features included:
                </h4>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.notIncluded.length > 0 && (
                  <>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Not included:
                    </h4>
                    <ul className="space-y-3">
                      {plan.notIncluded.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need a custom solution?
          </h3>
          <p className="text-gray-600 mb-6">
            We offer tailored enterprise plans for high-volume sellers with
            specific requirements. Contact our sales team to discuss your needs.
          </p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

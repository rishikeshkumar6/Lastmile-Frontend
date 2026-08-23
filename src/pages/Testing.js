import React from "react";
import {
  Package,
  CheckCircle2,
  Box,
  PackageCheck,
  Truck,
  ArrowRight,
  MapPin,
  Home,
  Clock,
  Building2,
  PackageOpen,
  ScanBarcode,
  ClipboardCheck,
} from "lucide-react";

const steps = [
  {
    title: "Order Placed",
    description:
      "The customer successfully places the order, and it is confirmed in the system.",
    icon: Package,
    status: "completed",
    timestamp: "2024-03-12 09:30 AM",
    location: "Online Store",
    operations: ["Order verification", "Payment processing"],
  },
  {
    title: "Order Confirmed",
    description:
      "The seller or system confirms the order, verifying payment or stock availability.",
    icon: CheckCircle2,
    status: "completed",
    timestamp: "2024-03-12 10:15 AM",
    location: "Central Processing Center",
    operations: ["Inventory check", "Order assignment"],
  },
  {
    title: "Order Packed",
    description: "The order is packed and ready for shipment.",
    icon: Box,
    status: "completed",
    timestamp: "2024-03-12 02:45 PM",
    location: "Main Warehouse - Seattle",
    operations: ["Item picking", "Quality check", "Package assembly"],
  },
  {
    title: "Shipment Created",
    description:
      "A shipping label and tracking number are generated, and the package is assigned to a courier.",
    icon: PackageCheck,
    status: "completed",
    timestamp: "2024-03-12 04:30 PM",
    location: "Main Warehouse - Seattle",
    operations: [
      "Label generation",
      "Shipping documentation",
      "Courier assignment",
    ],
  },
  {
    title: "Picked Up by Courier",
    description:
      "The courier collects the package from the seller or warehouse.",
    icon: Truck,
    status: "current",
    timestamp: "2024-03-13 08:15 AM",
    location: "Distribution Center - Portland",
    operations: ["Package scanning", "Route planning", "Vehicle loading"],
  },
  {
    title: "In Transit",
    description:
      "The package is en route to the destination, moving through various logistics hubs.",
    icon: ArrowRight,
    status: "upcoming",
    timestamp: "Pending",
    location: "En Route",
    operations: [],
  },
  {
    title: "Out for Delivery",
    description:
      "The package reaches the local delivery center and is out for final delivery to the customer.",
    icon: MapPin,
    status: "upcoming",
    timestamp: "Pending",
    location: "Pending",
    operations: [],
  },
  {
    title: "Delivered",
    description: "The package is successfully delivered to the customer.",
    icon: Home,
    status: "upcoming",
    timestamp: "Pending",
    location: "Pending",
    operations: [],
  },
];

function OperationItem({ operation }) {
  const getIcon = (operation) => {
    if (operation.includes("scanning")) return ScanBarcode;
    if (operation.includes("check")) return ClipboardCheck;
    if (operation.includes("picking")) return PackageOpen;
    return CheckCircle2;
  };

  const Icon = getIcon(operation.toLowerCase());

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <Icon className="h-4 w-4" />
      <span>{operation}</span>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex">
          {/* Left Sidebar - Detailed Information */}
          <div className="w-80 border-r border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Details
                </h2>
                <span className="text-sm font-medium text-gray-500">
                  #2024-0392
                </span>
              </div>

              {steps
                .filter((step) => step.status !== "upcoming")
                .map((step, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <div
                      className={`p-4 rounded-lg border ${
                        step.status === "current"
                          ? "border-gray-200 bg-white shadow-sm"
                          : "border-gray-100 bg-white"
                      }`}
                    >
                      <div className="flex items-center mb-3">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            step.status === "current"
                              ? "bg-indigo-50 text-indigo-600"
                              : "bg-gray-50 text-gray-500"
                          }`}
                        >
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div className="ml-3">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-600">
                              {step.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mb-3 ml-1">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-800">
                          {step.location}
                        </span>
                      </div>

                      {step.operations.length > 0 && (
                        <div className="space-y-2 ml-1">
                          <p className="text-xs font-medium text-gray-400 uppercase">
                            Operations
                          </p>
                          {step.operations.map((operation, opIndex) => (
                            <OperationItem
                              key={opIndex}
                              operation={operation}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-xl font-semibold text-gray-900">
                Order Tracking
              </h1>
              <p className="text-sm text-gray-500">
                Estimated Delivery: March 15, 2024
              </p>
            </div>

            {/* Tracking Timeline */}
            <div className="p-6">
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`relative ${
                      index !== steps.length - 1 ? "pb-6" : ""
                    }`}
                  >
                    {index !== steps.length - 1 && (
                      <div
                        className="absolute left-5 top-12 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex items-start space-x-4">
                      <div
                        className={`relative ${
                          step.status === "completed"
                            ? "bg-indigo-600"
                            : step.status === "current"
                            ? "bg-white border-2 border-indigo-600"
                            : "bg-white border-2 border-gray-300"
                        } h-10 w-10 rounded-full flex items-center justify-center`}
                      >
                        <step.icon
                          className={`h-5 w-5 ${
                            step.status === "completed"
                              ? "text-white"
                              : step.status === "current"
                              ? "text-indigo-600"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5">
                        <div>
                          <h3
                            className={`text-lg font-medium ${
                              step.status === "upcoming"
                                ? "text-gray-500"
                                : "text-gray-900"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`mt-1 text-sm ${
                              step.status === "upcoming"
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                        {step.status === "current" && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              Current Status
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

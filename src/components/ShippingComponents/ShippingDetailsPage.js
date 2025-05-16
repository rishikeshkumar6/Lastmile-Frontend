import React from "react";
import {
  Package,
  Truck,
  MapPin,
  Calendar,
  FileText,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import ShippingTimeline from "./ShippingTimeLine";
import ShippingHeader from "./ShippingHeaders";
import { mockShippingData } from "./mockData";
import OrderSummary from "./OrderSummary";
import Sidebar from "../Sidebar";

const ShippingDetailsPage = () => {
  const {
    orderNumber,
    trackingNumber,
    courierName,
    courierLogo,
    estimatedDelivery,
    shipmentStatus,
    shippingAddress,
    billingAddress,
    customer,
  } = mockShippingData;

  return (
    <section className="flex gap-6">
      <Sidebar />
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ShippingHeader />

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
          <div className="px-6 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mr-4">
                    <Package size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Shipment Status
                    </h2>
                    <p className="text-gray-600">
                      Current status of your package
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-5 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      TRACKING NUMBER
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {shipmentStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      {trackingNumber}
                    </span>
                    <button className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-800 transition-colors">
                      Track on {courierName}{" "}
                      <ArrowUpRight size={14} className="ml-1" />
                    </button>
                  </div>
                </div>

                <div className="mb-8">
                  <ShippingTimeline />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    <FileText size={18} />
                    Download Invoice
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 py-3 px-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Phone size={18} />
                    Contact Support
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mr-4">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Delivery Information
                    </h2>
                    <p className="text-gray-600">Details about your delivery</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-100">
                  <div className="flex items-center">
                    <img
                      src={courierLogo}
                      alt={courierName}
                      className="h-10 mr-4"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {courierName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Your preferred shipping partner
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-100">
                  <div className="flex">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-100 text-green-600 mr-4">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Estimated Delivery
                      </h3>
                      <p className="text-green-600 font-semibold">
                        {estimatedDelivery}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-100">
                  <div className="flex">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600 mr-4">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Shipping Address
                      </h3>
                      <p className="text-gray-700 mt-1">{customer.name}</p>
                      <p className="text-gray-700">{shippingAddress.street}</p>
                      <p className="text-gray-700">
                        {shippingAddress.city}, {shippingAddress.state}{" "}
                        {shippingAddress.zipCode}
                      </p>
                      <p className="text-gray-700">{shippingAddress.country}</p>
                      <p className="text-gray-700 mt-1">{customer.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <OrderSummary />
      </div>
    </section>
  );
};

export default ShippingDetailsPage;

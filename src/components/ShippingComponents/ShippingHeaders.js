import React from "react";
import { format } from "date-fns";
import {
  CheckCircle,
  Package,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  FileText,
  ExternalLink,
  Printer,
} from "lucide-react";
import { mockShippingData } from "./mockData";

const ShippingHeader = () => {
  const {
    orderNumber,
    trackingNumber,
    courierName,
    orderDate,
    estimatedDelivery,
    shippingAddress,
    orderItems,
    customer,
  } = mockShippingData;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-8">
      <div className="bg-green-50 px-6 py-4 border-b border-green-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-600 h-6 w-6" />
            <h1 className="text-xl font-semibold text-green-700">
              Order Shipped Successfully!
            </h1>
          </div>
          <img
            src="https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Company Logo"
            className="h-8"
          />
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500">ORDER ID</h2>
              <p className="text-lg font-semibold text-gray-900">
                {orderNumber}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">SHIPPED ON</h2>
              <p className="text-gray-900">
                {format(new Date(orderDate), "dd/MM/yyyy")}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500">
                TRACKING NUMBER
              </h2>
              <div className="flex items-center space-x-2">
                <p className="text-lg font-semibold text-gray-900">
                  {trackingNumber}
                </p>
                <button className="text-blue-600 hover:text-blue-800">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">CARRIER</h2>
              <p className="text-gray-900">{courierName}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500">
                ESTIMATED DELIVERY
              </h2>
              <p className="text-gray-900">{estimatedDelivery}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">
                SHIPPING ADDRESS
              </h2>
              <p className="text-gray-900">{shippingAddress.street}</p>
              <p className="text-gray-900">
                {shippingAddress.city}, {shippingAddress.state}{" "}
                {shippingAddress.zipCode}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Products Shipped
          </h2>
          <div className="space-y-4">
            {orderItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Need Help?
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <a
                    href="mailto:support@yourcompany.com"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    support@yourcompany.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <a
                    href="tel:+91XXXXXXXX"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {customer.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                <Printer className="h-5 w-5" />
                <span>Print Invoice</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Package className="h-5 w-5" />
                <span>Track Order</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Return Policy
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Exchange Policy
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4 md:mt-0">
              © 2025 Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingHeader;

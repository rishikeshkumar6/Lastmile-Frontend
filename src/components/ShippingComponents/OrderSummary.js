import React, { useState } from "react";
import { Package, ChevronDown, ChevronUp } from "lucide-react";
import { mockShippingData } from "./mockData";

const OrderSummary = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { orderItems, orderTotal, orderSubtotal, shippingCost, tax } =
    mockShippingData;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div
        className="px-6 py-5 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600 mr-4">
            <Package size={20} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 animate-fadeIn">
          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-4 mb-6">
              {orderItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-16 w-16 rounded-md bg-gray-100 overflow-hidden mr-4 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.variant && `${item.variant} • `}Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${item.price.toFixed(2)}
                    </p>
                    {item.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">
                        ${item.originalPrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">
                  ${orderSubtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  ${shippingCost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-gray-200 mt-2">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;

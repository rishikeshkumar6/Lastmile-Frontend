// src/OrderTracking.js
import React from "react";

const OrderTracking = () => {
  const orderDetails = {
    customerName: "Prashant Patil",
    customerContact: "+91 99987-87122",
    deliveryAddress:
      "306 North Plaza, South Motera, Nr 4D Square Mall, Sabarmati, Ahmedabad - 380005",
    sellerName: "Bewakoof India Brands Private Limited",
    sellerSupport: {
      number: "+91 99****112",
      email: "support@bewakoof.com",
    },
    trackingNo: "#34198713810",
    status: "Delivered",
    deliveryDate: "27 Aug 2021",
    lastUpdated: "29 Aug 2021",
    trackingHistory: [
      {
        date: "27th Aug 2021",
        time: "02:30 PM",
        status: "Delivered",
        location: "Ahmedabad, GJ",
      },
      {
        date: "27th Aug 2021",
        time: "11:30 AM",
        status: "Out For Delivery",
        location: "Ahmedabad, GJ",
      },
      {
        date: "25th Aug 2021",
        time: "05:30 PM",
        status: "In Transit",
        location: "From Mumbai, ML to Ahmedabad",
      },
      {
        date: "24th Aug 2021",
        time: "07:26 AM",
        status: "Order Picked Up",
        location: "From Mumbai, MH",
      },
      {
        date: "23rd Aug 2021",
        time: "12:46 PM",
        status: "Order Received",
        location: "Mumbai, MH",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold text-center">Shoppers Stop</h1>
      <h2 className="text-lg text-center text-gray-600">
        Tracking No: {orderDetails.trackingNo}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="border-r pr-4">
          <h3 className="font-semibold">Customer Name:</h3>
          <p>{orderDetails.customerName}</p>
          <h3 className="font-semibold mt-2">Contact:</h3>
          <p>{orderDetails.customerContact}</p>
          <h3 className="font-semibold mt-2">Delivery Address:</h3>
          <p>{orderDetails.deliveryAddress}</p>
          <h3 className="font-semibold mt-2">Seller Name:</h3>
          <p>{orderDetails.sellerName}</p>
          <h3 className="font-semibold mt-2">Seller Support:</h3>
          <p>{orderDetails.sellerSupport.number}</p>
          <p>{orderDetails.sellerSupport.email}</p>
        </div>

        <div className="pl-4">
          <h3 className="text-xl font-semibold">
            Your order is{" "}
            <span className="text-green-600">{orderDetails.status}</span>
          </h3>
          <p>
            as on {orderDetails.deliveryDate}, last updated on{" "}
            {orderDetails.lastUpdated}
          </p>

          <h4 className="font-semibold mt-4">Tracking History</h4>
          <ul className="mt-2">
            {orderDetails.trackingHistory.map((event, index) => (
              <li key={index} className="flex justify-between border-b py-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                  <span>
                    {event.date} at {event.time}
                  </span>
                </div>
                <span className="text-gray-700">
                  {event.status} at {event.location}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Return Order
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Exchange Item
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;

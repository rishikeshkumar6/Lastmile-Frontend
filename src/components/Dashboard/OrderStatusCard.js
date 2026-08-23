import React from "react";

const OrderStatusCard = ({ title, count, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 flex items-center">
      <div className={`p-3 rounded-full ${color} text-white mr-4`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold">{count}</p>
      </div>
    </div>
  );
};

export default OrderStatusCard;

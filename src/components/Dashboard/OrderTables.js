import React, { useState } from "react";
import { ChevronDown, ChevronUp, Filter, Download } from "lucide-react";
import { format } from "date-fns";

const OrdersTable = ({ orders, isSubscribed = false }) => {
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortField === "date") {
      return sortDirection === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }

    if (sortField === "amount") {
      return sortDirection === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
    }

    const aValue = a[sortField].toString();
    const bValue = b[sortField].toString();

    return sortDirection === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      Delivered: "bg-green-100 text-green-800",
      "In Transit": "bg-blue-100 text-blue-800",
      Booked: "bg-purple-100 text-purple-800",
      "Out For Delivery": "bg-yellow-100 text-yellow-800",
      "Return To Origin": "bg-red-100 text-red-800",
      Cancelled: "bg-gray-100 text-gray-800",
      NDR: "bg-orange-100 text-orange-800",
    };

    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-1 bg-gray-100 rounded-md text-gray-700 text-sm hover:bg-gray-200">
            <Filter size={16} className="mr-1" />
            Filter
          </button>
          <button className="flex items-center px-3 py-1 bg-gray-100 rounded-md text-gray-700 text-sm hover:bg-gray-200">
            <Download size={16} className="mr-1" />
            Export
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["id", "customer", "date", "status", "platform", "amount"].map(
                (field) => (
                  <th
                    key={field}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <button
                      className="flex items-center focus:outline-none"
                      onClick={() => handleSort(field)}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                      {sortField === field &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        ))}
                    </button>
                  </th>
                )
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedOrders.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(order.date), "MMM dd, yyyy")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.platform}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {expandedOrder === order.id
                        ? "Hide Details"
                        : "View Details"}
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;

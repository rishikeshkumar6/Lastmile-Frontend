import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Filter, Download } from "lucide-react";
import { useShippingOrderMutation } from "../../Redux/Action";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const OrdersTable = ({ orders, isSubscribed = false, shipmentRowData }) => {
  const [shippingOrder, { isLoading, isSuccess, isError, data, error }] =
    useShippingOrderMutation();
  const navigate = useNavigate();
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
    console.log("sortedOrders", sortedOrders);

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

  useEffect(() => {
    if (isSuccess === true && data.statusCode === 200) {
      navigate("/invoice_details");
    }
  }, [data]);

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
  const handleClick = () => {
    shippingOrder(shipmentRowData);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Courier Partner",
                "Expected Pickup",
                "Estimited Delivery",
                "Chargeable Weight ",
                "Charges",
                "Action",
              ].map((field) => (
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
              ))}
            </tr>
          </thead>
          {console.log("check sorted order data", sortedOrders)}
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedOrders.map((order) => (
              <React.Fragment key={order.date}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[30%]">
                    <div className="flex gap-2 items-center">
                      <img src={order.img_url} className="w-[15%]" />
                      <div className="flex flex-col ">
                        <span className="font-medium text-sm">
                          {order.courier}
                        </span>
                        <span className="font-normal text-sm/6">
                          Surface | Min-weight: {order.min_weight}
                        </span>
                        <span className="font-normal text-sm/6">
                          RTO Charges: ₹{order.rto_charges}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.day}
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
                      {order.weight} kg
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="flex gap-2 items-center justify-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
                      onClick={handleClick}
                    >
                      Ship Now
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

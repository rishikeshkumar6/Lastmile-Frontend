import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Filter, Download } from "lucide-react";
import { useShippingOrderMutation } from "../../Redux/Action";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { format } from "date-fns";

const OrdersTable = ({
  orders,
  isSubscribed = false,
  shipmentRowData,
  popup,
  setPopup,
  setActiveButton,
}) => {
  const [shippingOrder, { isLoading, isSuccess, isError, data, error }] =
    useShippingOrderMutation();
  const Data = useSelector(
    (state) => state["rootReducer"]["orderSlice"]["freightResponse"]
  );
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

  useEffect(() => {
    if (isSuccess === true && data.statusCode === 200) {
      setPopup(!popup);
      setActiveButton("booked");
      toast.success("your shipment is created successfully", {
        autoClose: "3000",
      });
    }
    if (isError === true) {
      toast.error(error.data.message, { autoClose: "2000" });
    }
  }, [data, error]);

  const handleClick = (
    channel,
    freight_rate,
    min_weight,
    weight,
    estimated_pickup_date,
    estimate_delivey_date,
    rto_rate
  ) => {
    const { orderDetails, id } = shipmentRowData;
    const { orderid } = orderDetails;
    shippingOrder({
      orderid,
      channel,
      id,
      freight_rate,
      min_weight,
      weight,
      estimated_pickup_date,
      estimate_delivey_date,
      rto_rate,
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
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
          <tbody className="bg-white divide-y divide-gray-200">
            {Data.length > 0 &&
              Data[0].map((order) => (
                <React.Fragment key={order.estimate_delivey_date}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[30%]">
                      <div className="flex gap-2 items-center">
                        <img src={order.img_url} className="w-[15%]" />
                        <div className="flex flex-col ">
                          <span className="font-medium text-sm">
                            {order.courierName}
                          </span>
                          <span className="font-normal text-sm/6">
                            Surface | Min-weight: {order.min_weight}
                          </span>
                          <span className="font-normal text-sm/6">
                            RTO Charges: ₹{order.rto_rate.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.estimated_pickup_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.estimate_delivey_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                      >
                        {order.weight} kg
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{order.freight_rate.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        className="flex gap-2 items-center justify-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
                        onClick={() =>
                          handleClick(
                            order.courierName,
                            order.freight_rate,
                            order.min_weight,
                            order.weight,
                            order.estimated_pickup_date,
                            order.estimate_delivey_date,
                            order.rto_rate
                          )
                        }
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

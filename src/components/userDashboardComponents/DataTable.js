import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPopper } from "@popperjs/core";
import { RxDotsVertical } from "react-icons/rx";
import { filterOrder, insertSingleOrder } from "../../Redux/exportOrderSlice";

const DataTable = ({ data, row, index, selectAll, setSelectAll }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Data = useSelector(
    (state) => state["rootReducer"]["orderSlice"]["exportOrder"]
  );
  const [Id, setId] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [Index, setIndex] = useState(null);
  const [toolkit, setToolKit] = useState(null);
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);
  useEffect(() => {
    console.log("Data", Data);
    if (Data.length > 0) {
      setSelectedOrders(Data.map((elem) => elem.id));
    }
    if (Data.length === 0) {
      setSelectedOrders([]);
      setSelectAll(false);
    }
  }, [Data]);
  const handleMouseEnter = () => {
    setToolKit(true);
    createPopper(buttonRef.current, tooltipRef.current, {
      placement: "top", // Adjust as needed
    });
  };

  const handleMouseLeave = () => setToolKit(false);
  const {
    id,
    order_status,
    consigneeDetails: consignee_details,
    pickupDetails: pickup_details,
    packageDetails: package_details,
    orderDetails: order_details,
  } = row;

  const handleChecked = (id, row) => {
    if (selectedOrders.includes(id)) {
      dispatch(filterOrder(id));
      setSelectAll(false);
    } else {
      dispatch(insertSingleOrder(row));
      if (Data.length + 1 === data.orderRes.length) {
        setSelectAll(true);
      }
    }
  };
  return (
    <tr className={`${(index + 1) % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
      <td className="p-3 text-[0.8rem]  font-[500]">
        <input
          type="checkbox"
          checked={selectedOrders.includes(id)}
          onClick={() => handleChecked(id, row)}
        />
      </td>
      <td className="p-3 text-[0.8rem]  font-[500]">
        <span
          className="text-blue-500 cursor-pointer"
          style={{ textDecoration: "underline" }}
        >
          {order_details !== null ? order_details.orderid : "N/A"}
        </span>
      </td>
      <td className="p-3 text-[0.8rem]">
        {pickup_details !== null ? (
          <div className="flex flex-col gap-1">
            <span className="font-[500]">
              {pickup_details.contact_person_name !== ""
                ? pickup_details.contact_person_name
                : ""}
            </span>
            <div className="flex flex-col ">
              <span>
                {pickup_details.contact_person_phone !== ""
                  ? pickup_details.contact_person_phone
                  : ""}
              </span>
              <span>
                {pickup_details.contact_person_email !== ""
                  ? pickup_details.contact_person_email
                  : ""}
              </span>
            </div>
          </div>
        ) : (
          "N/A"
        )}
      </td>
      <td className="p-3 text-[0.8rem]">
        <div className="flex flex-col gap-1">
          <span className="font-[500]">
            {consignee_details.fullname !== ""
              ? consignee_details.fullname
              : ""}
          </span>
          <div className="flex flex-col ">
            <span>
              {consignee_details.phonenumber !== ""
                ? consignee_details.phonenumber
                : ""}
            </span>
            <span>
              {consignee_details.email !== "" ? consignee_details.email : ""}
            </span>
          </div>
        </div>
      </td>
      <td className="p-3 text-[0.8rem]">
        {order_details !== null ? (
          <div className="flex flex-col">
            <span>
              {order_details["productDetails"][0]["name"] !== ""
                ? order_details["productDetails"][0]["name"]
                : ""}
            </span>
            <span>
              {order_details["productDetails"][0]["quantity"] !== ""
                ? `quantity: ${order_details["productDetails"][0]["name"].slice(
                    0,
                    25
                  )}`
                : ""}
            </span>
            <span className="text-blue-500 font-[500]">
              {order_details["productDetails"].length > 1 ? (
                <div className="relative inline-block">
                  <span
                    ref={buttonRef}
                    className="text-secondary hover:cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {`+2 products`}
                  </span>
                  {toolkit && (
                    <div
                      ref={tooltipRef}
                      role="tooltip"
                      className="absolute z-50 inline-block px-3 py-2 text-sm font-normal text-white bg-gray-900 rounded-lg shadow-lg dark:bg-gray-700 w-[200px]"
                    >
                      {order_details["productDetails"].map((elem, index) => {
                        const { name, price, quantity, sku_code } = elem;
                        return (
                          <>
                            <div className="flex flex-col gap-1">
                              <span>{`${index + 1} ${name}`}</span>
                              <span>{`price: ${price}`}</span>
                              <span>{`SKU: ${sku_code}`}</span>
                              <span>{`Qty: ${quantity}`}</span>
                            </div>
                            <hr className="my-5" />
                          </>
                        );
                      })}
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
            </span>
          </div>
        ) : (
          "N/A"
        )}
      </td>
      <td className="p-3 text-[0.8rem]">
        {package_details !== null ? (
          <div className="flex flex-col">
            <span>
              {package_details.dead_weigth !== ""
                ? `Dead Wt: ${package_details.dead_weigth}`
                : ""}
            </span>
            <span>
              {`${
                package_details.length !== "" ? package_details.length : ""
              } x ${
                package_details.breath !== "" ? package_details.breath : ""
              } x ${
                package_details.height !== "" ? package_details.height : ""
              }`}{" "}
              (cm)
            </span>
            <span>
              {package_details.volumetric_weigth !== ""
                ? `Volumetric Wt:${package_details.volumetric_weigth}`
                : ""}
            </span>
          </div>
        ) : (
          "N/A"
        )}
      </td>
      <td className="p-3 text-[0.8rem]">
        <div className="flex flex-col gap-1">
          <span>$100</span>
          <span className="w-[60%] bg-red-200 flex justify-center gap-1">
            Prepaid
          </span>
        </div>
      </td>
      <td className="p-3 text-[0.8rem]">
        {order_status !== "" ? order_status : ""}
      </td>
      <td className="px-3 py-5 text-[0.8rem] flex items-center gap-2">
        <button className="flex gap-2 items-center justify-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55">
          Ship Now
        </button>
        <div className="relative">
          <RxDotsVertical
            className="cursor-pointer"
            onClick={() => {
              setId(id);
            }}
          />

          {id === Id && (
            <div class="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-40 dark:bg-gray-700 dark:divide-gray-600">
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownMenuIconButton"
              >
                <li>
                  <span
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
                    onClick={() => navigate("/orderDetails")}
                  >
                    View Order
                  </span>
                </li>
                <li>
                  <span
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
                    onClick={() =>
                      navigate(`/order/ordercreate/${id}/consignee-details`)
                    }
                  >
                    Edit Order
                  </span>
                </li>
                <li>
                  <span
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer text-red-600"
                  >
                    Cancel Order
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </td>
      {console.log(selectedOrders)}
    </tr>
  );
};

export default DataTable;

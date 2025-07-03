import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import html2pdf from "html2pdf.js";
import { createPopper } from "@popperjs/core";
import { RxDotsVertical } from "react-icons/rx";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  filterOrder,
  freightRateAction,
  insertSingleOrder,
} from "../../Redux/exportOrderSlice";
import { useFreightRateMutation } from "../../Redux/Action";
import CancelCardPopup from "../CancelCardPopup";
import DeleteCardPopup from "./DeleteOrderPopup";

const DataTable = ({
  data,
  row,
  index,
  selectAll,
  setSelectAll,
  shipmentPopup,
  setShipmentPopup,
  setShipmentRowData,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Data = useSelector(
    (state) => state["rootReducer"]["orderSlice"]["exportOrder"]
  );
  const [
    freightRate,
    { isLoading, isSuccess, data: freight_rate_data, isError, error },
  ] = useFreightRateMutation();
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [toolkit, setToolKit] = useState(null);
  const [cancelOrderState, setCancelOrderState] = useState(false);
  const [drawer, setDrawer] = useState(true);
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);
  const labelRef = useRef(null);

  const labelData = {
    shipTo: {
      name: "Moksh Jaswal",
      address: "House No. 45, Palm Enclave, Rajouri Garden",
      city: "New Delhi, 110027, India",
      phone: "9871178775",
    },
    shipFrom: {
      company: "Warehousity",
      name: "Moksh Jaswal",
      address: "House No. 45, Palm Enclave, Rajouri Garden",
      city: "New Delhi, 110027, India",
      phone: "9871178775",
    },
    package: {
      dimensions: "10 x 10 x 10 cm",
      weight: "0.5 kg",
      date: "10 Apr 2024, 05:03:26",
      paymentMode: "Prepaid",
    },
    courier: {
      name: "Delhivery",
      awb: "3306837002",
    },
    order: {
      id: "3075",
      amount: 100,
    },
    products: [
      {
        name: "Product 1",
        quantity: 1,
        amount: 100,
      },
    ],
  };

  const handleDownloadPDF = () => {
    console.log("handleDownloadPDF is calling");
    if (labelRef.current) {
      const element = labelRef.current;
      const opt = {
        margin: 0,
        filename: `shipping-label-${labelData.order.id}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: [5, 7.5], orientation: "portrait" },
      };

      html2pdf().set(opt).from(element).save();
    }
  };

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
    shippingInfo,
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

  const handleShipment = () => {
    console.log("----------row data tesitng-------", row);
    const { consigneeDetails, pickupDetails, packageDetails } = row;
    const { pincode: consignee_pincode } = consigneeDetails;
    const { pickup_pincode: pickup_pincode } = pickupDetails;
    const { dead_weigth: weight } = packageDetails;
    freightRate({ pickup_pincode, consignee_pincode, weight });
    setShipmentPopup(!shipmentPopup);
    setShipmentRowData(row);
  };

  useEffect(() => {
    console.log("---freight rate useEffect hook----");
    if (
      isSuccess === true &&
      freight_rate_data !== null &&
      freight_rate_data !== undefined
    ) {
      dispatch(freightRateAction(freight_rate_data));
    }
  }, [freight_rate_data]);

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
        {order_status !== "" ? (
          order_status === "new" || order_status === "supicious_order" ? (
            pickup_details !== null ? (
              <div className="flex flex-col gap-1">
                <span className="font-[500]">
                  {pickup_details.pickup_person_name !== ""
                    ? pickup_details.pickup_person_name
                    : ""}
                </span>
                <div className="flex flex-col ">
                  <span>
                    {pickup_details.pickup_person_phone !== ""
                      ? pickup_details.pickup_person_phone
                      : ""}
                  </span>
                  <span>
                    {pickup_details.pickup_person_email !== ""
                      ? pickup_details.pickup_person_email
                      : ""}
                  </span>
                </div>
              </div>
            ) : (
              "N/A"
            )
          ) : shippingInfo !== undefined ? (
            <div className="flex flex-col gap-1">
              <span className="font-[500]">
                {` ${
                  shippingInfo?.courier_partner !== ""
                    ? shippingInfo?.courier_partner
                    : ""
                }`}
              </span>
              <span>
                {`AWB - ${
                  shippingInfo?.awb_number !== ""
                    ? shippingInfo?.awb_number
                    : ""
                }`}
              </span>
              <span>
                {` ${
                  shippingInfo?.booking_date !== ""
                    ? shippingInfo?.booking_date
                    : ""
                }`}
              </span>
            </div>
          ) : (
            ""
          )
        ) : (
          ""
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
        {order_details !== null &&
        order_details["productDetails"].length > 0 ? (
          <div className="flex flex-col">
            <span>
              {order_details["productDetails"][0]["name"] !== ""
                ? `${order_details["productDetails"][0]["name"].slice(
                    0,
                    20
                  )}....`
                : ""}
            </span>
            <span>
              {order_details["productDetails"][0]["quantity"] !== ""
                ? `quantity: ${order_details["productDetails"][0]["quantity"]}`
                : ""}
            </span>
            <span className="text-blue-500 font-[500]">
              {order_details["productDetails"].length > 1 ? (
                <div className="relative inline-block">
                  <Popup
                    trigger={<button className="button"> +2 Products </button>}
                    position="bottom center"
                    on="hover"
                    arrow={false}
                    offsetY={-10}
                    contentStyle={{
                      backgroundColor: "#333",
                      width: "16%",
                      height: "30%",
                      color: "#fff",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      fontSize: "12px",
                      overflow: "auto",
                    }}
                  >
                    <>
                      {order_details["productDetails"].map((elem, index) => {
                        const { name, price, quantity, sku_code } = elem;
                        return (
                          <>
                            <div className="flex flex-col gap-2 font-medium">
                              <span>{`${index + 1} ${name}`}</span>
                              <span>{`price: ${price}`}</span>
                              <span>{`SKU: ${sku_code}`}</span>
                              <span>{`Qty: ${quantity}`}</span>
                            </div>
                            <hr className="my-3" />
                          </>
                        );
                      })}
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </>
                  </Popup>
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
        {order_status !== "" && order_status === "new" ? (
          <button
            className="flex gap-2 items-center justify-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
            onClick={handleShipment}
          >
            Ship Now
          </button>
        ) : (
          <button
            className="flex gap-2 items-center justify-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
            onClick={() => navigate("/orderDetails")}
          >
            Track
          </button>
        )}
        <div className="relative">
          <Menu
            menuButton={
              <MenuButton>
                {" "}
                <RxDotsVertical className="cursor-pointer" />
              </MenuButton>
            }
          >
            <div
              class="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-40 dark:bg-gray-700 dark:divide-gray-600"
              onClose={() => setDrawer(false)}
            >
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
                {(order_status === "new" ||
                  order_status === "supicious_order") && (
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
                )}
                {order_status === "booked" && (
                    <li>
                      <span
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
                        onClick={() => navigate(`/label/${id}`)}
                      >
                        Generate Label
                      </span>
                    </li>
                  ) && (
                    <li>
                      <span
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
                        onClick={() => navigate(`/label/${id}`)}
                      >
                        Generate Invoice
                      </span>
                    </li>
                  )}
                {order_status === "booked" && (
                  <li>
                    <span
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
                      onClick={() => navigate(`/label/${id}`)}
                    >
                      Generate Label
                    </span>
                  </li>
                )}
                {order_status === "booked" && (
                  <li>
                    <span
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
                      onClick={() => navigate(`/label/${id}`)}
                    >
                      Download Manifest
                    </span>
                  </li>
                )}
                {(order_status === "new" ||
                  order_status === "supicious_order") && (
                  <li>
                    <span
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer text-red-600"
                    >
                      <DeleteCardPopup
                        popup={cancelOrderState}
                        setPopup={setCancelOrderState}
                        row={row}
                      />
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </Menu>
        </div>
      </td>
      {console.log(
        isLoading === true &&
          freight_rate_data !== null &&
          freight_rate_data !== undefined
      )}{" "}
    </tr>
  );
};

export default DataTable;

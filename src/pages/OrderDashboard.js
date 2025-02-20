import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Button from "@mui/material/Button";
import { IoCartOutline } from "react-icons/io5";
import { RxDotsVertical } from "react-icons/rx";
import Pagination from "@mui/material/Pagination";
import { useGetAllOrderQuery } from "../Redux/Action";
import { MdErrorOutline } from "react-icons/md";
import Stack from "@mui/material/Stack";
import { HiOutlineRefresh } from "react-icons/hi";

import { Link } from "react-router-dom";

const Order = () => {
  const [Id, setId] = useState(null);
  const [activeButton, setActiveButton] = useState("New");
  const { isLoading, isSuccess, isError, data, error } = useGetAllOrderQuery();

  useEffect(() => {
    if (isLoading === true) {
      console.log("loding....");
    }
    if (isSuccess === true) {
      console.log("data", data);
    }
    if (isError === true) {
      console.log("error", error);
    }
  }, [data, error]);

  const handleActiveButton = (status) => {
    switch (status) {
      case "New":
        return setActiveButton("New");
      case "Booked":
        return setActiveButton("Booked");
      case "Pickup/Mainfest":
        return setActiveButton("Pickup/Mainfest");
      case "In Transit":
        return setActiveButton("In Transit");
      case "Out For Deleivery":
        return setActiveButton("Out For Deleivery");
      case "Deleivered":
        return setActiveButton("Deleivered");
      case "Return To Origin":
        return setActiveButton("Return To Origin");
      case "Non Deleivery Report":
        return setActiveButton("Non Deleivery Report");
      case "All Orders":
        return setActiveButton("All Orders");
    }
  };
  return (
    <section className="flex gap-6">
      <Sidebar />
      <div className="m-3 text-xl text-gray-900   w-[90%] m-[auto]">
        <div className="flex justify-between py-5 pl-14">
          <div className="flex gap-5 items-center w-[40%]">
            <form class="max-w-md w-[100%]">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full py-3 px-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="search awb number,order id, email id, phone number"
                  required
                />
              </div>
            </form>
          </div>
          <div className="flex gap-5 items-center">
            <button className="  text-sm font-normal  px-8 py-3 rounded-sm  cursor-pointer flex gap-2 items-center bg-slate-900 text-white">
              <HiOutlineRefresh className="text-[20px]" /> Sync
            </button>
            <Link to="/order/ordercreate">
              <button
                variant="contained"
                className="text-sm font-normal  px-8 py-3 rounded-sm  cursor-pointer flex gap-2 items-center bg-slate-900  text-white"
                title="add single or bulk order"
              >
                <IoCartOutline className="text-[20px]" /> Add Order
              </button>
            </Link>
          </div>
        </div>

        <ul class="flex flex-wrap text-sm gap-5 text-center pl-12 text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 pb-5">
          <span
            class={`  text-sm font-normal py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "New"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("New")}
          >
            New Order
          </span>
          <span
            class={`  text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "Booked"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("Booked")}
          >
            Booked
          </span>
          <span
            class={`text-sm font-normal py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "Pickup/Mainfest"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("Pickup/Mainfest")}
          >
            Pickup/Mainfest
          </span>
          <span
            class={`text-sm font-normal py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "In Transit"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("In Transit")}
          >
            In Transit
          </span>
          <span
            class={`text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "Out For Deleivery"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("Out For Deleivery")}
          >
            Out For Deleivery
          </span>
          <span
            class={`text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "Deleivered"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("Deleivered")}
          >
            Deleivered
          </span>
          <span
            class={`text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "Return To Origin"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("Return To Origin")}
          >
            Return To Origin
          </span>
          <span
            class={`text-sm font-normal py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "Non Deleivery Report"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("Non Deleivery Report")}
          >
            Non Deleivery Report
          </span>
          <span
            class={`text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "All Orders"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("All Orders")}
          >
            All Orders
          </span>
        </ul>

        <div className="w-full p-8 bg-white">
          {isSuccess === true &&
          Object.keys(data).length > 0 &&
          data.orderRes.length > 0 ? (
            <table className="w-full text-left leading-5 ">
              <thead className="bg-gray-50 border-2 border-gray-200">
                <tr>
                  <th className="p-3 text-sm">Order Details</th>
                  <th className="p-3 text-sm">Pickup Details</th>
                  <th className="p-3 text-sm">Consignee Details</th>
                  <th className="p-3 text-sm">Product Details</th>
                  <th className="p-3 text-sm">Package Details </th>
                  <th className="p-3 text-sm">Payment Mode</th>
                  <th className="p-3 text-sm">Status</th>
                  <th className="p-3 text-sm">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white border-2">
                {data.orderRes.map((elem, index) => {
                  const consignee_details = elem.consigneeDetails;
                  const pickup_details = elem.pickupDetails;
                  const package_details = elem.packageDetails;
                  const order_details = elem.orderDetails;
                  return (
                    <tr
                      className={`${
                        (index + 1) % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <td className="p-3 text-[0.8rem]  font-[500]">
                        <span
                          className="text-blue-500 cursor-pointer"
                          style={{ textDecoration: "underline" }}
                        >
                          {order_details !== null
                            ? order_details.orderid
                            : "N/A"}
                        </span>
                      </td>
                      <td className="p-3 text-[0.8rem]">
                        {pickup_details !== null ? (
                          <div className="flex flex-col gap-1">
                            <span className="font-[500]">
                              {pickup_details.fullname !== ""
                                ? pickup_details.fullname
                                : ""}
                            </span>
                            <div className="flex flex-col ">
                              <span>
                                {pickup_details.fullname !== ""
                                  ? pickup_details.phonenumber
                                  : ""}
                              </span>
                              <span>
                                {pickup_details.fullname !== ""
                                  ? pickup_details.email
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
                              {consignee_details.email !== ""
                                ? consignee_details.email
                                : ""}
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
                              {order_details["productDetails"][0][
                                "quantity"
                              ] !== ""
                                ? `quantity: ${order_details["productDetails"][0]["name"]}`
                                : ""}
                            </span>
                            <span className="text-blue-500 font-[500]">
                              +2 More Products
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
                                package_details.length !== ""
                                  ? package_details.length
                                  : ""
                              } x ${
                                package_details.breath !== ""
                                  ? package_details.breath
                                  : ""
                              } x ${
                                package_details.height !== ""
                                  ? package_details.height
                                  : ""
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
                        {elem.order_status !== "" ? elem.order_status : ""}
                      </td>
                      <td className="p-3 text-[0.8rem] flex items-center gap-2">
                        <button className="flex gap-2 items-center justify-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55">
                          Ship Now
                        </button>
                        <div className="relative">
                          <RxDotsVertical
                            className="cursor-pointer"
                            onClick={() => {
                              setId(1);
                            }}
                          />

                          {index === Id && (
                            <div class="absolute right-0 mt-2 w-[200px] bg-white shadow-lg rounded-md p-3 z-50">
                              <div class="flex flex-col gap-1">
                                <span className="p-4 cursor-pointer hover:bg-gray-100">
                                  Edit Order
                                </span>
                                <span class="p-4 cursor-pointer hover:bg-gray-100 text-red-500">
                                  Cancel Order
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="h-[400px] flex items-center justify-center">
              <div className="flex flex-col gap-5 justify-center align-center">
                <span className="text-[25px] flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto">
                  {" "}
                  <MdErrorOutline className="text-red-500 " />
                </span>
                <div className="flex flex-col gap-2 mx-auto">
                  <span className="font-bold text-red-800">
                    Unable to load orders
                  </span>
                  <span className="text-sm text-red-600 text-center mx-auto">
                    please try again or refresh the page
                  </span>
                </div>
                <button className="w-[40%] bg-red-200 flex items-center justify-center gap-2 px-4 py-2 text-[15px] rounded-md text-red-600 mx-auto">
                  {" "}
                  <span>
                    <HiOutlineRefresh />
                  </span>
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
        {isLoading === true && (
          <div>
            <table className="w-full text-left leading-5">
              <thead className="bg-gray-50 border-2 border-gray-200">
                <tr>
                  <th className="p-3 text-sm">Order Details</th>
                  <th className="p-3 text-sm">Pickup Details</th>
                  <th className="p-3 text-sm">Consignee Details</th>
                  <th className="p-3 text-sm">Product Details</th>
                  <th className="p-3 text-sm">Package Details</th>
                  <th className="p-3 text-sm">Payment Mode</th>
                  <th className="p-3 text-sm">Status</th>
                  <th className="p-3 text-sm">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white border-2">
                {Array(10)
                  .fill(null)
                  .map((_, index) => (
                    <tr
                      key={index}
                      className={`${
                        (index + 1) % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <td className="p-3 text-[0.8rem] font-[500]">
                        <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                      </td>
                      <td className="p-3 text-[0.8rem]">
                        <div className="flex flex-col gap-1">
                          <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                          <div className="flex flex-col gap-1">
                            <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                            <div className="w-32 h-4 bg-gray-300 animate-pulse rounded"></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-[0.8rem]">
                        <div className="flex flex-col gap-1">
                          <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                          <div className="flex flex-col gap-1">
                            <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                            <div className="w-32 h-4 bg-gray-300 animate-pulse rounded"></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-[0.8rem]">
                        <div className="flex flex-col gap-1">
                          <div className="w-32 h-4 bg-gray-300 animate-pulse rounded"></div>
                          <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                          <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                      </td>
                      <td className="p-3 text-[0.8rem]">
                        <div className="flex flex-col gap-1">
                          <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                          <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                          <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                      </td>
                      <td className="p-3 text-[0.8rem]">
                        <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                      </td>
                      <td className="p-3 text-[0.8rem]">
                        <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                      </td>
                      <td className="p-3 text-[0.8rem]">
                        <div className="w-24 h-8 bg-gray-300 animate-pulse rounded"></div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        <Stack spacing={2} className="py-5 m-[auto]">
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </div>
      {console.log(
        "rtk query state",
        isLoading,
        isSuccess,
        isError,
        data,
        error
      )}
    </section>
  );
};

export default Order;

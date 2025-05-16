import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaWallet } from "react-icons/fa6";
import { HiOutlineRefresh } from "react-icons/hi";
import Rishu from "./rishikesh.jpeg";
import Popup from "./Payment/OrderCreation";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import { useNavigate } from "react-router-dom";
import { useOrderCreationMutation } from "../Redux/Action";
import CancelCardPopup from "./CancelCardPopup";

const Header = () => {
  const [orderCreation, { isLoading, isSuccess, isError, data, error }] =
    useOrderCreationMutation();
  const [popup, setPopup] = useState(false);
  const [avatarDrawerPopup, setAvatarDrawerPopup] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const navigate = useNavigate();
  const hover = isButtonHovered || isMenuHovered;

  // const orderCreation = async (callback) => {
  //   console.log("------orders----", orders);
  //   try {
  //     const response = await axios.post("http://localhost:8080/ordercreation", {
  //       amount: 500,
  //       currency: "INR",
  //       receipt: `reciept${Date.now()}`,
  //     });
  //     setOrders(response);
  //     console.log("callback function", callback);
  //     if (Object.keys(response).length > 0) {
  //       console.log("callback function is called");
  //       callback(response);
  //     }
  //     console.log("response", response);
  //   } catch (err) {
  //     console.log("error", err);
  //   }
  // };

  useEffect(() => {
    console.log("useEffect hook is called");
    if (data !== undefined && Object.keys(data).length > 0) {
      const options = {
        key: isSuccess !== false && data.paymentRes.key,
        amount: isSuccess !== false && data.paymentRes.amount,
        currency: "INR",
        name: "Logistic Solution",
        description: "purchase the item",
        order_id: isSuccess !== false && data.paymentRes.id,
        handler: async (res) => {
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_DEVELOPEMENT_URL}/api/v1/paymentverification`,
              res
            );
            console.log("payment verification reponse", response);
          } catch (err) {
            console.log("errors", err);
          }
        },
        prefill: {
          name: "Rishikesh Kumar Singh",
          email: "rishikesh.kumar@omneelab.com",
          contact: "6207654176",
        },
        theme: {
          color: "#3399cc",
        },
      };
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Razorpay SDK not loaded. Please try again.");
      }
    }
  }, [data]);

  return (
    <>
      <div
        className={`bg-white shadow-md py-2 flex flex-row justify-between px-5 sticky top-0 left-0 right-0 z-10 
        }`}
      >
        <div className="items-center text-[20px] font-bold">LogiTrack</div>
        <div className="flex gap-4 items-center">
          {/* <button
          className="text-white bg-sky-400 px-2"
          // onClick={() => {
          //   orderCreation(handlePayment);
          // }}

       
        >
          Recharge
        </button> */}
          <li
            className="relative flex"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <button
              id="mega-menu-icons-dropdown-button"
              className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Quick Actions
            </button>

            {/* Mega Menu Dropdown */}
            <div
              id="mega-menu-icons-dropdown"
              className={`absolute ${
                isButtonHovered ? "block" : "hidden"
              } z-10 top-full  -translate-x-1/2 w-auto md:w-[65vw] min-w-[300px] max-w-[800px] text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-700 p-4 transition-opacity duration-300`}
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
                {/* Menu Items */}
                <div
                  className="p-2 flex flex-col items-center text-center cursor-pointer border rounded-lg hover:border-indigo-500"
                  onClick={() => navigate("/order/ordercreate")}
                >
                  <img
                    src="https://sr-cdn-1.shiprocket.in/img/add_order.svg"
                    className="w-12 h-12 mb-2"
                    alt="Add order"
                  />
                  <span className="text-sm ">Add an Order</span>
                </div>

                <div className="p-2 flex flex-col items-center text-center cursor-pointer border rounded-lg hover:border-indigo-500">
                  <img
                    src="https://sr-cdn-1.shiprocket.in/img/bike.svg"
                    className="w-12 h-12 mb-2"
                    alt="Hyperlocal shipment"
                  />
                  <span className="text-sm">Create a Hyperlocal Shipment</span>
                </div>
                <div className="p-2 flex flex-col items-center text-center cursor-pointer border rounded-lg hover:border-indigo-500">
                  <img
                    src="https://sr-cdn-1.shiprocket.in/img/rate_calulator.svg"
                    className="w-12 h-12 mb-2"
                    alt="Hyperlocal shipment"
                  />
                  <span className="text-sm">Rate Calculator</span>
                </div>
                <div className="p-2 flex flex-col items-center text-center cursor-pointer border rounded-lg hover:border-indigo-500">
                  <img
                    src="https://sr-cdn-1.shiprocket.in/img/create_ticket.svg"
                    className="w-12 h-12 mb-2"
                    alt="Hyperlocal shipment"
                  />
                  <span className="text-sm">Create a Ticket</span>
                </div>
                <div
                  className="p-2 flex flex-col items-center text-center cursor-pointer border rounded-lg hover:border-indigo-500"
                  onClick={() => navigate("/orderDetails")}
                >
                  <img
                    src="https://sr-cdn-1.shiprocket.in/img/track_shipment.svg"
                    className="w-12 h-12 mb-2"
                    alt="Hyperlocal shipment"
                  />
                  <span className="text-sm">Track Shipments</span>
                </div>

                {/* Add other menu items similarly */}
              </div>
            </div>
          </li>
          <button
            type="button"
            class="flex gap-2 items-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
            onClick={() => {
              setPopup(true);
            }}
          >
            <FaWallet className="text-[15px]" />
            Recharge
          </button>

          <span className="">₹100</span>
          <span>
            <HiOutlineRefresh />
          </span>
          <Menu
            menuButton={
              <MenuButton>
                {" "}
                <span className="hidden lg:flex cursor-pointer">
                  <Stack direction="row" spacing={2}>
                    <Avatar alt="Remy Sharp" src={Rishu} />
                  </Stack>
                </span>
              </MenuButton>
            }
          >
            <div
              id="dropdownDivider"
              class="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDividerButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Rishikesh Kumar Singh
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Current Plan
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Terms and Conditions
                  </a>
                </li>
              </ul>
              <div class="py-2">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Logout
                </a>
              </div>
            </div>
          </Menu>
        </div>
        {popup && (
          <Popup
            setpopup={setPopup}
            popup={popup}
            orderCreation={orderCreation}
          />
        )}
      </div>
    </>
  );
};

export default Header;

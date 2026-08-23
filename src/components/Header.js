import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaWallet } from "react-icons/fa6";
import { HiOutlineRefresh } from "react-icons/hi";
import Rishu from "./rishikesh.jpeg";
import Popup from "./Payment/OrderCreation";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userLogout } from "../Redux/rootReducer";
import { useNavigate } from "react-router-dom";
import { useOrderCreationMutation } from "../Redux/Action";
import CancelCardPopup from "./CancelCardPopup";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../Redux/Action";

const Header = () => {
  const [orderCreation, { isLoading, isSuccess, isError, data, error }] =
    useOrderCreationMutation();
  const dispatch = useDispatch();
  const [
    logout,
    {
      isLoading: isLogoutLoading,
      isSuccess: isLogoutSuccess,
      isError: isLogoutError,
      data: logoutData,
      error: logoutError,
    },
  ] = useLogoutMutation();

  const Data = useSelector((state) => state.rootReducer.userSlice);
  const [popup, setPopup] = useState(false);
  const [avatarDrawerPopup, setAvatarDrawerPopup] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const navigate = useNavigate();
  const hover = isButtonHovered || isMenuHovered;

  useEffect(() => {
    if (isLogoutSuccess === true && logoutData) {
      dispatch(userLogout());
      window.location.href = "/";
    }
  }, [logoutData]);

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
      setPopup(!popup);
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
              { ...res, ...data },
            );
            if (
              Object.keys(response.data).length > 0 &&
              response.data.success
            ) {
              setPopup(!popup);
              toast.success(response.data.message, { autoClose: "2000" });
            }
            console.log("payment verification reponse", response);
          } catch (err) {
            console.log("errors", err);
            if (err.response.data.statusCode === 500) {
              toast.error(err.response.data["error"], { autoClose: "2000" });
            }
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
        <div className="items-center text-[20px] font-bold">
          Logistic Solutions
        </div>
        <div className="flex gap-4 items-center">
          {/* <button
          className="text-white bg-sky-400 px-2"
          // onClick={() => {
          //   orderCreation(handlePayment);
          // }}

       
        >
          Recharge
        </button> */}

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
          {console.log("-----useselector state------", Data)}
          <span className="">{`${
            Data.walletInfo !== null
              ? Data?.walletInfo?.response !== undefined
                ? Data?.walletInfo?.response.walletResponse !== undefined &&
                  Data?.walletInfo?.response.walletResponse !== null &&
                  Object.keys(Data.walletInfo.response.walletResponse).length >
                    0
                  ? Data.walletInfo.response.walletResponse.amount.toFixed(2)
                  : 0
                : 0
              : 0
          }`}</span>
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
                    {`${
                      Data.walletInfo !== null
                        ? Data.walletInfo !== null &&
                          Object.keys(Data.walletInfo).length > 0
                          ? Data.walletInfo.response !== undefined
                            ? Data.walletInfo.response.name
                            : "cannot fetch name"
                          : "cannot fetch name"
                        : "cannot fetch name"
                    }`}
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
                <span
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={() => logout()}
                >
                  Logout
                </span>
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

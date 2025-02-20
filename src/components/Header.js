import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaWallet } from "react-icons/fa6";
import { HiOutlineRefresh } from "react-icons/hi";
import Rishu from "./rishikesh.jpeg";
import Popup from "./Payment/OrderCreation";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useOrderCreationMutation } from "../Redux/Action";
import AvatarDrawer from "./AvatarDrawer";

const Header = () => {
  const [orderCreation, { isLoading, isSuccess, isError, data, error }] =
    useOrderCreationMutation();
  const [isLogout, setIsLogout] = useState(false);
  const [orders, setOrders] = useState(null);
  const [popup, setPopup] = useState(false);
  const [avatarDrawerPopup, setAvatarDrawerPopup] = useState(false);
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
        name: "Warehousity",
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
      <AvatarDrawer popup={avatarDrawerPopup} setPopup={setAvatarDrawerPopup} />
      <div
        className={`bg-white shadow-md py-2 flex flex-row justify-between px-5 sticky top-0 left-0 right-0 z-10 
        }`}
      >
        <div className="items-center text-[20px] font-bold">Rishu Logistic</div>
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
              document.body.classList.add("overflow-hidden");
            }}
          >
            <FaWallet className="text-[15px]" />
            Recharge
          </button>

          <span className="">₹100</span>
          <span>
            <HiOutlineRefresh />
          </span>
          <span
            className="hidden lg:flex cursor-pointer"
            onClick={() => setAvatarDrawerPopup(!avatarDrawerPopup)}
          >
            <Stack direction="row" spacing={2}>
              <Avatar alt="Remy Sharp" src={Rishu} />
            </Stack>
          </span>
        </div>
        {popup && (
          <Popup
            setpopup={setPopup}
            popup={popup}
            orderCreation={orderCreation}
          />
        )}{" "}
      </div>
    </>
  );
};

export default Header;

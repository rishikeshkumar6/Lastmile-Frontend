// Popup.js
import React, { useState } from "react";
import "./OrderCreation.css"; // Import your CSS for styling
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
const Popups = ({ setpopup, popup, orderCreation }) => {
  const [ammount, setAmmount] = useState({
    amount: 500,
  });

  const closeModal = () => setpopup(false);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleClick = (params) => {
    console.log("check params", params);
    setAmmount({ ...ammount, amount: params });
  };
  return (
    <Popup
      open={popup}
      closeOnDocumentClick
      onClose={closeModal}
      position="center"
      modal
      contentStyle={{
        width: "30%",
        margin: "auto",
        borderRadius: "10px",
        padding: "24px",
        contentClassName: "popup-animate",
      }}
      overlayStyle={{
        background: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="relative z-[2000]">
        <span
          className="text-[30px] absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => {
            setpopup(false);
          }}
        >
          &times;
        </span>
        <div className="flex justify-between items-center">
          <h6 className="heading-secondary">Recharge Your Wallet</h6>
          <button className="text-primary-light">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="xmark"
              className="svg-inline--fa fa-xmark text-[18px]"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              ></path>
            </svg>
          </button>
        </div>
        <p className="text-[12px] mt-3">
          Current wallet amount:{" "}
          <span className="text-primary-green">₹100</span>
        </p>
        <div className="mt-8">
          <div className="flex gap-3 flex-col">
            <p>Enter Amount to Recharge</p>
            <input
              type="number"
              placeholder="Enter Amount"
              className="px-3 py-2 customInputBorder text-[0.875rem]"
              value={ammount.amount}
              onChange={(event) => {
                setAmmount({ ...ammount, amount: event.target.value });
              }}
            />
            <p className="mt-4 font-small">Or Select From Below</p>
            <div className="flex flex-wrap gap-5">
              {[100, 500, 1000, 2000].map((amount) => {
                return (
                  <span
                    onClick={() => {
                      handleClick(amount);
                    }}
                    key={amount}
                    className="cursor-pointer bg-secondary bg-cyan-400	 rounded-md text-[12px] py-2 w-[60px] text-center"
                  >
                    ₹{amount}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="bg-gray-200 rounded-sm p-6 mt-10 flex flex-col gap-5">
            <div className="flex justify-between items-center text-[12px]">
              <span className="text-gray-700">Recharge Amount</span>
              <span className="text-gray-500">₹{ammount.amount}</span>
            </div>
            <div className="flex justify-between items-center text-[12px]">
              <span className="text-gray-700">Total Amount to be credited</span>
              <span className="text-gray-500">₹{ammount.amount}</span>
            </div>
            <div className="flex justify-between items-center text-primary-light font-bold">
              <span>Payable Amount</span>
              <span>₹{ammount.amount}</span>
            </div>
          </div>
          <div className="mt-10">
            <button
              className="w-full rounded-sm bg-primary-green bg-cyan-400 py-4 flex items-center justify-center gap-3"
              onClick={async () => {
                const res = await initializeRazorpay();
                if (!res) {
                  alert("Razorpay SDK failed to load");
                  return;
                }
                orderCreation(ammount);
              }}
            >
              Continue to payment
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default Popups;

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Rishu from "./rishikesh.jpeg";
import { CiDeliveryTruck } from "react-icons/ci";

// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import OrdersTable from "./Dashboard/OrderTables";

const AvatarDrawer = ({ popup, setPopup, shipmentRowData }) => {
  const handlePopup = () => {
    setPopup(!popup);
  };

  const recentOrders = [
    {
      img_url: "/sr-courier.png",
      min_weight: 0.5,
      weight: 2,
      day: "Monday",
      date: new Date(2025, 3, 15),
      amount: 2499.99,
      rto_charges: 146,
      courier: "Shiprocket Surface",
    },
    {
      img_url: "/amazon.webp",
      min_weight: 0.5,
      weight: 2,
      day: "Tuesday",
      date: new Date(2025, 3, 15),
      amount: 2499.99,
      rto_charges: 156,
      courier: "amazon",
    },
    {
      img_url: "/bluedart.webp",
      min_weight: 0.5,
      weight: 2,
      day: "Tuesday",
      date: new Date(2025, 3, 15),
      amount: 2499.99,
      rto_charges: 156,
      courier: "Bluedart",
    },
  ];
  return (
    <>
      <Drawer
        open={popup}
        onClose={handlePopup}
        direction="right"
        className="bla bla bla"
        style={{ width: "80vw" }}
      >
        <div className="px-10 py-8 flex flex-col gap-5">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-2 border-gray-200">
              <tr className="text-sm align-top">
                <th className="p-3 w-[30%] align-top">
                  <div className="flex items-center gap-5">
                    <img src="/vihchel.png" width={"15%"} />
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-start">
                        Pickup Address
                      </div>
                      <span className="font-normal text-start">
                        Arunachal Apartment, Plot 16, Sector 7, Dwarka, New
                        Delhi 110075, New Delhi, Delhi, India
                      </span>
                    </div>
                  </div>
                </th>
                <th className="p-3 w-[30%] align-top">
                  <div className="flex items-center gap-5">
                    <img src="/vihchel.png" width={"15%"} />
                    <div className="flex flex-col ">
                      <div className="font-medium text-start">
                        Consignee Address
                      </div>
                      <span className="font-normal text-start">
                        Arunachal Apartment, Plot 16, Sector 7, Dwarka, New
                        Delhi 110075, New Delhi, Delhi, India
                      </span>
                    </div>
                  </div>
                </th>
                <th className="p-3 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-start">Order Value</span>
                    <span className="font-normal text-start">₹ 3316.15</span>
                  </div>
                </th>
                <th className="p-3 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-start">Payment Mode</span>
                    <span className="font-normal text-start">Prepaid</span>
                  </div>
                </th>
                <th className="p-3 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-start">
                      Applicable Weight
                    </span>
                    <span className="font-normal text-start">2 kg</span>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
          <OrdersTable
            orders={recentOrders}
            isSubscribed={true}
            shipmentRowData={shipmentRowData}
          />
        </div>
      </Drawer>
    </>
  );
};

export default AvatarDrawer;

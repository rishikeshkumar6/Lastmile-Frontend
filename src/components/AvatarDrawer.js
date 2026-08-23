import React, { useState, useEffect } from "react";
// import component 👇
import Drawer from "react-modern-drawer";
import { useFreightRateMutation } from "../Redux/Action";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import OrdersTable from "./Dashboard/OrderTables";
import LoadingTable from "./userDashboardComponents/LoadingTable";
import ErrorTable from "./userDashboardComponents/ErrorTable";

const AvatarDrawer = ({
  popup,
  setPopup,
  shipmentRowData,
  setActiveButton,
  freightRate,
  is_ferightrare_loading,
  is_ferightrare_success,
  freight_rate_data,
  is_freight_error,
  freight_error,
}) => {
  const handlePopup = () => {
    setPopup(!popup);
  };

  console.log("shipmentRowData", shipmentRowData);
  const pickup_address =
    shipmentRowData !== null
      ? shipmentRowData.pickupDetails !== null
        ? shipmentRowData.pickupDetails.pickup_address
        : "N/A"
      : "N/A";
  const pickup_city =
    shipmentRowData !== null
      ? shipmentRowData.pickupDetails !== null
        ? shipmentRowData.pickupDetails.pickup_city
        : "N/A"
      : "N/A";
  const pickup_state =
    shipmentRowData !== null
      ? shipmentRowData.pickupDetails !== null
        ? shipmentRowData.pickupDetails.pickup_state
        : "N/A"
      : "N/A";
  const pickup_pincode =
    shipmentRowData !== null
      ? shipmentRowData.pickupDetails !== null
        ? shipmentRowData.pickupDetails.pickup_pincode
        : "N/A"
      : "N/A";
  const consignee_address =
    shipmentRowData !== null
      ? shipmentRowData.consigneeDetails !== null
        ? shipmentRowData.consigneeDetails.fulladdress
        : "N/A"
      : "N/A";
  const consignee_city =
    shipmentRowData !== null
      ? shipmentRowData.consigneeDetails !== null
        ? shipmentRowData.consigneeDetails.city
        : "N/A"
      : "N/A";
  const consignee_state =
    shipmentRowData !== null
      ? shipmentRowData.consigneeDetails !== null
        ? shipmentRowData.consigneeDetails.state
        : "N/A"
      : "N/A";
  const consignee_pincode =
    shipmentRowData !== null
      ? shipmentRowData.consigneeDetails !== null
        ? shipmentRowData.consigneeDetails.pincode
        : "N/A"
      : "N/A";

  const totalAmmount =
    shipmentRowData !== null
      ? shipmentRowData.orderDetails !== null
        ? shipmentRowData.orderDetails.productDetails.length > 0
          ? shipmentRowData.orderDetails.productDetails.reduce((prev, curr) => {
              return prev + curr.price * curr.quantity;
            }, 0)
          : "N/A"
        : "N/A"
      : "N/A";
  const shippingCharges =
    shipmentRowData !== null
      ? shipmentRowData.orderDetails.cod_charges +
        shipmentRowData.orderDetails.gift_wrap_charges +
        shipmentRowData.orderDetails.other_charges +
        shipmentRowData.orderDetails.shipping_charges
      : "N/A";
  const paymentMode =
    shipmentRowData !== null
      ? shipmentRowData.orderDetails.payment_mode !== ""
        ? shipmentRowData.orderDetails.payment_mode
        : "N/A"
      : "N/A";

  const weight =
    shipmentRowData !== null
      ? shipmentRowData.packageDetails.dead_weigth !== ""
        ? shipmentRowData.packageDetails.dead_weigth
        : "N/A"
      : "N/A";

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
      img_url: "/templates/ekart.png",
      min_weight: 0.5,
      weight: 2,
      day: "Tuesday",
      date: new Date(2025, 3, 15),
      amount: 2499.99,
      rto_charges: 156,
      courier: "amazon",
    },
    {
      img_url: "/templates/bluedart.webp",
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
        <div className="px-10 py-8 flex flex-col gap-10">
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
                      <div className="font-normal text-start flex flex-col gap-1">
                        <span>{`${pickup_address}`}</span>
                        <span>{`${pickup_city}, ${pickup_state},  ${pickup_pincode}`}</span>
                      </div>
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
                      <div className="font-normal text-start flex flex-col gap-1">
                        <span>{`${consignee_address}`}</span>
                        <span>{`${consignee_city}, ${consignee_state},  ${consignee_pincode}`}</span>
                      </div>
                    </div>
                  </div>
                </th>
                <th className="p-3 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-start">Order Value</span>
                    <span className="font-normal text-start">
                      ₹ {`${totalAmmount + shippingCharges}`}
                    </span>
                  </div>
                </th>
                <th className="p-3 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-start">Payment Mode</span>
                    <span className="font-normal text-start">
                      {paymentMode}
                    </span>
                  </div>
                </th>
                <th className="p-3 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-start">
                      Applicable Weight
                    </span>
                    <span className="font-normal text-start">{weight} kg</span>
                  </div>
                </th>
              </tr>
              {console.log(
                "--------",
                { pickup_pincode, consignee_pincode, weight },
                "--------"
              )}
            </thead>
          </table>
          {is_ferightrare_success && (
            <OrdersTable
              orders={recentOrders}
              isSubscribed={true}
              shipmentRowData={shipmentRowData}
              popup={popup}
              setPopup={setPopup}
              setActiveButton={setActiveButton}
              is_freight_error={is_freight_error}
            />
          )}
          {is_ferightrare_loading && <LoadingTable />}
          {is_freight_error && (
            <ErrorTable
              className="h-[400px] flex items-center justify-center bg-white flex-col gap-5"
              w={["20%"]}
              errorMessage={`${
                freight_error?.data?.errorMessage ||
                "An Internal Server Error occurs"
              }`}
            />
          )}
        </div>
        {console.log(
          is_ferightrare_loading,
          is_ferightrare_success,
          freight_rate_data,
          is_freight_error,
          freight_error
        )}
      </Drawer>
    </>
  );
};

export default AvatarDrawer;

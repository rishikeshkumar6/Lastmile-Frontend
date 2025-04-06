import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Button, Switch } from "@mui/material";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { SiHackthebox } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import OrderTrackingMap from "./OrderTraking";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import App from "./Testing";

const OrderDetail = () => {
  const [checkBoxState, setCheckBoxState] = useState("stepper");
  const [loading, setLoading] = useState(false);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <section className="flex gap-6 bg-slate-50 flex-wrap">
      <Sidebar />
      <div className="m-[auto] w-[90%] px-8 py-10 gap-5 flex flex-wrap ">
        <div className="flex justify-between w-[100%]">
          <div className="flex gap-5 items-center ">
            <FaLongArrowAltLeft className="text-[25px]" />
            <h1 className="text-[25px] font-[600]">#R19ET1CS0039</h1>
            <Button variant="contained" className="bg-green-500">
              New
            </Button>
          </div>
          <Button variant="contained">Refresh</Button>
        </div>

        <div className="w-[65%] text-[15px]">
          <div className=" bg-white shadow-sm rounded-md px-10 py-6 flex flex-col gap-6">
            <h2 className="font-[500] flex gap-5 text-[20px] items-center">
              <IoCartOutline className="text-[25px]" />
              Order Details
            </h2>
            <table className="text-left ">
              <thead>
                <tr>
                  <th className="font-[500]">Order Date</th>
                  <th className="font-[500]">Channel</th>
                  <th className="font-[500]">Pick Up</th>
                  <th className="font-[500]">Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>08 Nov 2024, 12:34:14</td>
                  <td>Shopify</td>
                  <td>681927</td>
                  <td>Prepaid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-[33%] text-[15px]">
          <div className=" bg-white shadow-sm rounded-md px-10 py-6 flex flex-col gap-6 absolute">
            <h2 className="font-[500] flex gap-5 text-[20px] items-center">
              <LocalShippingIcon className="text-[25px]" />
              Consignee Details
            </h2>
            <table className="text-left">
              <tbody>
                <tr>
                  <td>Rishikesh Kumar Singh</td>
                </tr>
                <tr>
                  <td>Contact</td>
                </tr>
                <tr>
                  <td>rishikesh.kumar@omneelab.com</td>
                </tr>
                <tr>
                  <td>6207654176</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      Arunachal Aparment, plot 16, sector 7, Dwarka, New Delhi
                      110075, New Delhi, Delhi, India
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-[65%]">
          <div className=" bg-white shadow-sm rounded-md px-10 py-6 flex flex-col gap-6">
            <h2 className="font-[500] flex gap-5 text-[20px] items-center">
              <SiHackthebox className="text-[25px]" />
              Package Details
            </h2>
            <table className="text-left">
              <thead>
                <tr>
                  <th className="font-[500]">{`Dead Weight (kg)`}</th>
                  <th className="font-[500]">{`Dimension (cm)`}</th>
                  <th className="font-[500]">{`Volumetric Weight (kg)`}</th>
                  <th className="font-[500]">{`Applicable Weight (kg)`}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{`60`}</td>
                  <td>{`60 x 60 x 80`}</td>
                  <td>57</td>
                  <td>60</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-[33%] mt-[7rem]">
          <div className=" bg-white shadow-sm rounded-md px-10 py-6 flex flex-col gap-6 absolute ">
            <h2 className="font-[500] flex gap-5 text-[20px] items-center">
              <LocalShippingIcon className="text-[25px]" />
              Pickup Details
            </h2>
            <table className="text-left">
              <tbody>
                <tr>
                  <td>Rishikesh Kumar Singh</td>
                </tr>
                <tr>
                  <td>Contact</td>
                </tr>
                <tr>
                  <td>rishikesh.kumar@omneelab.com</td>
                </tr>
                <tr>
                  <td>6207654176</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      Arunachal Aparment, plot 16, sector 7, Dwarka, New Delhi
                      110075, New Delhi, Delhi, India
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-[65%] text-[15px]">
          <div className=" bg-white shadow-sm rounded-md px-10 py-6 flex flex-col gap-6">
            <h2 className="font-[500] flex gap-5 text-[20px] items-center">
              <SiHackthebox className="text-[25px]" />
              Product Information
            </h2>
            <table className="text-left">
              <thead>
                <tr>
                  <th className="font-[500] py-2 px-36">{`Name`}</th>
                  <th className="font-[500] p-2">{`Sku Code`}</th>
                  <th className="font-[500] p-2">{`quantity`}</th>
                  <th className="font-[500] p-2">{`Until Price`}</th>
                  <th className="font-[500] p-2">{`Ammount`}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="borderBottom">
                  <td className="py-6 w-[28%] px-3">{`Apollon Nutrition Multi- Premium Multi Vitamin and Mineral | Stress Management with KSM-66 | Glucose Control with Phlorizin | Antioxidant Support with Spectrafor | Enhanced Skin Hydration and Heart Health with CoQ-10`}</td>
                  <td className="px-3">{`sku1`}</td>
                  <td className="px-3">20</td>
                  <td className="px-3">60000</td>
                  <td className="px-3">600000</td>
                </tr>
                <tr className="borderBottom">
                  <td className="py-6 px-3 w-[28%]">{`Per4M Whey Isolate Zero | 26gms Protein | Grass fed from Europe | 66 servings - Red Velvet Cake`}</td>
                  <td className="px-3">{`sku1`}</td>
                  <td className="px-3">20</td>
                  <td className="px-3">60000</td>
                  <td className="px-3">600000</td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-end p-5 flex-col gap-y-5 ">
              <div className="flex items-center justify-between w-[30%]">
                <span>{`Order Total  (2 Items)`}</span>
                <span>{`12000000`}</span>
              </div>
              <div className="flex items-center justify-between w-[30%] font-bold">
                <span>{`Total`}</span>
                <span>{`12000000`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-[90%] m-[auto] pl-12 text-xl font-medium">
        {" "}
        <div className="flex items-center gap-3">
          <FaLocationDot />
          <span className="pb-1">Switch Location</span>
        </div>
        <span className="font-normal text-[15px] flex gap-2 items-center">
          Track With Gps
          <Switch
            {...label}
            checked={checkBoxState === "stepper" ? true : false}
            onClick={() =>
              setCheckBoxState(checkBoxState === "stepper" ? "gps" : "stepper")
            }
          />
          Track With Stepper
        </span>
      </div>
      {checkBoxState === "stepper" ? (
        <div className="w-[90%] m-[auto] text-xl font-[500]">
          <div className="bg-white shadow-sm rounded-md px-10 py-6">
            Tracking Information
          </div>
          <App />
        </div>
      ) : (
        <div className="w-[100%] m-[auto] lg:w-[90%] lg:m-[auto] lg:pl-10 lg:py-10">
          <div className="bg-white shadow-sm rounded-md ">
            <OrderTrackingMap />
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetail;

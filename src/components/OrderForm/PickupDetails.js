import { Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { MdOutlineLocalPhone } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import {
  useUpdateOrderMutation,
  useGetAllPickupFormQuery,
} from "../../Redux/Action";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import Drawers from "./PickupDrawer";
import ErrorTable from "../userDashboardComponents/ErrorTable";

const PickupDetails = ({ Loading, Success, Error, Data, Errors, slug, id }) => {
  const [open, setOpen] = useState(false);
  const {
    isLoading: pickup_loading,
    isSuccess: pickup_success,
    isError: pickup_isError,
    error: pickup_error,
    data: pickup_data,
  } = useGetAllPickupFormQuery();
  const [pickupData, setPickupData] = useState(null);

  useEffect(() => {
    if (pickup_success === true) setPickupData(pickup_data);
  }, [pickup_data]);
  const [pickupFormPayload, setPickupFormPayload] = useState(null);
  const [ID, setId] = useState(0);
  const navigate = useNavigate();
  const [pickupDetailsForm, setPickupDetailsForm] = useState(null);
  const [overflowStates, setOverflowStates] = useState([]);

  const cardRefs = useRef([]);
  const [updateOrder, { isLoading, isSuccess, isError, data, error }] =
    useUpdateOrderMutation();

  useEffect(() => {
    // Check overflow for each card
    const checkOverflow = () => {
      console.log("useRef", cardRefs);
      const states = cardRefs.current.map((ref) => {
        if (ref) {
          return ref.scrollHeight > ref.clientHeight;
        }
        return false;
      });
      setOverflowStates(states);
    };

    checkOverflow();
  }, [pickupDetailsForm]);

  useEffect(() => {
    if (
      isSuccess === true &&
      Object.keys(data.orderRes).length > 0 &&
      data.orderRes.statusCode === 200
    ) {
      navigate(`/order/ordercreate/${id}/package-details`);
    }
  }, [data]);

  useEffect(() => {
    if (
      pickup_success === true &&
      Object.keys(pickup_data).length > 0 &&
      pickup_data.pickupResponse.length > 0
    ) {
      const { pickup_location_code } = pickup_data.pickupResponse[0];
      const { pickupResponse } = pickup_data;
      const response = pickupResponse.filter((elem) => elem.isActive === true);
      console.log("----------response pickup records data-------", response);
      setPickupFormPayload(response[0]);
      console.log("pickup data", pickup_data);
      setId(pickup_location_code);
    }
  }, [pickup_data]);

  const handleCLick = (ID, elem, data) => {
    const obj = JSON.parse(JSON.stringify(data));
    obj.pickupResponse.forEach((item) => {
      item.isActive = item.pickup_location_code === ID;
    });
    setPickupData(obj);

    setId(ID);
    console.log("---------", slug, id, "---------");
    if (slug !== undefined && id !== undefined) {
      const newElem = { ...elem };

      setPickupFormPayload(newElem);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pickupFormPayload !== null) {
      const editPayload = { ...pickupFormPayload };
      editPayload["id"] = id;
      editPayload["slug"] = slug;
      console.log("---------pickup location payload-------", pickupFormPayload);
      updateOrder(editPayload);
    }
  };
  return (
    <>
      <Drawers open={open} setOpen={setOpen} />
      <div className="w-[82%] m-[auto] flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            Pickup Address
            <span className="text-sm font-normal text-gray-400">
              Where your order is being sent from ?
            </span>
          </div>
          <button
            variant="contained"
            className="text-sm  px-2 font-normal py-3 w-[20%] rounded-sm  cursor-pointer flex gap-2 items-center justify-center bg-slate-900  text-white"
            onClick={() => setOpen(!open)}
          >
            <FiPlus /> Add Pickup Location
          </button>
        </div>
        <div className="flex flex-wrap gap-5">
          {pickupData !== null &&
          Object.keys(pickup_data).length > 0 &&
          pickupData.pickupResponse.length > 0 ? (
            pickupData.pickupResponse.map((elem, index) => (
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className={`border rounded-md px-8 py-6 w-[30%] flex flex-col gap-2  overflow-hidden relative box-border cursor-pointer  ${
                  elem.isActive === true ? "border-green-500" : ""
                }`}
                key={index}
                onClick={() =>
                  handleCLick(elem.pickup_location_code, elem, pickupData)
                }
              >
                <h1 className="font-[500]">{elem.pickup_location_name}</h1>
                <span className="text-sm font-normal ">{`${elem.pickup_city}, ${elem.pickup_state}`}</span>
                <span className="text-sm font-normal ">{`${elem.pickup_address}`}</span>
                <div className="text-sm font-[400] flex flex-col gap-2 ">
                  <span className="flex gap-2 items-center">
                    <CgMail className="text-[15px]" />
                    {elem.pickup_person_email}
                  </span>
                </div>
                <div className="text-sm font-[400] flex flex-col gap-2 ">
                  <span className="flex gap-2 items-center">
                    <MdOutlineLocalPhone className="text-[15px]" />
                    {elem.pickup_person_phone}
                  </span>
                </div>
                {/* Conditionally render See More */}
                {overflowStates[index] && (
                  <button
                    className="absolute bottom-2 right-2 text-gray-500 text-sm"
                    onClick={() =>
                      alert(`Show full content for card ${index + 1}`)
                    }
                  >
                    .....See More
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="m-[auto]">
              <ErrorTable
                className="h-[400px] flex items-center justify-center bg-white flex-col gap-5"
                w={["50%"]}
                errorMessage={"No Pickup Found"}
              />
            </div>
          )}
        </div>
        <div className="w-[100%] flex justify-end gap-5 py-16">
          <Button
            variant="outlined"
            className="flex gap-2"
            type="submit"
            onClick={() => {
              navigate(`/order/ordercreate/${id}/order-details`);
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            className="flex gap-2"
            onClick={handleSubmit}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default PickupDetails;

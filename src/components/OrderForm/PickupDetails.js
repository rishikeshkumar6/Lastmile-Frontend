import { Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { MdOutlineLocalPhone } from "react-icons/md";
import { useUpdateOrderMutation } from "../../Redux/Action";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import Drawers from "./PickupDrawer";

const PickupDetails = ({ Loading, Success, Error, Data, Errors, slug, id }) => {
  const [open, setOpen] = useState(false);
  const [pickupFormPayload, setPickupFormPayload] = useState({
    pickup_location_name: "Rishikesh Kumar Singh",
    pickup_person_name: "Rishikesh Kumar Singh",
    pickup_person_phone: 6207654176,
    pickup_person_email: "rishu@gmail.com",
    pickup_alternate_phone: "",
    pickup_address:
      "Sector 6 Road, 3rd Floor, Plot No. 10, LSC-02, Sector 06, Dwarka, Delhi 110075, IN",
    pickup_landmark: "NEAR HDFC BANK",
    pickup_pincode: 110075,
    pickup_city: "NEW DELHI",
    pickup_state: "DELHI",
    pickup_country: "India",
    pickup_location_type: "warehouse",
    pikcup_location_code: "0029",
    slug: slug,
    id: id,
  });
  const [ID, setId] = useState(0);
  const navigate = useNavigate();
  const [pickupDetailsForm, setPickupDetailsForm] = useState([
    {
      pickup_location_name: "Rishikesh Kumar Singh",
      pickup_person_name: "Rishikesh Kumar Singh",
      pickup_person_phone: 6207654176,
      pickup_person_email: "rishu@gmail.com",
      pickup_alternate_phone: "",
      pickup_address:
        "Sector 6 Road, 3rd Floor, Plot No. 10, LSC-02, Sector 06, Dwarka, Delhi 110075, IN",
      pickup_landmark: "NEAR HDFC BANK",
      pickup_pincode: 110075,
      pickup_city: "NEW DELHI",
      pickup_state: "DELHI",
      pickup_country: "India",
      pickup_location_type: "warehouse",
      pikcup_location_code: "0029",
    },
    {
      pickup_location_name: "Rishikesh Kumar Singh",
      pickup_person_name: "Rishikesh Kumar Singh",
      pickup_person_phone: 6207654176,
      pickup_person_email: "rishu@gmail.com",
      pickup_alternate_phone: "",
      pickup_address:
        "Sector 6 Road, 3rd Floor, Plot No. 10, LSC-02, Sector 06, Dwarka, Delhi 110075, IN",
      pickup_landmark: "NEAR HDFC BANK",
      pickup_pincode: 110075,
      pickup_city: "NEW DELHI",
      pickup_state: "DELHI",
      pickup_country: "India",
      pickup_location_type: "warehouse",
      pikcup_location_code: "0029",
    },
  ]);
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

  const handleCLick = (index, elem) => {
    setId(index);
    if (slug !== undefined && id !== undefined) {
      const newElem = { ...elem };
      newElem["id"] = id;
      newElem["slug"] = slug;
      setPickupFormPayload(newElem);
      alert(JSON.stringify(newElem, null, 2));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pickupFormPayload !== null) {
      updateOrder(pickupFormPayload);
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
          <Button
            variant="contained"
            className="flex gap-2 items-center"
            onClick={() => setOpen(!open)}
          >
            <FiPlus /> Add Pickup Location
          </Button>
        </div>
        <div className="flex flex-wrap gap-5">
          {Object.keys(pickupDetailsForm).length > 0 &&
            pickupDetailsForm.map((elem, index) => (
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className={`border rounded-md px-8 py-6 w-[30%] flex flex-col gap-2  overflow-hidden relative box-border cursor-pointer ${
                  index === ID ? "border-green-500" : ""
                }`}
                key={index}
                onClick={() => handleCLick(index, elem)}
              >
                <h1 className="font-[500]">{elem.pickup_person_name}</h1>
                <span className="text-sm font-normal ">
                  {elem.pickup_address}
                </span>
                <span className="text-sm font-normal ">{elem.pickup_city}</span>
                <div className="text-sm font-[400] flex flex-col gap-2 ">
                  <span className="flex gap-2 items-center">
                    <HiOutlineMail className="text-[15px]" />
                    {elem.pickup_person_email}
                  </span>
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
            ))}
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
        {console.log("rtk query", isLoading, isSuccess, isError, data, error)}
      </div>
    </>
  );
};

export default PickupDetails;

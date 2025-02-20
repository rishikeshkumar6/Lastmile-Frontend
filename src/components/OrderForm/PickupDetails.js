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
  const [pickupFormPayload, setPickupFormPayload] = useState(null);
  const [ID, setId] = useState(0);
  const navigate = useNavigate();
  const [pickupDetailsForm, setPickupDetailsForm] = useState([
    {
      location_name: "Rishikesh Kumar Singh",
      contact_person_name: "Rishikesh Kumar Singh",
      contact_person_phone: 6207654176,
      contact_person_email: "rishu@gmail.com",
      alternate_phone: "",
      address:
        "Sector 6 Road, 3rd Floor, Plot No. 10, LSC-02, Sector 06, Dwarka, Delhi 110075, IN",
      landmark: "NEAR HDFC BANK",
      pincode: 110075,
      city: "NEW DELHI",
      state: "DELHI",
      country: "India",
      location_type: "warehouse",
      location_code: "0029",
      active: true,
      is_default: false,
    },
    {
      location_name: "Test Location1",
      contact_person_name: "Ankit",
      contact_person_phone: 4133243231,
      contact_person_email: "prabhaker@123gmai.com",
      alternate_phone: "",
      address: "dwarka sector 7",
      landmark: "",
      pincode: 122003,
      city: "GURGAON",
      state: "HARYANA",
      country: "India",
      location_type: "warehouse",
      location_code: "0047",
      active: true,
      is_default: true,
    },
    {
      location_name: "Testing",
      contact_person_name: "Rishikesh Kumar Singh",
      contact_person_phone: 1234567890,
      contact_person_email: "rishikeshkumarsingh810@gmail.com",
      alternate_phone: "",
      address: "123 Main Street Suite 456 Springfield, IL 62701 United States",
      landmark: "NEAR HDFC BANK",
      pincode: 813221,
      city: "KHARAGPUR - BH",
      state: "BIHAR",
      country: "India",
      location_type: "warehouse",
      location_code: "0061",
      active: true,
      is_default: false,
    },
    {
      location_name: "Test Location Moksh",
      contact_person_name: "Moksh",
      contact_person_phone: 9871178775,
      contact_person_email: "moksh.jaswal1@gmail.com",
      alternate_phone: "",
      address: "141, Arunachal apartment, plot 16, sector 7, dwarka, new delhi",
      landmark: "",
      pincode: 110075,
      city: "new delhi",
      state: "delhi",
      country: "India",
      location_type: "warehouse",
      location_code: "0063",
      active: true,
      is_default: false,
    },
    {
      location_name: "test loc 2 ",
      contact_person_name: "Ankit Prabhaker",
      contact_person_phone: 9876546788,
      contact_person_email: "testloc2@gmail.com",
      alternate_phone: "",
      address: "B16 Bhagwati Garden Ext. Part 3",
      landmark: "",
      pincode: 110059,
      city: "NEW DELHI",
      state: "DELHI",
      country: "India",
      location_type: "warehouse",
      location_code: "0072",
      active: true,
      is_default: false,
    },
    {
      location_name: "test loc 3",
      contact_person_name: "test 3",
      contact_person_phone: 9876545565,
      contact_person_email: "ankitprabhaker9650@gmail.com",
      alternate_phone: "",
      address: "B-16 GALI NO.4 BHAGWATI GARDEN EXTN. UTTAM NAGAR",
      landmark: "",
      pincode: 110059,
      city: "NEW DELHI",
      state: "DELHI",
      country: "India",
      location_type: "warehouse",
      location_code: "0073",
      active: true,
      is_default: false,
    },
    {
      location_name: "Test loc 3 ",
      contact_person_name: "Ankit Prabhaker",
      contact_person_phone: 4353453452,
      contact_person_email: "ankitprabhaker9650@gmail.com",
      alternate_phone: "",
      address:
        "B16 Bhagwati Garden Ext. Part 3B16 Bhagwati wati Garden Ext. Part 3B16 Bhagwati Garden Ext. Part 3B16 Bhagwati Garden Ext. Part 3B16 Bhagwati Garden Ext. Part 3B16 Bhagwati Garden Ext. Part 3B16 Bhagwati Garden Ext. Part 3",
      landmark: "",
      pincode: 110059,
      city: "New Delhi",
      state: "Delhi",
      country: "India",
      location_type: "warehouse",
      location_code: "0075",
      active: true,
      is_default: false,
    },
    {
      location_name: "Rishikesh Kumar ",
      contact_person_name: "Rishikesh Kumar Singh",
      contact_person_phone: 6207654176,
      contact_person_email: "rishu@gmail.com",
      alternate_phone: "",
      address:
        "Sector 6 Road, 3rd Floor, Plot No. 10, LSC-02, Sector 06, Dwarka, Delhi 110075, IN",
      landmark: "NEAR HDFC BANK",
      pincode: 110075,
      city: "NEW DELHI",
      state: "DELHI",
      country: "India",
      location_type: "warehouse",
      location_code: "0076",
      active: true,
      is_default: false,
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
                <h1 className="font-[500]">{elem.contact_person_name}</h1>
                <span className="text-sm font-normal ">{elem.address}</span>
                <span className="text-sm font-normal ">{elem.city}</span>
                <div className="text-sm font-[400] flex flex-col gap-2 ">
                  <span className="flex gap-2 items-center">
                    <HiOutlineMail className="text-[15px]" />
                    {elem.contact_person_email}
                  </span>
                  <span className="flex gap-2 items-center">
                    <MdOutlineLocalPhone className="text-[15px]" />
                    {elem.contact_person_phone}
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

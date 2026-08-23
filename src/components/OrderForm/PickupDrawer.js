import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@mui/material";
import {
  usePickupCreateMutation,
  useUpdatePickupMutation,
} from "../../Redux/Action";

import { MdMyLocation } from "react-icons/md";
import * as Yup from "yup";
// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import PickupAutoFillFromPincode from "./PickupAutoFillPincode";
import { toast } from "react-toastify";

const Drawers = ({ open, setOpen, pickupData, editMode }) => {
  const [edit, setEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pickupCreate, { isLoading, isError, isSuccess, data, error }] =
    usePickupCreateMutation();
  const [
    updatePickup,
    {
      isLoading: ispickup_loading,
      isSuccess: ispickup_success,
      data: pickup_data,
      isError: ispickup_error,
      error: pickup_error,
    },
  ] = useUpdatePickupMutation();
  const [activeButton, setActiveButton] = useState("home");
  const [pickupForm, setConsigneeForm] = useState({
    isOtherField: false,
    pickup_location_name: "",
    pickup_person_name: "",
    pickup_person_phone: "",
    pickup_person_email: "",
    pickup_address: "",
    pickup_landmark: "",
    pickup_country: "India",
    pickup_state: "",
    pickup_city: "",
    pickup_pincode: "",
    isActive: false,
  });
  const [activeButtons, setActiveButtons] = useState("home");
  const handleActiveButton = (status) => {
    switch (status) {
      case "new":
        return setActiveButton("new");
      case "booked":
        return setActiveButton("booked");
      case "Pickup/Mainfest":
        return setActiveButton("Pickup/Mainfest");
      case "In Transit":
        return setActiveButton("In Transit");
      case "Out For Deleivery":
        return setActiveButton("Out For Deleivery");
      case "Deleivered":
        return setActiveButton("Deleivered");
      case "Return To Origin":
        return setActiveButton("Return To Origin");
      case "Non Deleivery Report":
        return setActiveButton("Non Deleivery Report");
      case "Cancel Order":
        return setActiveButton("Cancel Order");
      case "supicious_order":
        return setActiveButton("supicious_order");
      case "All Orders":
        return setActiveButton("All Orders");
    }
  };
  const pickupFormSchema = Yup.object().shape({
    pickup_person_name: Yup.string()
      .matches(
        /^[a-zA-Z\s]+$/,
        "full name can only contain alphabetic characters"
      )
      .required("full name is required"),
    pickup_person_phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("phonenumber is required"),
    pickup_person_email: Yup.string()
      .email("invalid email")
      .required("email is required"),
    pickup_address: Yup.string().required("full address name is required"),
    pickup_landmark: Yup.string().required("landmark is required"),
    pickup_pincode: Yup.string().required("pincode is required"),
    pickup_country: Yup.string()
      .matches(
        /^[a-zA-Z\s]+$/,
        "country can only contain alphabetic characters"
      )
      .required("country is required"),
    pickup_state: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "state can only contain alphabetic characters")
      .required("state is required"),
    pickup_city: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "city can only contain alphabetic characters")
      .required("city is required"),
    isOtherField: Yup.boolean().required(),
    pickup_location_name: Yup.string().when("isOtherField", {
      is: true,
      then: (schema) => schema.required("location name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const getLocation = async (setFieldValue) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    try {
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      const { latitude, longitude } = position.coords;
      console.log("Latitude:", latitude, "Longitude:", longitude);

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GEO_CODE_API_KEY}`
      );
      const data = await response.json();

      if (data.status !== "OK" || !data.results.length) {
        console.warn("Failed to fetch address from coordinates.");
        return;
      }

      const addressComponents = data.results[0].address_components;
      const getComponent = (type) =>
        addressComponents.find((comp) => comp.types.includes(type))
          ?.long_name || "";

      const fullAddress = data.results[0].formatted_address;
      const pincode = getComponent("postal_code");
      const state = getComponent("administrative_area_level_1");
      const city =
        getComponent("administrative_area_level_3") ||
        getComponent("administrative_area_level_2") || // fallback
        getComponent("locality");

      setFieldValue("pickup_address", fullAddress);
      setFieldValue("pickup_pincode", pincode);
      setFieldValue("pickup_state", state);
      setFieldValue("pickup_city", city);

      console.log("Address:", { fullAddress, pincode, state, city });
    } catch (error) {
      console.error("Geolocation or API error:", error);
      alert("Failed to fetch location. Please try again.");
    }
  };

  useEffect(() => {
    if (isSuccess === true && data.statusCode === 200) {
      toast.success(data.message, { autoClose: "2000" });
      setOpen(!open);
    }
    if (isError === true) {
      console.log("errorresponse", error);
      toast.error(error.data["errorMessage"], { autoClose: "2000" });
      setOpen(!open);
    }
    if (ispickup_success === true && pickup_data.statusCode === 200) {
      toast.success(pickup_data.message, { autoClose: "2000" });
      setOpen(!open);
    }
    if (ispickup_error === true) {
      toast.error(pickup_error["errorMessage"], { autoClose: "2000" });
      setOpen(!open);
    }
  }, [data, error, pickup_data, pickup_error]);

  useEffect(() => {
    if (pickupData) {
      setConsigneeForm(pickupData);
      setEdit(editMode);
    }
  }, [pickupData]);

  return (
    <>
      <Drawer
        open={open}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla"
        style={{ width: "70vw" }}
      >
        <Formik
          enableReinitialize={true}
          initialValues={pickupForm}
          validationSchema={pickupFormSchema}
          onSubmit={(fields) => {
            console.log("edit", edit);
            if (!edit) {
              pickupCreate(fields);
            }
            if (edit) {
              updatePickup(fields);
            }
            console.log(fields);
          }}
          render={({
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
          }) => {
            console.log("values", values);
            console.log("pickupData", pickupData);
            const manageLocation = (params) => {
              if (params === "isOtherField") {
                setFieldValue("isOtherField", true);
                setActiveButton("isOtherField");
                return;
              }
              setFieldValue("pickup_location_name", params);
              setFieldValue("isOtherField", false);
              switch (params) {
                case "home":
                  return setActiveButton("home");
                case "worked":
                  return setActiveButton("worked");
                case "warehouse":
                  return setActiveButton("warehouse");
              }
            };
            return (
              <Form>
                <>
                  <PickupAutoFillFromPincode />
                  <div className="px-10 py-8 flex flex-col gap-y-10 content-between">
                    <span className="text-xl">Add New Pickup Location</span>
                    <div className="flex flex-col gap-5">
                      <span className="text-sm font-medium">
                        Location Type (What is the type of your pickup address)
                      </span>
                      <ul class="flex flex-wrap items-center text-sm gap-5 text-center  text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 pb-5">
                        <button
                          className={`text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
                            activeButton === "home" ? "bg-black text-white" : ""
                          }`}
                          onClick={() => manageLocation("home")}
                          type="button"
                        >
                          Home
                        </button>
                        <button
                          className={`text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
                            activeButton === "worked"
                              ? "bg-black text-white"
                              : ""
                          }`}
                          onClick={() => manageLocation("worked")}
                          type="button"
                        >
                          Worked
                        </button>
                        <button
                          className={`text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
                            activeButton === "warehouse"
                              ? "bg-black text-white"
                              : ""
                          }`}
                          onClick={() => manageLocation("warehouse")}
                          type="button"
                        >
                          Warehouse
                        </button>
                        <button
                          className={`text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
                            activeButton === "isOtherField"
                              ? "bg-black text-white"
                              : ""
                          }`}
                          onClick={() => manageLocation("isOtherField")}
                          type="button"
                        >
                          Other
                        </button>
                        {values.isOtherField && (
                          <div className="flex flex-col w-[30%] ">
                            <Field
                              name="pickup_location_name"
                              className={` px-3 py-1 text-[0.875rem] ${
                                touched.pickup_location_name &&
                                errors.pickup_location_name
                                  ? "customInputBorderError"
                                  : "customInputBorder"
                              }`}
                              placeholder="Enter location name"
                            />
                            <ErrorMessage
                              name="pickup_location_name"
                              component="div"
                              className="text-red-600 text-[14px] text-start"
                            />
                          </div>
                        )}
                      </ul>
                    </div>
                    <div className="text-[15px] font-normal flex flex-wrap gap-x-12	gap-y-5">
                      <div className="w-full ">
                        <span className="text-sm font-medium">
                          {" "}
                          Contact Person Information ( Person of contact for the
                          pickup location )
                        </span>
                      </div>
                      <div className="flex flex-col w-[30%] ">
                        Full Name*
                        <Field
                          name="pickup_person_name"
                          className={` px-3 py-1 text-[0.875rem] ${
                            touched.pickup_person_name &&
                            errors.pickup_person_name
                              ? "customInputBorderError"
                              : "customInputBorder"
                          }`}
                          placeholder="Enter Consignee Full Name"
                        />
                        <ErrorMessage
                          name="pickup_person_name"
                          component="div"
                          className="text-red-600 text-[14px] "
                        />
                      </div>
                      <div className="flex flex-col w-[30%]">
                        Phone Number*
                        <Field
                          type="number"
                          name="pickup_person_phone"
                          className={` px-3 py-1 text-[0.875rem] ${
                            touched.pickup_person_phone &&
                            errors.pickup_person_phone
                              ? "customInputBorderError"
                              : "customInputBorder"
                          }`}
                          placeholder="Enter Consignee Phone Number"
                        />
                        <ErrorMessage
                          name="pickup_person_phone"
                          component="div"
                          className="text-red-600"
                        />
                      </div>

                      <div className="flex flex-col w-[30%]">
                        Email*
                        <Field
                          type="email"
                          name="pickup_person_email"
                          className={` px-3 py-1 text-[0.875rem] ${
                            touched.pickup_person_email &&
                            errors.pickup_person_email
                              ? "customInputBorderError"
                              : "customInputBorder"
                          }`}
                          placeholder="Enter Consignee Email Address"
                        />
                        <ErrorMessage
                          name="pickup_person_email"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>
                    <div className="text-[15px] font-normal flex flex-wrap gap-x-12 gap-y-5">
                      <div className="w-full flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {" "}
                          Pickup Location Details ( Where will the orders be
                          picked up from? )
                        </span>
                        <span
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => getLocation(setFieldValue, values)}
                        >
                          <MdMyLocation className="mt-1" /> use current location
                        </span>
                      </div>
                      <div className="flex flex-col w-[46%]">
                        Full Address*
                        <Field
                          name="pickup_address"
                          className={` px-3 py-1 text-[0.875rem] ${
                            touched.pickup_address && errors.pickup_address
                              ? "customInputBorderError"
                              : "customInputBorder"
                          }`}
                          placeholder="Enter Consignee Full Address"
                        />
                        <ErrorMessage
                          name="pickup_address"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                      <div className="flex flex-col w-[46%]">
                        Landmark*
                        <Field
                          name="pickup_landmark"
                          className={` px-3 py-1 text-[0.875rem] ${
                            touched.pickup_landmark && errors.pickup_landmark
                              ? "customInputBorderError"
                              : "customInputBorder"
                          }`}
                          placeholder="Enter Consignee Landmark"
                        />
                        <ErrorMessage
                          name="pickup_landmark"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                      <div className="flex flex-col w-[30%]">
                        Pincode*
                        <Field
                          name="pickup_pincode"
                          className={` px-3 py-1 text-[0.875rem] ${
                            touched.pickup_pincode && errors.pickup_pincode
                              ? "customInputBorderError"
                              : "customInputBorder"
                          }`}
                          placeholder="Enter Consignee Pincode"
                        />
                        <ErrorMessage
                          name="pickup_pincode"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                      <div className="flex flex-col w-[30%]">
                        City*
                        <Field
                          name="pickup_city"
                          className={` px-3 py-1 text-[0.875rem] ${
                            touched.pickup_city && errors.pickup_city
                              ? "customInputBorderError"
                              : "customInputBorder"
                          }`}
                          placeholder="Enter Consignee City"
                        />
                        <ErrorMessage
                          name="pickup_city"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                      <div className="flex flex-col w-[30%]">
                        State*
                        <Field
                          name="pickup_state"
                          className={` px-3 py-1 text-[0.875rem] ${
                            touched.pickup_state && errors.pickup_state
                              ? "customInputBorderError"
                              : "customInputBorder"
                          }`}
                          placeholder="Enter Consignee State"
                        />
                        <ErrorMessage
                          name="pickup_state"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                      <div className="flex flex-col w-[30%]">
                        Country*
                        <Field
                          name="pickup_country"
                          className={` px-3 py-1 text-[0.875rem] ${
                            touched.pickup_country && errors.pickup_country
                              ? "customInputBorderError"
                              : "customInputBorder"
                          }`}
                          placeholder="Enter Consignee Country"
                        />
                        <ErrorMessage
                          name="pickup_country"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end  gap-5">
                      <Button
                        variant="outlined"
                        className="flex gap-2"
                        type="submit"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        className="flex gap-2"
                        type="submit"
                      >
                        Save and Create
                      </Button>
                    </div>
                  </div>
                </>
              </Form>
            );
          }}
        />
      </Drawer>
    </>
  );
};

export default Drawers;

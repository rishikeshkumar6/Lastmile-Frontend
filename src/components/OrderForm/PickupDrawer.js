import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@mui/material";
import * as Yup from "yup";
// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";

const Drawers = ({ open, setOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pickupForm, setConsigneeForm] = useState({
    fullname: "",
    phonenumber: "",
    email: "",
    fulladdress: "",
    landmark: "",
    country: "India",
    state: "",
    city: "",
    pincode: "",
  });
  const pickupFormSchema = Yup.object().shape({
    fullname: Yup.string().required("full name is required"),
    phonenumber: Yup.string().required("full name is required"),
    email: Yup.string().required("full name is required"),
    fulladdress: Yup.string().required("full name is required"),
    landmark: Yup.string().required("full name is required"),
    pincode: Yup.string().required("full name is required"),
  });
  const toggleDrawer = () => {
    setOpen(!open);
  };

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
            alert(JSON.stringify(fields));
            console.log(fields);
          }}
          render={({
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
          }) => {
            return (
              <Form>
                <div className="px-10 py-8 flex flex-col gap-y-10 content-between">
                  <span className="text-2xl">Add New Pickup Location</span>
                  <div className="text-[15px] font-normal flex flex-wrap gap-x-12	gap-y-5">
                    <div className="text-xl w-full ">
                      Contact Person Information ( Person of contact for the
                      pickup location )
                    </div>
                    <div className="flex flex-col w-[30%] relative">
                      Full Name*
                      <Field
                        name="fullname"
                        className={` px-3 py-1 text-[0.875rem] ${
                          touched.fullname && errors.fullname
                            ? "customInputBorderError"
                            : "customInputBorder"
                        }`}
                        placeholder="Enter Consignee Full Name"
                      />
                      <ErrorMessage
                        name="fullname"
                        component="div"
                        className="text-red-600 text-[14px] absolute bottom-[-20px]"
                      />
                    </div>
                    <div className="flex flex-col w-[30%]">
                      Phone Number*
                      <Field
                        type="number"
                        name="phonenumber"
                        className={` px-3 py-1 text-[0.875rem] ${
                          touched.phonenumber && errors.phonenumber
                            ? "customInputBorderError"
                            : "customInputBorder"
                        }`}
                        placeholder="Enter Consignee Phone Number"
                      />
                      <ErrorMessage
                        name="phonenumber"
                        component="div"
                        className="text-red-600"
                      />
                    </div>

                    <div className="flex flex-col w-[30%]">
                      Email*
                      <Field
                        type="email"
                        name="email"
                        className={` px-3 py-1 text-[0.875rem] ${
                          touched.email && errors.email
                            ? "customInputBorderError"
                            : "customInputBorder"
                        }`}
                        placeholder="Enter Consignee Email Address"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-600"
                      />
                    </div>
                  </div>
                  <div className="text-[15px] font-normal flex flex-wrap gap-x-12 gap-y-5">
                    <div className="text-xl w-full">
                      Pickup Location Details ( Where will the orders be picked
                      up from? )
                    </div>
                    <div className="flex flex-col w-[46%]">
                      Full Address*
                      <Field
                        name="fulladdress"
                        className={` px-3 py-1 text-[0.875rem] ${
                          touched.fulladdress && errors.fulladdress
                            ? "customInputBorderError"
                            : "customInputBorder"
                        }`}
                        placeholder="Enter Consignee Full Address"
                      />
                      <ErrorMessage
                        name="fulladdress"
                        component="div"
                        className="text-red-600"
                      />
                    </div>
                    <div className="flex flex-col w-[46%]">
                      Landmark*
                      <Field
                        name="landmark"
                        className={` px-3 py-1 text-[0.875rem] ${
                          touched.landmark && errors.landmark
                            ? "customInputBorderError"
                            : "customInputBorder"
                        }`}
                        placeholder="Enter Consignee Landmark"
                      />
                      <ErrorMessage
                        name="landmark"
                        component="div"
                        className="text-red-600"
                      />
                    </div>
                    <div className="flex flex-col w-[30%]">
                      Pincode*
                      <Field
                        name="pincode"
                        className={` px-3 py-1 text-[0.875rem] ${
                          touched.pincode && errors.pincode
                            ? "customInputBorderError"
                            : "customInputBorder"
                        }`}
                        placeholder="Enter Consignee Pincode"
                      />
                      <ErrorMessage
                        name="pincode"
                        component="div"
                        className="text-red-600"
                      />
                    </div>
                    <div className="flex flex-col w-[30%]">
                      City
                      <Field
                        name="city"
                        className="customInputBorder px-3  py-1 text-[0.875rem]"
                        placeholder="Enter Consignee City"
                      />
                    </div>
                    <div className="flex flex-col w-[30%]">
                      State
                      <Field
                        name="state"
                        className="customInputBorder px-3  py-1 text-[0.875rem]"
                        placeholder="Enter Consignee State"
                      />
                    </div>
                    <div className="flex flex-col w-[30%]">
                      Country
                      <Field
                        name="country"
                        className="customInputBorder px-3  py-1 text-[0.875rem]"
                        placeholder="Enter Consignee Country"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end py-16 gap-5">
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
              </Form>
            );
          }}
        />
      </Drawer>
    </>
  );
};

export default Drawers;

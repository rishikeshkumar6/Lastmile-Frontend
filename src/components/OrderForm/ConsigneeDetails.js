import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../Redux/Action";
import { useUpdateOrderMutation } from "../../Redux/Action";
import Button from "@mui/material/Button";
import AutoFillFromPincode from "./AutoFillFromPincode";
import { toast } from "react-toastify";

const ConsigneeDetails = ({
  Loading,
  Success,
  Error,
  Data,
  Errors,
  slug,
  id,
}) => {
  console.log("slug and id", slug, id);
  const navigate = useNavigate();
  const [
    createOrder,
    {
      isLoading: isCreatingLoading,
      isSuccess: isCreatingSuccess,
      isError: isCreatingError,
      data: createData,
      error: createError,
    },
  ] = useCreateOrderMutation();
  const [updateOrder, { isLoading, isSuccess, isError, data, error }] =
    useUpdateOrderMutation();
  const [consigneeForm, setConsigneeForm] = useState({
    fullname: "",
    phonenumber: "",
    alternatephonenumber: "",
    consigneecompany: "",
    gstin: "",
    email: "",
    fulladdress: "",
    landmark: "",
    country: "India",
    state: "",
    city: "",
    pincode: "",
    billing_is_same_as_consignee: true,
    billing_full_name: "",
    billing_phone: "",
    billing_email: "",
    billing_address: "",
    billing_landmark: "",
    billing_pincode: "",
    billing_city: "",
    billing_state: "",
    billing_country: "",
  });

  useEffect(() => {
    if (Success === true && Object.keys(Data).length > 0) {
      setConsigneeForm(Data.orderRes.consigneeDetails);
    }
  }, [Data]);

  useEffect(() => {
    if (
      isCreatingSuccess === true &&
      Object.keys(createData.orderRes).length > 0 &&
      createData.orderRes.statusCode === 200
    ) {
      console.log(
        "again useEffect is called because post cache is not deleted"
      );
      navigate(`/order/ordercreate/${createData.orderRes.id}/order-details`);
    }
    if (isCreatingError === true) {
      console.log("error", createError);
      toast.error(createError.data.errorMessage, { autoClose: "2000" });
    }
  }, [createData, createError]);

  useEffect(() => {
    if (
      isSuccess === true &&
      Object.keys(data.orderRes).length > 0 &&
      data.orderRes.statusCode === 200
    ) {
      console.log(
        "again useEffect is called because post cache is not deleted"
      );
      navigate(`/order/ordercreate/${id}/order-details`);
    }
  }, [data]);

  const validationSchema = Yup.object({
    fullname: Yup.string()
      .matches(
        /^[a-zA-Z\s]+$/,
        "full name can only contain alphabetic characters"
      )
      .required("Full name is a required field"),
    phonenumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is a required field"),
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is a required field"),
    gstin: Yup.string()
      .matches(
        /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,
        "gstin must be that format 11XXXXX0000A1ZX"
      )
      .required("gstin is a required field"),
    fulladdress: Yup.string().required("Full Address is a required field"),
    landmark: Yup.string().required("Landmark is a required field"),
    pincode: Yup.string().required("Pincode is a required field"),
    country: Yup.string()
      .matches(
        /^[a-zA-Z\s]+$/,
        "country can only contain alphabetic characters"
      )
      .required("Country is required field"),
    state: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "state can only contain alphabetic characters")
      .required("State is required field"),
    city: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "city can only contain alphabetic characters")
      .required("City is required field"),
    billing_is_same_as_consignee: Yup.boolean().required(),

    billing_full_name: Yup.string().when("billing_is_same_as_consignee", {
      is: false,
      then: (schema) =>
        schema
          .matches(
            /^[a-zA-Z\s]+$/,
            "full name can only contain alphabetic characters"
          )
          .required("Billing full name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    billing_phone: Yup.string().when("billing_is_same_as_consignee", {
      is: false,
      then: (schema) =>
        schema
          .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
          .required("Billing phone is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    billing_email: Yup.string()
      .email("Invalid email")
      .when("billing_is_same_as_consignee", {
        is: false,
        then: (schema) => schema.required("Billing email is required"),
        otherwise: (schema) => schema.notRequired(),
      }),

    billing_address: Yup.string().when("billing_is_same_as_consignee", {
      is: false,
      then: (schema) => schema.required("Billing address is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    billing_landmark: Yup.string().when("billing_is_same_as_consignee", {
      is: false,
      then: (schema) => schema.required("Billing landmark is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    billing_pincode: Yup.string().when("billing_is_same_as_consignee", {
      is: false,
      then: (schema) => schema.required("Billing pincode is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    billing_city: Yup.string().when("billing_is_same_as_consignee", {
      is: false,
      then: (schema) =>
        schema
          .matches(
            /^[a-zA-Z\s]+$/,
            "city can only contain alphabetic characters"
          )
          .required("Billing city is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    billing_state: Yup.string().when("billing_is_same_as_consignee", {
      is: false,
      then: (schema) =>
        schema
          .matches(
            /^[a-zA-Z\s]+$/,
            "State can only contain alphabetic characters"
          )
          .required("Billing state is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    billing_country: Yup.string().when("billing_is_same_as_consignee", {
      is: false,
      then: (schema) =>
        schema
          .matches(
            /^[a-zA-Z\s]+$/,
            "Country can only contain alphabetic characters"
          )
          .required("Billing country is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={consigneeForm}
      validateOnBlur={true}
      validateOnChange={true}
      validationSchema={validationSchema}
      onSubmit={(fields, { setSubmitting }) => {
        // Handle the form submission
        // alert(JSON.stringify(fields, null, 2)); // Replace this with actual submission logic
        // console.log(fields); // To see the form values in the console
        if (slug === undefined && id === undefined) {
          createOrder(fields);
        }
        if (slug !== undefined && id !== undefined) {
          console.log("hey slug and id is not undefined");
          const newField = { ...fields };
          newField["id"] = id;
          newField["slug"] = slug;
          updateOrder(newField);
          console.log(newField);
        }

        setSubmitting(false); // Stop the submission
      }}
    >
      {({
        isSubmitting,
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        setFieldTouched,
      }) => (
        <Form>
          <AutoFillFromPincode />
          <div className="w-[82%] m-[auto] flex flex-col gap-5">
            <div className="font-[500]">
              Contact Details{" "}
              <span className="font-[400] text-sm">
                ( Who is the order being deliverd to? )
              </span>
            </div>

            <div className="text-[15px] font-normal flex flex-wrap gap-5">
              {" "}
              <div className="flex flex-col w-[48%] relative">
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
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="flex flex-col w-[48%]">
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
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="flex flex-col w-[48%]">
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
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="flex flex-col w-[48%]">
                Alternate Phone Number
                <Field
                  type="number"
                  name="alternatephonenumber"
                  className="customInputBorder px-3  py-1 text-[0.875rem]"
                  placeholder="Enter Consignee Alternate Phone Number"
                />
              </div>
              <div className="flex flex-col w-[48%]">
                Consignee's Company
                <Field
                  name="consigneecompany"
                  className="customInputBorder px-3  py-1 text-[0.875rem]"
                  placeholder="Enter Consignee Company Name"
                />
              </div>
              <div className="flex flex-col w-[48%]">
                GSTIN*
                <Field
                  name="gstin"
                  className={` px-3 py-1 text-[0.875rem] ${
                    touched.gstin && errors.gstin
                      ? "customInputBorderError"
                      : "customInputBorder"
                  }`}
                  placeholder="Enter Consignee GSTIN"
                />
                <ErrorMessage
                  name="gstin"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            </div>
            <div className="font-[500] w-[100%]">
              Address Details{" "}
              <span className="font-[400] text-sm">
                ( Where is the order being delivered?)
              </span>
            </div>
            <div className="text-[15px] font-normal flex flex-wrap gap-5">
              <div className="flex flex-col w-[48%]">
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
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="flex flex-col w-[48%]">
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
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="flex flex-col w-[48%]">
                Pincode*
                <Field
                  type="number"
                  name="pincode"
                  className={` px-3 py-1 text-[0.875rem] ${
                    touched.pincode && errors.pincode
                      ? "customInputBorderError"
                      : "customInputBorder"
                  }`}
                  onInput={(e) => {
                    if (e.target.value.length > 6) {
                      console.log("inner condition value");
                      e.target.value = e.target.value.slice(0, 6);
                    }
                  }}
                  placeholder="Enter Consignee Pincode"
                />
                <ErrorMessage
                  name="pincode"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="flex flex-col w-[48%]">
                City*
                <Field
                  name="city"
                  className={` px-3 py-1 text-[0.875rem] ${
                    touched.city && errors.city
                      ? "customInputBorderError"
                      : "customInputBorder"
                  }`}
                  placeholder="Enter Consignee City"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="flex flex-col w-[48%]">
                State*
                <Field
                  name="state"
                  className={` px-3 py-1 text-[0.875rem] ${
                    touched.state && errors.state
                      ? "customInputBorderError"
                      : "customInputBorder"
                  }`}
                  placeholder="Enter Consignee State"
                />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="flex flex-col w-[48%]">
                Country*
                <Field
                  name="country"
                  className={` px-3 py-1 text-[0.875rem] ${
                    touched.country && errors.country
                      ? "customInputBorderError"
                      : "customInputBorder"
                  }`}
                  placeholder="Enter Consignee Country"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            </div>
            <div className="text-sm font-normal flex items-center gap-2">
              <input
                type="checkbox"
                checked={values.billing_is_same_as_consignee}
                className="mt-1"
                onClick={() =>
                  setFieldValue(
                    "billing_is_same_as_consignee",
                    !values.billing_is_same_as_consignee
                  )
                }
              />
              <span>Is billing address the same as Shipping address</span>
            </div>

            {!values.billing_is_same_as_consignee && (
              <>
                {" "}
                <div className="font-[500]">Billing Details </div>
                <div className="text-[15px] font-normal flex flex-wrap gap-5">
                  {" "}
                  <div className="flex flex-col w-[48%] relative">
                    Full Name*
                    <Field
                      name="billing_full_name"
                      className={` px-3 py-1 text-[0.875rem] ${
                        touched.billing_full_name && errors.billing_full_name
                          ? "customInputBorderError"
                          : "customInputBorder"
                      }`}
                      placeholder="Enter Consignee Full Name"
                    />
                    <ErrorMessage
                      name="billing_full_name"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div className="flex flex-col w-[48%]">
                    Phone Number*
                    <Field
                      type="number"
                      name="billing_phone"
                      className={` px-3 py-1 text-[0.875rem] ${
                        touched.billing_phone && errors.billing_phone
                          ? "customInputBorderError"
                          : "customInputBorder"
                      }`}
                      placeholder="Enter Consignee Phone Number"
                    />
                    <ErrorMessage
                      name="billing_phone"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div className="flex flex-col w-[48%]">
                    Email*
                    <Field
                      type="email"
                      name="billing_email"
                      className={` px-3 py-1 text-[0.875rem] ${
                        touched.billing_email && errors.billing_email
                          ? "customInputBorderError"
                          : "customInputBorder"
                      }`}
                      placeholder="Enter Consignee Email Address"
                    />
                    <ErrorMessage
                      name="billing_email"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                </div>
                <div className="font-[500] w-[100%]">Billing Address </div>
                <div className="text-[15px] font-normal flex flex-wrap gap-5">
                  <div className="flex flex-col w-[48%]">
                    Full Address*
                    <Field
                      name="billing_address"
                      className={` px-3 py-1 text-[0.875rem] ${
                        touched.billing_address && errors.billing_address
                          ? "customInputBorderError"
                          : "customInputBorder"
                      }`}
                      placeholder="Enter Consignee Full Address"
                    />
                    <ErrorMessage
                      name="billing_address"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div className="flex flex-col w-[48%]">
                    Landmark*
                    <Field
                      name="billing_landmark"
                      className={` px-3 py-1 text-[0.875rem] ${
                        touched.billing_landmark && errors.billing_landmark
                          ? "customInputBorderError"
                          : "customInputBorder"
                      }`}
                      placeholder="Enter Consignee Landmark"
                    />
                    <ErrorMessage
                      name="billing_landmark"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div className="flex flex-col w-[48%]">
                    Pincode*
                    <Field
                      type="number"
                      name="billing_pincode"
                      className={` px-3 py-1 text-[0.875rem] ${
                        touched.billing_pincode && errors.billing_pincode
                          ? "customInputBorderError"
                          : "customInputBorder"
                      }`}
                      onInput={(e) => {
                        if (e.target.value.length > 6) {
                          console.log("inner condition value");
                          e.target.value = e.target.value.slice(0, 6);
                        }
                      }}
                      placeholder="Enter Consignee Pincode"
                    />
                    <ErrorMessage
                      name="billing_pincode"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div className="flex flex-col w-[48%]">
                    City*
                    <Field
                      name="billing_city"
                      className={` px-3 py-1 text-[0.875rem] ${
                        touched.billing_city && errors.billing_city
                          ? "customInputBorderError"
                          : "customInputBorder"
                      }`}
                      placeholder="Enter Consignee City"
                    />
                    <ErrorMessage
                      name="billing_city"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div className="flex flex-col w-[48%]">
                    State*
                    <Field
                      name="billing_state"
                      className={` px-3 py-1 text-[0.875rem] ${
                        touched.billing_state && errors.billing_state
                          ? "customInputBorderError"
                          : "customInputBorder"
                      }`}
                      placeholder="Enter Consignee State"
                    />
                    <ErrorMessage
                      name="billing_state"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div className="flex flex-col w-[48%]">
                    Country*
                    <Field
                      name="billing_country"
                      className={` px-3 py-1 text-[0.875rem] ${
                        touched.billing_country && errors.billing_country
                          ? "customInputBorderError"
                          : "customInputBorder"
                      }`}
                      placeholder="Enter Consignee Country"
                    />
                    <ErrorMessage
                      name="billing_country"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end py-16">
              <Button
                variant="contained"
                className="flex gap-2"
                type="submit"
                disabled={isSubmitting}
              >
                Next
              </Button>
            </div>
            {console.log("errors-->>", errors)}
            {console.log("<<<<<value>>>>", values)}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ConsigneeDetails;

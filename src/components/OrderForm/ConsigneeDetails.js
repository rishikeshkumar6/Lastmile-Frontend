import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../Redux/Action";
import { useUpdateOrderMutation } from "../../Redux/Action";
import Button from "@mui/material/Button";

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
  }, [createData]);

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
    fulladdress: Yup.string().required("Full Address is a required field"),
    landmark: Yup.string().required("Landmark is a required field"),
    pincode: Yup.string().required("Pincode is a required field"),
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
          alert(JSON.stringify(newField, 2, null));
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
        setFieldValue,
        setFieldTouched,
      }) => (
        <Form>
          <div className="w-[82%] m-[auto] flex flex-col gap-5">
            <div className="font-[500]">
              Contact Details{" "}
              <span className="font-[400] text-sm">
                ( Who is the order being deliverd to? )
              </span>
            </div>

            <div className="text-[15px] font-normal flex flex-wrap gap-5">
              {" "}
              <div className="flex flex-col w-[32%] relative">
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
              <div className="flex flex-col w-[32%]">
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
              <div className="flex flex-col w-[32%]">
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
              <div className="flex flex-col w-[32%]">
                Alternate Phone Number
                <Field
                  type="number"
                  name="alternatephonenumber"
                  className="customInputBorder px-3  py-1 text-[0.875rem]"
                  placeholder="Enter Consignee Alternate Phone Number text-sm"
                />
              </div>
              <div className="flex flex-col w-[32%]">
                Consignee's Company
                <Field
                  name="consigneecompany"
                  className="customInputBorder px-3  py-1 text-[0.875rem]"
                  placeholder="Enter Consignee Company Name"
                />
              </div>
              <div className="flex flex-col w-[32%]">
                GSTIN
                <Field
                  name="gstin"
                  className="customInputBorder px-3  py-1 text-[0.875rem]"
                  placeholder="Enter Consignee GSTIN"
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
              <div className="flex flex-col w-[50%]">
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
              <div className="flex flex-col w-[32%]">
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
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="flex flex-col w-[32%]">
                City
                <Field
                  name="city"
                  className="customInputBorder px-3  py-1 text-[0.875rem]"
                  placeholder="Enter Consignee City"
                />
              </div>
              <div className="flex flex-col w-[32%]">
                State
                <Field
                  name="state"
                  className="customInputBorder px-3  py-1 text-[0.875rem]"
                  placeholder="Enter Consignee State"
                />
              </div>
              <div className="flex flex-col w-[32%]">
                Country
                <Field
                  name="country"
                  className="customInputBorder px-3  py-1 text-[0.875rem]"
                  placeholder="Enter Consignee Country"
                />
              </div>
            </div>

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
            {console.log("formik errors field", errors)}
            {console.log("values field", values)}
            {console.log("errors field", createError)}
            {console.log("is Create Error", isCreatingError)}
            {console.log("touched field", touched)}
            {console.log("state", consigneeForm)}
            {console.log("put request data check", data)}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ConsigneeDetails;

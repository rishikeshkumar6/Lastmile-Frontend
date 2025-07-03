import React, { useState, useEffect, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useUpdateOrderMutation } from "../../Redux/Action";
import { api } from "../../Redux/Action";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

const OrderDetails = ({ Loading, Success, Error, Data, Errors, slug, id }) => {
  const navigate = useNavigate();
  const [updateOrder, { isLoading, isSuccess, isError, data, error }] =
    useUpdateOrderMutation();
  const [orderDetailsForm, setOrderDetailsForm] = useState({
    orderid: "",
    channel: "",
    productDetails: [
      {
        name: "",
        price: "",
        hsn_code: "",
        category: "",
        brand: "",
        expiry_date: "",
        batch_no: "",
        images: [],
        dead_weigth: "",
        volumetric_weigth: "",
        length: "",
        breath: "",
        height: "",
        quantity: "",
        isSensitiveOrder: false,
        sku_code: "",
      },
    ],
    payment_mode: "prepaid",
    shipping_charges: 0,
    cod_charges: 0,
    discount: 0,
    gift_wrap_charges: 0,
    other_charges: 0,
    total_amount: 0,
    order_value: 0,
    tax_amount: 0,
  });

  const sensitiveOrder = [
    "Food & Beverages",
    "Pharmaceuticals / Medicines",
    "Cosmetics & Personal Care",
    "Chemicals / Cleaning Supplies",
    "Nutritional Supplements",
    "Baby Products",
  ];
  const options = [
    { value: "Food & Beverages", label: "Food & Beverages" },
    {
      value: "Pharmaceuticals / Medicines",
      label: "Pharmaceuticals / Medicines",
    },
    { value: "Cosmetics & Personal Care", label: "Cosmetics & Personal Care" },
    { value: "Nutritional Supplements", label: "Nutritional Supplements	" },
    {
      value: "Chemicals / Cleaning Supplies",
      label: "Chemicals / Cleaning Supplies",
    },
    { value: "Baby Products", label: "Baby Products" },
    { value: "Apparel & Fashion", label: "Apparel & Fashion	" },
    { value: "Electronics", label: "Electronics" },
    { value: "Home Appliances", label: "Home Appliances" },
    { value: "Furniture", label: "Furniture" },
    { value: "Books & Stationery", label: "Books & Stationery	" },
    { value: "Toys & Games", label: "Toys & Games	" },
    { value: "Tools & Hardware", label: "Tools & Hardware	" },
    { value: "Jewelry & Watches", label: "Jewelry & Watches" },
    { value: "Automobile Accessories", label: "Automobile Accessories" },
    { value: "Sports Equipment", label: "Sports Equipment	" },
    { value: "Musical Instruments", label: "Musical Instruments" },
    { value: "Digital Products", label: "Digital Products" },
    { value: "Decor & Art", label: "Decor & Art	" },
    { value: "Bags & Luggage", label: "Bags & Luggage" },
  ];

  const extraCharge = (values) => {
    const {
      shipping_charges,
      cod_charges,
      discount,
      gift_wrap_charges,
      other_charges,
      tax_amount,
    } = values;

    const extraCharge =
      parseFloat(shipping_charges) +
      parseFloat(cod_charges) -
      parseFloat(discount) +
      parseFloat(gift_wrap_charges) +
      parseFloat(other_charges);
    return isNaN(extraCharge) === true ? 0 : extraCharge;
  };

  const orderDetailsFormSchema = Yup.object().shape({
    orderid: Yup.string().required("order id is required field"),
    channel: Yup.string().required("channel is required field"),
    productDetails: Yup.array(
      Yup.object().shape({
        name: Yup.string().required("name  is required field"),
        price: Yup.string().required("price  is required field"),
        quantity: Yup.string().required("quantity  is required field"),
        isSensitiveOrder: Yup.boolean().required(),
        expiry_date: Yup.string().when("isSensitiveOrder", {
          is: true,
          then: (schema) => schema.required("expiry date is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
    ),
  });

  const handleProducts = (setFieldValue, values) => {
    const orderDetailsForms = JSON.parse(JSON.stringify(values));
    orderDetailsForms.productDetails.push({
      name: "",
      price: "",
      hsn_code: "",
      category: "",
      brand: "",
      expiry_date: "",
      batch_no: "",
      images: [],
      dead_weigth: "",
      volumetric_weigth: "",
      length: "",
      breath: "",
      height: "",
      quantity: "",
      isSensitiveOrder: false,
      sku_code: "",
    });
    setFieldValue("productDetails", orderDetailsForms.productDetails);
  };

  const prevDataRef = useRef();

  useEffect(() => {
    console.log("useEffect is called");
    if (
      Success === true &&
      Object.keys(Data).length > 0 &&
      Data.orderRes.orderDetails !== null &&
      Object.keys(Data.orderRes.orderDetails).length > 0
    ) {
      // Check if the order details are different from the previous ones
      console.log("useEffect inner condition is executed");
      if (prevDataRef.current !== Data.orderRes.orderDetails) {
        setOrderDetailsForm(Data.orderRes.orderDetails);
        prevDataRef.current = Data.orderRes.orderDetails; // Update the previous value
      }
    }
  }, [Data]);

  useEffect(() => {
    if (
      isSuccess === true &&
      Object.keys(data.orderRes).length > 0 &&
      data.orderRes.statusCode === 200
    ) {
      console.log(
        "again useEffect is called because post cache is not deleted"
      );
      navigate(`/order/ordercreate/${id}/pickup-details`);
    }
    if (isError === true) {
      toast.error(error.data["errorMessage"], { autoClose: "2000" });
    }
  }, [data, error]);

  const handleDelete = (values, id, setFieldValue) => {
    console.log("handleDelete function is called", values, id, "----");
    const orderForms = { ...values };
    const filterData = orderForms.productDetails.filter((elem, index) => {
      return index !== id;
    });
    setFieldValue("productDetails", filterData);
  };
  const AlertError = () => {
    toast.error("negative value is not allowed", { autoClose: 2000 });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={orderDetailsForm}
      validationSchema={orderDetailsFormSchema}
      onSubmit={(field) => {
        console.log("-----slug-----", slug, "--------id-----", id);
        if (slug !== undefined && id !== undefined) {
          const newField = { ...field };
          newField["id"] = id;
          newField["slug"] = slug;
          console.log("---------newField-------", newField);
          updateOrder(newField);
        }
        console.log(field);
        // alert(JSON.stringify(field, null, 2));
      }}
      render={({ values, errors, touched, setFieldValue, setFieldTouched }) => {
        const productValidation = (index, fieldName) => {
          if (
            errors.productDetails !== undefined &&
            errors.productDetails[index] !== undefined &&
            errors.productDetails[index][fieldName] !== undefined &&
            touched.productDetails !== undefined &&
            touched.productDetails[index] !== undefined &&
            touched.productDetails[index][fieldName] !== undefined
          ) {
            console.log(
              "touched field name",
              touched.productDetails[index][fieldName]
            );
            console.log("error field", errors.productDetails[index][fieldName]);
            console.log("hey i am if statemnt", fieldName, index);
            return `px-3 py-1 customInputBorderError`;
          } else {
            console.log("hey i am else statement");
            return `px-3 py-1 customInputBorder`;
          }
        };

        const totalAmmount = (values) => {
          const totalAmmount = values.productDetails.reduce(
            (acc, curr, index) => {
              return acc + curr.quantity * curr.price;
            },
            0
          );
          return totalAmmount;
        };
        const TotalAmmount = totalAmmount(values);

        const taxCharge = (values) => {
          const { tax_amount } = values;
          const finalValue = (tax_amount / 100) * TotalAmmount;
          return isNaN(finalValue) === true ? 0 : finalValue;
        };
        const handleChange = (e, args1, args2) => {
          setFieldValue(args1, e.value);
          const isSensitiveOrder = sensitiveOrder.includes(e.value);
          console.log("checksensitive info", isSensitiveOrder);
          setFieldValue(args2, isSensitiveOrder);
          console.log(e);
        };
        return (
          <Form>
            <div className="w-[82%] m-[auto] gap-12 flex flex-wrap">
              <div className="flex w-[100%] font-normal text-[15px] gap-y-2 flex-wrap gap-x-20">
                <div className="text-xl w-[100%]">Order Details</div>
                <div className="flex flex-col w-[46%]">
                  Order Id*
                  <Field
                    name="orderid"
                    className={` px-3 py-1  ${
                      touched.orderid && errors.orderid
                        ? "customInputBorderError"
                        : "customInputBorder"
                    }`}
                    placeholder="Enter Order Id"
                  />
                  <ErrorMessage
                    name={`orderid`}
                    component={"div"}
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col w-[46%]">
                  Channel
                  <Field
                    name="channel"
                    className={` px-3 py-1  ${
                      touched.channel && errors.channel
                        ? "customInputBorderError"
                        : "customInputBorder"
                    }`}
                    placeholder="Enter Channel"
                  />
                  <ErrorMessage
                    name={`channel`}
                    component={"div"}
                    className="text-red-500"
                  />
                </div>
              </div>
              <hr className="w-full my-4 border-t border-gray-300" />
              <div className="flex w-[100%] font-normal text-[15px] gap-y-5 flex-wrap">
                <div className="text-xl w-[100%] flex justify-between ">
                  <div className="flex items-center gap-2">
                    {" "}
                    Product Details{" "}
                    <span className="text-sm text-gray-400">
                      (What does the order certain)
                    </span>
                  </div>
                  <Button
                    variant="contained"
                    className="flex gap-2"
                    onClick={() => handleProducts(setFieldValue, values)}
                  >
                    {" "}
                    <FiPlus /> Add Products
                  </Button>
                </div>
                {values.productDetails.map((elem, index) => {
                  console.log("element", elem);
                  console.log("index", index);
                  return (
                    <div className=" relative flex flex-col gap-5 w-[100%] border p-[25px]">
                      <div className="flex flex-col w-[65%]">
                        Product Name*
                        <Field
                          name={`productDetails[${index}].name`}
                          className={productValidation(index, "name")}
                          placeholder="Enter product name"
                        />
                        <ErrorMessage
                          name={`productDetails[${index}].name`}
                          component={"div"}
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex gap-5">
                        <div className="flex flex-col w-[15%]">
                          quantity*
                          <Field
                            type="number"
                            name={`productDetails[${index}].quantity`}
                            className={productValidation(index, "quantity")}
                            onInput={(e) => {
                              if (e.target.value === "") return;

                              // Convert to string and check decimal places
                              if (e.target.value.includes(".")) {
                                e.target.value = parseInt(e.target.value); // trim to integer
                              }

                              if (e.target.value < 0) {
                                console.log("inner condition value");
                                AlertError();
                                e.target.value = 0;
                              }
                            }}
                            placeholder="Enter quantity"
                          />
                          <ErrorMessage
                            name={`productDetails[${index}].quantity`}
                            component={"div"}
                            className="text-red-500"
                          />
                        </div>
                        <div className="flex flex-col w-[15%]">
                          price*
                          <Field
                            type="number"
                            name={`productDetails[${index}].price`}
                            className={productValidation(index, "price")}
                            onInput={(e) => {
                              if (e.target.value === "") return;

                              // Convert to string and check decimal places
                              const parts = e.target.value.split(".");
                              console.log(parts);
                              if (parts[1]?.length > 2) {
                                // Trim to 2 decimals
                                e.target.value = `${parts[0]}.${parts[1].slice(
                                  0,
                                  2
                                )}`;
                              }
                              if (e.target.value < 0) {
                                console.log("inner condition value");
                                AlertError();
                                e.target.value = 0;
                              }
                            }}
                            placeholder="Enter price"
                          />
                          <ErrorMessage
                            name={`productDetails[${index}].price`}
                            component={"div"}
                            className="text-red-500"
                          />
                        </div>
                        {values.productDetails[index].isSensitiveOrder && (
                          <>
                            {" "}
                            <div className="flex flex-col w-[15%]">
                              Batch No
                              <Field
                                name={`productDetails[${index}].batch_no`}
                                className={productValidation(index, "batch_no")}
                                placeholder="Enter batch no"
                              />
                            </div>
                            <div className="flex flex-col w-[15%]">
                              expiry date*
                              <Field
                                type="date"
                                name={`productDetails[${index}].expiry_date`}
                                className={productValidation(
                                  index,
                                  "expiry_date"
                                )}
                                placeholder="Enter expiry date"
                              />
                              <ErrorMessage
                                name={`productDetails[${index}].expiry_date`}
                                component={"div"}
                                className="text-red-500"
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex w-[100] gap-5">
                        <div className="flex flex-col w-[32%]">
                          Sku Code
                          <Field
                            name={`productDetails[${index}].sku_code`}
                            className={productValidation(index, "sku_code")}
                            onInput={(e) => {
                              if (e.target.value.length > 50) {
                                console.log("inner condition value");
                                e.target.value = e.target.value.slice(0, 50);
                              }
                            }}
                            placeholder="Enter sku code"
                          />
                        </div>
                        <div className="flex flex-col w-[32%]">
                          Hsn Code
                          <Field
                            name={`productDetails[${index}].hsn_code`}
                            className={productValidation(index, "hsn_code")}
                            type="number"
                            onInput={(e) => {
                              if (e.target.value === "") return;
                              if (e.target.value < 0) {
                                e.target.value = 0;
                                AlertError();
                              }
                              if (e.target.value.length > 8) {
                                console.log("inner condition value");
                                e.target.value = e.target.value.slice(0, 8);
                              }
                            }}
                            placeholder="Enter hsn code"
                          />
                        </div>
                      </div>

                      <div>
                        Category*
                        <Select
                          value={{
                            label: values.productDetails[index].category,
                            value: values.productDetails[index].category,
                          }}
                          name={`productDetails[${index}].category`}
                          options={options}
                          onChange={(e) =>
                            handleChange(
                              e,
                              `productDetails[${index}].category`,
                              `productDetails[${index}].isSensitiveOrder`
                            )
                          }
                          className="basic-multi-select w-[65%]"
                          classNamePrefix="select"
                        />
                      </div>

                      {index !== 0 && (
                        <MdDelete
                          className="absolute top-3 right-3 text-[25px] text-red-500 cursor-pointer"
                          onClick={() =>
                            handleDelete(values, index, setFieldValue)
                          }
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <hr className="w-full my-4 border-t border-gray-300" />{" "}
              <div className="w-[100%] flex font-normal text-[16px] flex-col gap-5">
                <h1 className="font-[500] text-xl">Payment Mode</h1>
                <div className="w-[100%] flex items-center gap-20">
                  <label className="flex gap-2 items-center text-[13px] font-[500]">
                    <Field type="radio" name="payment_mode" value="prepaid" />
                    Prepaid
                  </label>
                  <label className="flex gap-2 items-center text-[13px] font-[500]">
                    <Field type="radio" name="payment_mode" value="cod" />
                    COD
                  </label>
                </div>

                <div className="flex w-[100%] font-normal flex-wrap text-[15px] gap-y-2 gap-x-7">
                  <div className="flex flex-col w-[25%]">
                    Shipping Charges
                    <Field
                      type="number"
                      name="shipping_charges"
                      className="customInputBorder px-3 py-1"
                      onInput={(e) => {
                        if (e.target.value === "") return;

                        // Convert to string and check decimal places
                        const parts = e.target.value.split(".");
                        console.log(parts);
                        if (parts[1]?.length > 2) {
                          // Trim to 2 decimals
                          e.target.value = `${parts[0]}.${parts[1].slice(
                            0,
                            2
                          )}`;
                        }
                        if (e.target.value < 0) {
                          console.log("inner condition value");
                          AlertError();
                          e.target.value = 0;
                        }
                      }}
                      placeholder="Enter Order Id"
                    />
                  </div>
                  <div className="flex flex-col w-[25%]">
                    COD Charge
                    <Field
                      type="number"
                      name="cod_charges"
                      onInput={(e) => {
                        if (e.target.value === "") return;

                        // Convert to string and check decimal places
                        const parts = e.target.value.split(".");
                        console.log(parts);
                        if (parts[1]?.length > 2) {
                          // Trim to 2 decimals
                          e.target.value = `${parts[0]}.${parts[1].slice(
                            0,
                            2
                          )}`;
                        }
                        if (e.target.value < 0) {
                          console.log("inner condition value");
                          AlertError();
                          e.target.value = 0;
                        }
                      }}
                      className={`customInputBorder px-3 py-1 ${
                        values.payment_mode === "prepaid"
                          ? "cursor-no-drop"
                          : ""
                      }`}
                      placeholder="Enter Order Id"
                      disabled={
                        values.payment_mode === "prepaid" ? true : false
                      }
                    />
                  </div>
                  <div className="flex flex-col w-[25%]">
                    Discounts{" "}
                    <Field
                      type="number"
                      name="discount"
                      onInput={(e) => {
                        if (e.target.value < 0) {
                          if (e.target.value === "") return;

                          // Convert to string and check decimal places
                          const parts = e.target.value.split(".");
                          console.log(parts);
                          if (parts[1]?.length > 2) {
                            // Trim to 2 decimals
                            e.target.value = `${parts[0]}.${parts[1].slice(
                              0,
                              2
                            )}`;
                          }
                          console.log("inner condition value");
                          AlertError();
                          e.target.value = 0;
                        }
                      }}
                      className="customInputBorder px-3 py-1"
                      placeholder="Enter Order Id"
                    />
                  </div>
                  <div className="flex flex-col w-[25%]">
                    Gift Wrap
                    <Field
                      type="number"
                      name="gift_wrap_charges"
                      onInput={(e) => {
                        if (e.target.value === "") return;

                        // Convert to string and check decimal places
                        const parts = e.target.value.split(".");
                        console.log(parts);
                        if (parts[1]?.length > 2) {
                          // Trim to 2 decimals
                          e.target.value = `${parts[0]}.${parts[1].slice(
                            0,
                            2
                          )}`;
                        }
                        if (e.target.value < 0) {
                          console.log("inner condition value");
                          AlertError();
                          e.target.value = 0;
                        }
                      }}
                      className="customInputBorder px-3 py-1"
                      placeholder="Enter Order Id"
                    />
                  </div>
                  <div className="flex flex-col w-[25%]">
                    Other Charges{" "}
                    <Field
                      type="number"
                      name="other_charges"
                      onInput={(e) => {
                        if (e.target.value === "") return;

                        // Convert to string and check decimal places
                        const parts = e.target.value.split(".");
                        console.log(parts);
                        if (parts[1]?.length > 2) {
                          // Trim to 2 decimals
                          e.target.value = `${parts[0]}.${parts[1].slice(
                            0,
                            2
                          )}`;
                        }
                        if (e.target.value < 0) {
                          console.log("inner condition value");
                          AlertError();
                          e.target.value = 0;
                        }
                      }}
                      className="customInputBorder px-3 py-1"
                      placeholder="Enter Order Id"
                    />
                  </div>
                  <div className="flex flex-col w-[25%]">
                    Tax (precent)
                    <Field
                      type="number"
                      name="tax_amount"
                      onInput={(e) => {
                        if (e.target.value === "") return;

                        // Convert to string and check decimal places
                        const parts = e.target.value.split(".");
                        console.log(parts);
                        if (parts[1]?.length > 2) {
                          // Trim to 2 decimals
                          e.target.value = `${parts[0]}.${parts[1].slice(
                            0,
                            2
                          )}`;
                        }
                        if (e.target.value < 0) {
                          console.log("inner condition value");
                          AlertError();
                          e.target.value = 0;
                        }
                      }}
                      className="customInputBorder px-3 py-1"
                      placeholder="Enter Order Id"
                    />
                  </div>
                </div>
              </div>
              <div className="py-6 px-10 bg-gray bg-slate-200 rounded-sm w-[100%] font-[500] text-[15px] flex flex-col gap-5">
                <div className="flex justify-between items-center text-sm font-[500]">
                  Total Product Value
                  <span>{`${TotalAmmount}`}</span>
                </div>

                <div className="flex justify-between items-center text-sm font-[500]">
                  Extra Charges
                  <span>{extraCharge(values) + taxCharge(values)}</span>
                </div>
                <hr class="w-full my-4 border-t border-gray-300" />
                <div className="flex justify-between items-center">
                  <span className="ftext-sm font-[500]"> Total</span>
                  <span>
                    {totalAmmount(values) +
                      extraCharge(values) +
                      taxCharge(values)}
                  </span>
                </div>
              </div>
              <div className="w-[100%] flex justify-end gap-5 py-16">
                <Button
                  variant="outlined"
                  className="flex gap-2"
                  type="submit"
                  onClick={() => {
                    navigate(`/order/ordercreate/${id}/consignee-details`);
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  className="flex gap-2"
                  type="submit"
                >
                  Next
                </Button>
              </div>
              {console.log("formik payload", values)}
              {console.log("formik error payload", errors)}
            </div>
          </Form>
        );
      }}
    />
  );
};

export default OrderDetails;

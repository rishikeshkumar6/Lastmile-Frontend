import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { MdEdit } from "react-icons/md";
import { Formik, ErrorMessage, Field, Form } from "formik";
import Select from "react-select";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";

import {
  useImageUploadMutation,
  useUpdateProductMutation,
} from "../../Redux/Action";
import { X } from "lucide-react";
import * as Yup from "yup";
import { Button } from "@mui/material";

const ManageProductForm = ({ popup, setPopup, Data }) => {
  console.log("data", Data);
  const [ManageProductForm, setManageProductForm] = useState({
    name: "",
    price: "",
    hsn_code: "",
    category: "",
    brand: "",
    expiry_date: "",
    batch_no: "",
    images: [],
    quantity: "",
    sku_code: "",
    dead_weigth: "",
    volumetric_weigth: "",
    isSensitiveOrder: false,
    length: "",
    breath: "",
    height: "",
  });
  const [imageUpload, { isLoading, isError, isSuccess, data, error }] =
    useImageUploadMutation();
  const [
    updateProduct,
    {
      isLoading: Loading,
      isSuccess: Success,
      data: productRes,
      isError: isErrors,
      error: Error,
    },
  ] = useUpdateProductMutation();
  const closeModal = () => setPopup(false);
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
  const sensitiveOrder = [
    "Food & Beverages",
    "Pharmaceuticals / Medicines",
    "Cosmetics & Personal Care",
    "Chemicals / Cleaning Supplies",
    "Nutritional Supplements",
    "Baby Products",
  ];
  const ManageProductFormSchema = Yup.object().shape({
    name: Yup.string().required("name  is required field"),
    price: Yup.string().required("price  is required field"),
    quantity: Yup.string().required("quantity  is required field"),
    dead_weigth: Yup.number().required("dead weight is required field"),

    length: Yup.number().required("length is required field"),
    breath: Yup.number().required("breath is required field"),
    height: Yup.number().required("height is required field"),
    isSensitiveOrder: Yup.boolean().required(),
    expiry_date: Yup.string().when("isSensitiveOrder", {
      is: true,
      then: (schema) => schema.required("expiry date is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
  const AlertError = () => {
    toast.error("negative value is not allowed", { autoClose: 2000 });
  };
  const handleFile = async (e, setFieldValue, values) => {
    const files = e.target.files[0];
    const form = new FormData();
    form.append("imageupload", files);
    console.log("------form------", form);
    const response = await imageUpload(form);
    const privateData = JSON.parse(JSON.stringify(values));
    privateData.images.push(response.data.imageUrl);
    setFieldValue("images", privateData.images);
    console.log("file", files);
  };

  const deleteImage = (id, setFieldValue, values) => {
    console.log("id", id);
    const privateData = JSON.parse(JSON.stringify(values));
    const updatedImage = privateData.images.filter(
      (elem, index) => index !== id
    );
    setFieldValue("images", updatedImage);
  };

  useEffect(() => {
    if (Success === true && productRes.statusCode === 200) {
      setPopup(!popup);
      toast.success(productRes.message, { autoClose: "2000" });
    }
    if (Object.keys(Data).length > 0) {
      setManageProductForm(Data);
    }
  }, [Data, productRes]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={ManageProductForm}
      validationSchema={ManageProductFormSchema}
      onSubmit={(field) => {
        console.log(JSON.stringify(field));
        updateProduct(field);
      }}
      render={({ values, errors, setFieldValue }) => {
        const handleChange = (e, args1, args2) => {
          setFieldValue(args1, e.value);
          const isSensitiveOrder = sensitiveOrder.includes(e.value);
          console.log("checksensitive info", isSensitiveOrder);
          setFieldValue(args2, isSensitiveOrder);
          console.log(e);
        };
        const volumetric_weight =
          (values.length * values.breath * values.height) / 5000;
        return (
          <>
            <span className=" cursor-pointer" onClick={() => setPopup(!popup)}>
              <MdEdit />
            </span>
            <Popup
              open={popup}
              closeOnDocumentClick
              onClose={closeModal}
              position="center"
              modal
              contentStyle={{
                width: "70%",
                height: "80%",
                margin: "auto",
                borderRadius: "10px",
                overflow: "auto",
                padding: "24px",
                contentClassName: "popup-animate",
              }}
              overlayStyle={{
                background: "rgba(0,0,0,0.5)",
              }}
            >
              <Form>
                <div className="flex gap-5 flex-col justify-center items-center">
                  <span
                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                    onClick={() => setPopup(!popup)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </span>

                  <div className=" relative flex flex-col gap-5 w-[100%]  p-[25px]">
                    <div className="flex items-center gap-2 text-[20px] font-medium">
                      {" "}
                      Product Details{" "}
                    </div>
                    <hr className="w-full  border-t border-gray-300" />
                    <div className="flex flex-col w-[100%]">
                      Product Name*
                      <Field
                        name="name"
                        className={`px-3 py-1 customInputBorder`}
                        placeholder="Enter product name"
                      />
                      <ErrorMessage
                        name="name"
                        component={"div"}
                        className="text-red-500"
                      />
                    </div>
                    <div className="flex gap-5 w-[100%]">
                      <div className="flex flex-col w-[23%]">
                        quantity*
                        <Field
                          type="number"
                          name="quantity"
                          className={`px-3 py-1 customInputBorder`}
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
                          name="quantity"
                          component={"div"}
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col w-[23%]">
                        price*
                        <Field
                          type="number"
                          name="price"
                          className={`px-3 py-1 customInputBorder`}
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
                          name="price"
                          component={"div"}
                          className="text-red-500"
                        />
                      </div>
                      {values.isSensitiveOrder && (
                        <>
                          {" "}
                          <div className="flex flex-col w-[23%]">
                            Batch No
                            <Field
                              name="batch_no"
                              className={`px-3 py-1 customInputBorder`}
                              placeholder="Enter batch no"
                            />
                          </div>
                          <div className="flex flex-col w-[23%]">
                            expiry date*
                            <Field
                              type="date"
                              name="expiry_date"
                              className={`px-3 py-1 customInputBorder`}
                              placeholder="Enter expiry date"
                            />
                            <ErrorMessage
                              name="expiry_date"
                              component={"div"}
                              className="text-red-500"
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex w-[100] gap-5">
                      <div className="flex flex-col w-[50%]">
                        Sku Code
                        <Field
                          name="sku_code"
                          className={`px-3 py-1 customInputBorder`}
                          onInput={(e) => {
                            if (e.target.value.length > 50) {
                              console.log("inner condition value");
                              e.target.value = e.target.value.slice(0, 50);
                            }
                          }}
                          placeholder="Enter sku code"
                        />
                      </div>
                      <div className="flex flex-col w-[50%]">
                        Hsn Code
                        <Field
                          name="hsn_code"
                          className={`px-3 py-1 customInputBorder`}
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
                          label: values.category,
                          value: values.category,
                        }}
                        name="category"
                        options={options}
                        onChange={(e) =>
                          handleChange(e, `category`, `isSensitiveOrder`)
                        }
                        className="basic-multi-select w-[100%]"
                        classNamePrefix="select"
                      />
                    </div>
                  </div>
                  <div className="w-[100%] p-[25px] flex flex-col gap-5">
                    <div className="flex items-center gap-2 text-[20px] font-medium">
                      {" "}
                      Package Details{" "}
                    </div>
                    <hr class="w-full  border-t border-gray-300" />
                    <div className="flex flex-col w-[100%] font-[500] text-[15px]">
                      Dead Weight*
                      <div className="flex flex-col">
                        <div className="w-[100%] flex gap-5 items-center">
                          <div className="flex flex-col w-[60%]">
                            <Field
                              type="number"
                              name="dead_weigth"
                              className="px-3 py-1 customInputBorder w-[80%]"
                              onInput={(e) => {
                                if (e.target.value === "") return;
                                const deadweight = e.target.value.split(".");
                                console.log("-----deadweight----", deadweight);
                                if (deadweight[1] && deadweight[1].length > 3) {
                                  e.target.value = `${
                                    deadweight[0]
                                  }.${deadweight[1].slice(0, 3)}`;
                                }
                                if (e.target.value < 0) {
                                  e.target.value = 0;
                                  toast.error("negative value is not allowed", {
                                    autoClose: "2000",
                                  });
                                }
                                if (e.target.value > 1000) {
                                  e.target.value = 1000;
                                }
                              }}
                              placeholder="Enter Weight"
                            />
                            <ErrorMessage
                              name="dead_weigth"
                              component={"div"}
                              className="text-red-500"
                            />
                          </div>
                          <span className="mb-3">
                            (physical weight of package)
                          </span>
                        </div>
                        <span className="text-[12px] font-normal pt-3 px-1">
                          The minimum chargeable weight is 0.5kg
                        </span>
                        <span className="text-[12px] font-normal px-1">
                          Max up to 3 decimal places
                        </span>
                      </div>
                    </div>
                    <div className="flex  w-[100%] font-[500] text-[15px] gap-5">
                      <div className="flex flex-col w-[30%]">
                        length*
                        <Field
                          type="number"
                          name="length"
                          className="px-3 py-1 customInputBorder "
                          placeholder="Enter length"
                          onInput={(e) => {
                            if (e.target.value === "") return;
                            if (e.target.value > 100) {
                              e.target.value = 100;
                            }
                            if (e.target.value.includes(".")) {
                              e.target.value = parseInt(e.target.value); // trim to integer
                            }
                            if (e.target.value < 0) {
                              e.target.value = 0;
                              toast.error("negative value is not allowed", {
                                autoClose: "2000",
                              });
                            }
                          }}
                        />
                        <ErrorMessage
                          name="length"
                          component={"div"}
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col w-[30%]">
                        breath*
                        <Field
                          type="number"
                          name="breath"
                          className="px-3 py-1 customInputBorder "
                          placeholder="Enter length"
                          onInput={(e) => {
                            if (e.target.value === "") return;
                            if (e.target.value > 100) {
                              e.target.value = 100;
                            }
                            if (e.target.value.includes(".")) {
                              e.target.value = parseInt(e.target.value); // trim to integer
                            }
                            if (e.target.value < 0) {
                              e.target.value = 0;
                              toast.error("negative value is not allowed", {
                                autoClose: "2000",
                              });
                            }
                          }}
                        />
                        <ErrorMessage
                          name="breath"
                          component={"div"}
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex flex-col w-[30%]">
                        height*
                        <Field
                          type="number"
                          name="height"
                          className="px-3 py-1 customInputBorder "
                          placeholder="Enter length"
                          onInput={(e) => {
                            if (e.target.value === "") return;
                            if (e.target.value > 500) {
                              e.target.value = 500;
                            }
                            if (e.target.value.includes(".")) {
                              e.target.value = parseInt(e.target.value); // trim to integer
                            }
                            if (e.target.value < 0) {
                              e.target.value = 0;
                              toast.error("negative value is not allowed", {
                                autoClose: "2000",
                              });
                            }
                          }}
                        />
                        <ErrorMessage
                          name="height"
                          component={"div"}
                          className="text-red-500"
                        />
                      </div>
                    </div>
                    <div className="bg-slate-200 px-10 py-6 w-[50%] flex items-center gap-5 font-[500] text-[17px]">
                      Volumetric Weight <span>{`${volumetric_weight} Kg`}</span>
                    </div>
                    <div className="bg-red-200 px-10 py-6 w-[50%] flex items-center gap-5 font-[500] text-[17px]">
                      Physical Weight
                      <span>
                        {" "}
                        {`${
                          values.dead_weigth > volumetric_weight
                            ? values.dead_weigth
                            : volumetric_weight
                        } Kg`}
                      </span>
                    </div>
                    <div className="w-[50%] text-[12px] font-normal px-2">
                      <span className="font-bold">* Note</span> - Applicable
                      weight is the heavier out of dead weight and volumetric
                      weight and is used for freight calculation.
                    </div>
                    {console.log("values", values)}
                    {console.log("volumetric weight", volumetric_weight)}
                  </div>
                  <div className="w-[100%] p-[25px] flex flex-col gap-5">
                    <div className="flex items-center gap-2 text-[20px] font-medium">
                      {" "}
                      Product Image{" "}
                    </div>
                    <hr class="w-full  border-t border-gray-300" />
                    <div className="w-[100%] flex flex-wrap gap-5 items-center">
                      {values.images.length > 0 &&
                        values.images.map((elem, index) => {
                          return (
                            <div className="w-[20%] group relative">
                              <img
                                className="h-[200px] w-[100%] rounded-lg object-cover group-hover:brightness-50 transition duration-300"
                                src={elem}
                                alt=""
                              />
                              <span
                                className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition duration-300"
                                onClick={() =>
                                  deleteImage(index, setFieldValue, values)
                                }
                              >
                                <X className="w-5 h-5 text-black" />
                              </span>
                            </div>
                          );
                        })}
                      <div className="w-[20%] bg-orange-600 flex justify-center items-center h-[200px] ">
                        <label for="fileUpload">
                          {isLoading ? (
                            "Loading..."
                          ) : (
                            <FaCloudUploadAlt className="text-[30px] cursor-pointer" />
                          )}
                        </label>
                        <input
                          type="file"
                          id="fileUpload"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFile(e, setFieldValue, values)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="contained"
                        className="flex gap-2"
                        type="submit"
                      >
                        {Loading ? "Loading..." : "Save"}
                      </Button>
                    </div>
                    {console.log("ManageFormData", ManageProductForm)}
                    {console.log("error", errors)}
                  </div>
                </div>
              </Form>
            </Popup>
          </>
        );
      }}
    />
  );
};

export default ManageProductForm;

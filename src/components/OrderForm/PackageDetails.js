import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useUpdateOrderMutation } from "../../Redux/Action";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import * as Yup from "yup";
import { toast } from "react-toastify";

const PackageDetails = ({
  Loading,
  Success,
  Error,
  Data,
  Errors,
  slug,
  id,
}) => {
  const [updateOrder, { isLoading, isSuccess, isError, data, error }] =
    useUpdateOrderMutation();
  const navigate = useNavigate();
  const [packageDetailsForm, setPackageDetailsForm] = useState({
    dead_weigth: "",
    volumetric_weigth: "",
    length: "",
    breath: "",
    height: "",
  });

  const packageDetailsFormSchema = Yup.object().shape({
    dead_weigth: Yup.number().required("dead weight is required field"),

    length: Yup.number().required("length is required field"),
    breath: Yup.number().required("breath is required field"),
    height: Yup.number().required("height is required field"),
  });

  useEffect(() => {
    if (
      Success === true &&
      Object.keys(Data).length > 0 &&
      Data.orderRes.packageDetails !== null &&
      Object.keys(Data.orderRes.packageDetails).length > 0
    ) {
      setPackageDetailsForm(Data.orderRes.packageDetails);
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
      alert("new order created successfully");
      navigate(`/order`);
    }
  }, [data]);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={packageDetailsForm}
      validationSchema={packageDetailsFormSchema}
      onSubmit={(fields) => {
        if (slug !== undefined && id !== undefined) {
          const newField = { ...fields };
          newField["id"] = id;
          newField["slug"] = slug;
          updateOrder(newField);
        }
      }}
      render={({ values, errors, touched }) => {
        const volumetric_weight =
          (values.length * values.breath * values.height) / 5000;
        return (
          <Form>
            <div className="w-[82%] m-[auto] flex flex-col gap-5">
              Package Details
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
                        name={`dead_weigth`}
                        component={"div"}
                        className="text-red-500"
                      />
                    </div>
                    <span className="mb-12">(physical weight of package)</span>
                  </div>
                  <span className="text-[12px]">
                    The minimum chargeable weight is 0.5kg
                  </span>
                  <span className="text-[12px]">
                    Max up to 3 decimal places
                  </span>
                </div>
              </div>
              Physical Dimension
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
                    name={`length`}
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
                    name={`breath`}
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
                    name={`height`}
                    component={"div"}
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="bg-slate-200 px-10 py-6 w-[30%] flex items-center gap-5 font-[500] text-[17px]">
                Volumetric Weight <span>{`${volumetric_weight} Kg`}</span>
              </div>
              <div className="bg-red-200 px-10 py-6 w-[30%] flex items-center gap-5 font-[500] text-[17px]">
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
              <div className="w-[30%] text-[12px] font-normal">
                <span className="font-bold">* Note</span> - Applicable weight is
                the heavier out of dead weight and volumetric weight and is used
                for freight calculation
              </div>
              <div className="w-[100%] flex justify-end gap-5 py-16">
                <Button
                  variant="outlined"
                  className="flex gap-2"
                  onClick={() =>
                    navigate(`/order/ordercreate/${id}/pickup-details`)
                  }
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  className="flex gap-2"
                  type="submit"
                >
                  Create Order
                </Button>
              </div>
              {console.log("values", values)}
              {console.log("volumetric weight", volumetric_weight)}
            </div>
          </Form>
        );
      }}
    />
  );
};

export default PackageDetails;

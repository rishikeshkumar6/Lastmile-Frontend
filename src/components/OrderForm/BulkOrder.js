import React, { useState, useEffect } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useBulkUploadOrderMutation } from "../../Redux/Action";

import Papa from "papaparse";
import * as XLSX from "xlsx";

const expectedHeaders = [
  "fullname",
  "phonenumber",
  "alternatephonenumber",
  "consigneecompany",
  "gstin",
  "email",
  "fulladdress",
  "landmark",
  "country",
  "state",
  "city",
  "pincode",
  "orderid",
  "channel",
  "productDetails",
  "payment_mode",
  "shipping_charges",
  "cod_charges",
  "discount",
  "gift_wrap_charges",
  "other_charges",
  "total_amount",
  "order_value",
  "tax_amount",
  "pickup_fullname",
  "pickup_phonenumber",
  "pickup_email",
  "pickup_fulladdress",
  "pickup_landmark",
  "pickup_country",
  "pickup_state",
  "pickup_city",
  "pickup_pincode",
  "dead_weigth",
  "volumetric_weigth",
  "length",
  "breath",
  "height",
];

const FileUpload = () => {
  const [jsonData, setJsonData] = useState(null);
  const navigate = useNavigate();
  const [bulkUploadOrder, { isLoading, isSuccess, isError, data, error }] =
    useBulkUploadOrderMutation();

  useEffect(() => {
    if (isSuccess === true && data.statusCode === 200) {
      toast.success(data.orderResponse, {
        autoClose: "2000",
        onClose: () => navigate("/order"),
      });
    } else if (isError === true) {
      toast.error("something went wrong", { autoClose: "2000" });
    }
  }, [data, error]);

  const validateHeaders = (fileExtension, uploadedHeaders) => {
    const newArrray = expectedHeaders.filter((elem) => {
      return !uploadedHeaders.includes(elem);
    });
    if (Object.keys(newArrray).length > 0) {
      return `Invalid ${fileExtension} file format`;
    } else {
      return "";
    }
  };

  const validateFields = (fileExtension, data) => {
    for (let elem of data) {
      const {
        fullname,
        email,
        phonenumber,
        pincode,
        fulladdress,
        landmark,
        city,
        state,
        country,
      } = elem;
      const obj = {
        fullname,
        email,
        phonenumber,
        pincode,
        fulladdress,
        landmark,
        city,
        state,
        country,
      };
      const rowValues = Object.values(obj);
      const newRowValues = rowValues.filter((elem) => elem === undefined);

      if (newRowValues.length > 0) {
        return `please fill all required filed data row on ${fileExtension} file`;
      } else {
        return "";
      }
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("file", file, "filename", file.name);
    const fileExtension = file.name.split(".").pop().toLowerCase();

    const processFile = (data) => {
      console.log("data", data);
      // Map your data to the required JSON format

      const formattedData = data.map((row) => {
        return {
          consigneeDetails: {
            fullname: row.fullname || "",
            phonenumber: row.phonenumber || "",
            alternatephonenumber: row.alternatephonenumber || "",
            consigneecompany: row.consigneecompany || "",
            gstin: row.gstin || "",
            email: row.email || "",
            fulladdress: row.fulladdress || "",
            landmark: row.landmark || "",
            country: "India",
            state: row.state || "",
            city: row.city || "",
            pincode: row.pincode || "",
          },
          orderDetails: {
            orderid: row.orderid || "",
            channel: row.channel || "",
            productDetails: JSON.parse(row.productDetails || "[]"),
            payment_mode: row.payment_mode || "prepaid",
            shipping_charges: parseFloat(row.shipping_charges || 0),
            cod_charges: parseFloat(row.cod_charges || 0),
            discount: parseFloat(row.discount || 0),
            gift_wrap_charges: parseFloat(row.gift_wrap_charges || 0),
            other_charges: parseFloat(row.other_charges || 0),
            total_amount: parseFloat(row.total_amount || 100),
            order_value: parseFloat(row.order_value || 100),
            tax_amount: parseFloat(row.tax_amount || 0),
          },

          pickupDetails: {
            fullname: row.pickup_fullname || "",
            phonenumber: row.pickup_phonenumber || "",
            email: row.pickup_email || "",
            fulladdress: row.pickup_fulladdress || "",
            landmark: row.pickup_landmark || "",
            country: row.pickup_country || "",
            state: row.pickup_state || "",
            city: row.pickup_city || "",
            pincode: row.pickup_pincode || "",
          },
          packageDetails: {
            dead_weigth: parseFloat(row.dead_weigth || 0),
            volumetric_weigth: parseFloat(row.volumetric_weigth || 0),
            length: parseFloat(row.length || 0),
            breath: parseFloat(row.breath || 0),
            height: parseFloat(row.height || 0),
          },
        };
      });
      console.log("formatedData", formattedData);
      console.log("jsonData", JSON.stringify(formattedData, null, 2));
      bulkUploadOrder(formattedData);
      setJsonData(formattedData);
    };
    const handleValidationError = (message) => {
      console.log("error", message);
      toast.error(message, { autoClose: 5000 });
    };

    if (fileExtension === "csv") {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          console.log("result", result);
          const uploadedHeaders = result.meta.fields || [];
          const validation = validateHeaders(fileExtension, uploadedHeaders);

          if (validation) {
            handleValidationError(validation);
            return;
          }
          const parsingData = validateFields(fileExtension, result.data);
          if (parsingData) {
            handleValidationError(parsingData);
            return;
          }

          if (result.errors.length > 0) {
            toast.error("Error parsing CSV file");
            return;
          }

          processFile(result.data);
        },
        error: (error) => {
          toast.error("Error reading CSV file");
        },
      });
    } else if (["xls", "xlsx"].includes(fileExtension)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Get headers from first row
          const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
          const sheetData = XLSX.utils.sheet_to_json(worksheet);
          const validation = validateHeaders(fileExtension, headers);

          if (validation) {
            handleValidationError(validation);
            return;
          }
          const parsingData = validateFields(fileExtension, sheetData);
          if (parsingData) {
            handleValidationError(parsingData);
            return;
          }

          processFile(sheetData);
        } catch (error) {
          toast.error("Error reading Excel file");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      toast.error(
        "Invalid file type. Please upload a .csv, .xlsx, or .xls file."
      );
    }
  };

  return (
    <div className=" flex  flex-col">
      <div className="flex justify-end pr-8 pt-8">
        <a
          href="/Orders.xlsx"
          download="bulk upload sample file.xlsx"
          class="text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center  bg-gray-100  text-black"
        >
          <MdOutlineFileDownload />
          Download Template
        </a>
      </div>
      <div className="p-8 bg-white w-[100%]">
        <div className="flex flex-col gap-2 justify-center h-[250px]  bg-gray-100 w-[100%]">
          <span>
            <FaCloudDownloadAlt className="mx-auto" />
          </span>
          <span className="text-sm mx-auto">
            Drag and drop to upload file here
          </span>
          <span className="text-sm mx-auto">or</span>
          <label
            for="fileupload"
            variant="contained"
            className="text-sm mx-auto px-2 font-normal py-3 w-[15%] rounded-sm  cursor-pointer flex gap-2 items-center justify-center bg-slate-900  text-white"
            title="upload .xlsx or xls or csv file"
          >
            Browser and upload file
          </label>
          <span className="text-sm mx-auto">
            Only accepts .xls, .xslx or .csv formats
          </span>
          <input
            className="hidden"
            id="fileupload"
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={handleFileUpload}
          />
        </div>
      </div>
      <h4 className="pl-8">Instruction</h4>
      <ul className="text-sm flex gap-2 flex-col p-8">
        <li>
          Download the sample file and replace its data with your order data.
          Save the file and upload it back.
        </li>
        <li>Make sure all mandatory fields are filled in the sheet.</li>
        <li>
          You can view the successfully uploaded orders in the Orders tab.
        </li>
      </ul>
      {console.log(isLoading, isSuccess, isError, data, error)}
    </div>
  );
};

export default FileUpload;

import * as XLSX from "xlsx";
import React from "react";
import { useSelector } from "react-redux";
import { MdOutlineFileDownload } from "react-icons/md";
import { saveAs } from "file-saver";

const GenerateExcel = () => {
  const Data = useSelector(
    (state) => state["rootReducer"]["orderSlice"]["exportOrder"]
  );
  const getNestedValue = (obj, key, defaultValue = "") =>
    obj ? obj[key] || defaultValue : defaultValue;
  const handleDownload = () => {
    const JsonData = Data.map((elem) => {
      const { consigneeDetails, pickupDetails, packageDetails, orderDetails } =
        elem;
      return {
        fullname: consigneeDetails.fullname,
        phonenumber: consigneeDetails.phonenumber,
        alternatephonenumber: consigneeDetails.alternatephonenumber,
        consigneecompany: consigneeDetails.consigneecompany,
        gstin: consigneeDetails.gstin,
        email: consigneeDetails.email,
        fulladdress: consigneeDetails.fulladdress,
        country: consigneeDetails.country,
        state: consigneeDetails.state,
        city: consigneeDetails.city,
        pincode: consigneeDetails.pincode,
        pickup_person_name: pickupDetails.pickup_person_name,
        pickup_person_phone: pickupDetails.pickup_person_phone,
        pickup_person_email: pickupDetails.pickup_person_email,
        pickup_address: pickupDetails.pickup_address,
        pickup_landmark: pickupDetails.pickup_landmark,
        pickup_country: pickupDetails.pickup_country,
        pickup_state: pickupDetails.pickup_state,
        pickup_city: pickupDetails.pickup_city,
        orderid: orderDetails.orderid,
        channel: orderDetails.channel,
        productDetails:
          orderDetails.productDetails !== "" &&
          orderDetails.productDetails.length > 0
            ? orderDetails.productDetails
                .map((product) => `${product.name} (x${product.quantity})`)
                .join(", ")
            : "",
        payment_mode: orderDetails.payment_mode,
        total_amount: orderDetails.total_amount,
        order_value: orderDetails.order_value,
        tax_amount: orderDetails.tax_amount,
        dead_weight: packageDetails.dead_weigth, // Correct this typo in data if possible
        length: packageDetails.length,
        breath: packageDetails.breath,
        height: packageDetails.height,
        order_status: elem.order_status,
      };
    });
    const exampleData = [
      {
        fullname: "John Doe",
        phonenumber: 1234567890,
        alternatephonenumber: "9876543210",
        consigneecompany: "Acme Inc.",
        gstin: "27AAEPM",
        email: "example@example.com",
        fulladdress: "123 Street Name",
        landmark: "Near Park",
        country: "India",
        state: "Karnataka",
        city: "Bangalore",
        pincode: "560001",
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
        orderid: "ORD123",
        channel: "Amazon",
        productDetails: [
          {
            name: "Product1",
            price: 100,
            quantity: 1,
            sku_code: "SKU001",
          },
        ],
        payment_mode: "prepaid",
        shipping_charges: 50,
        cod_charges: 0,
        discount: 10,
        gift_wrap_charges: 5,
        other_charges: 0,
        total_amount: 165,
        order_value: 150,
        tax_amount: 15,
        dead_weigth: 1.2,
        volumetric_weigth: 3.2,
        length: 10,
        breath: 10,
        height: 20,
        order_status: "new",
      },
    ];

    // Convert data to worksheet
    console.log("jsonData", JSON.stringify(JsonData));

    console.log("exampleData", exampleData);
    const worksheet = XLSX.utils.json_to_sheet(JsonData);
    console.log("worksheet", worksheet);
    // Set column widths
    worksheet["!cols"] = [
      { wch: 20 }, // Full Name
      { wch: 15 }, // Phone Number
      { wch: 20 }, // Alternate Phone Number
      { wch: 25 }, // Consignee Company
      { wch: 15 }, // GSTIN
      { wch: 30 }, // Email
      { wch: 40 }, // Full Address
      { wch: 20 }, // Landmark
      { wch: 10 }, // Country
      { wch: 15 }, // State
      { wch: 15 }, // City
      { wch: 10 }, // Pincode
      { wch: 15 }, // Order ID
      { wch: 15 }, // Channel
      { wch: 50 }, // Product Details
      { wch: 10 }, // Payment Mode
      { wch: 15 }, // Shipping Charges
      { wch: 15 }, // COD Charges
      { wch: 10 }, // Discount
      { wch: 15 }, // Gift Wrap Charges
      { wch: 15 }, // Other Charges
      { wch: 15 }, // Total Amount
      { wch: 15 }, // Order Value
      { wch: 15 }, // Tax Amount
      { wch: 25 }, // Date Created
      { wch: 20 }, // Full Name
      { wch: 15 }, // Phone Number
      { wch: 20 }, // Alternate Phone Number
      { wch: 25 }, // Consignee Company
      { wch: 15 }, // GSTIN
      { wch: 30 }, // Email
      { wch: 40 }, // Full Address
      { wch: 20 }, // Landmark
      { wch: 10 }, // Country
      { wch: 15 }, // State
      { wch: 15 }, // City
      { wch: 10 }, // Pincode
      { wch: 15 }, // Order ID
      { wch: 15 }, // Channel
      { wch: 50 }, // Product Details
      { wch: 10 }, // Payment Mode
      { wch: 15 }, // Shipping Charges
      { wch: 15 }, // COD Charges
      { wch: 10 }, // Discount
      { wch: 15 }, // Gift Wrap Charges
    ];

    // Style cells to align left
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    console.log("range", range);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = XLSX.utils.encode_cell({ r: R, c: C });
        console.log(cell_address);
        if (!worksheet[cell_address]) continue;
        worksheet[cell_address].s = {
          alignment: { horizontal: "left" }, // Align cells to the left
        };
      }
    }
    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    console.log(workbook, worksheet, "Orders");
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    // Write workbook and trigger download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    console.log("ecelBuffer", excelBuffer);
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Orders.xlsx");
    console.log(blob);
  };
  console.log("redux data on export order page", Data);

  return (
    <>
      <button
        class={`text-sm font-normal py-2 px-3 rounded-sm ${
          Data.length > 0
            ? "cursor-pointer"
            : "cursor-no-drop disabled:text-gray-400"
        }  flex gap-2 items-center bg-gray-100 w-[15%] justify-center  disabled:bg-gray-100`}
        onClick={handleDownload}
        disabled={Data.length > 0 ? false : true}
      >
        <MdOutlineFileDownload />
        Export Orders
      </button>
    </>
  );
};

export default GenerateExcel;

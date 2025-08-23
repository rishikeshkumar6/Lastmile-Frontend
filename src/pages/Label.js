import React, { useState, useRef, useEffect } from "react";
import { Download } from "lucide-react";
import { useParams } from "react-router-dom";
import ShippingLabel from "../components/userDashboardComponents/ShippingLabelGenerator";
import html2pdf from "html2pdf.js";
import { useGenerateLabelMutation } from "../Redux/Action";
import Sidebar from "../components/Sidebar";

function Label() {
  const [showLabel, setShowLabel] = useState(false);
  const [generateLabel, { isLoading, isSuccess, data, isError, error }] =
    useGenerateLabelMutation();
  const params = useParams();
  const { id } = params;
  const [scannedData, setScannedData] = useState(null);
  const [labelData, setLabelData] = useState({
    shipTo: {
      name: "Moksh Jaswal",
      address: "House No. 45, Palm Enclave, Rajouri Garden",
      city: "New Delhi, 110027, India",
      phone: "9871178775",
    },
    shipFrom: {
      company: "Warehousity",
      name: "Moksh Jaswal",
      address: "House No. 45, Palm Enclave, Rajouri Garden",
      city: "New Delhi, 110027, India",
      phone: "9871178775",
    },
    package: {
      dimensions: "10 x 10 x 10 cm",
      weight: "0.5 kg",
      date: "10 Apr 2024, 05:03:26",
      paymentMode: "Prepaid",
    },
    courier: {
      name: "Delhivery",
      awb: "3306837002",
    },
    order: {
      id: "3075",
      amount: 100,
    },
    products: [
      {
        name: "Product 1",
        quantity: 1,
        price: 100,
      },
    ],
  });
  const labelRef = useRef(null);
  console.log("params", params);
  useEffect(() => {
    generateLabel({ id: id });
  }, [id]);

  useEffect(() => {
    if (isSuccess === true && data !== undefined) {
      const {
        consigneeDetails,
        pickupDetails,
        orderDetails,
        packageDetails,
        shippingInfo,
      } = data.orderRes;

      const totalAmmount =
        orderDetails !== null
          ? orderDetails.productDetails.length > 0
            ? orderDetails.productDetails.reduce((prev, curr) => {
                return prev + curr.price * curr.quantity;
              }, 0)
            : "N/A"
          : "N/A";
      const shippingCharges =
        orderDetails !== null
          ? orderDetails.cod_charges +
            orderDetails.gift_wrap_charges +
            orderDetails.other_charges +
            orderDetails.shipping_charges
          : "N/A";

      setLabelData({
        shipTo: {
          name:
            pickupDetails !== null
              ? pickupDetails.pickup_person_name !== ""
                ? pickupDetails.pickup_person_name
                : "N/A"
              : "N/A",
          address:
            pickupDetails !== null
              ? pickupDetails.pickup_address !== ""
                ? pickupDetails.pickup_address
                : "N/A"
              : "N/A",
          city:
            pickupDetails !== null
              ? pickupDetails.pickup_city !== ""
                ? pickupDetails.pickup_city
                : "N/A"
              : "N/A",
          phone:
            pickupDetails !== null
              ? pickupDetails.pickup_person_phone !== ""
                ? pickupDetails.pickup_person_phone
                : "N/A"
              : "N/A",
        },
        shipFrom: {
          company:
            consigneeDetails.consigneecompany !== ""
              ? consigneeDetails.consigneecompany
              : "N/A",
          name:
            consigneeDetails.fullname !== ""
              ? consigneeDetails.fullname
              : "N/A",
          address:
            consigneeDetails.fulladdress !== ""
              ? consigneeDetails.fulladdress
              : "N/A",
          city: consigneeDetails.city !== "" ? consigneeDetails.city : "N/A",
          phone:
            consigneeDetails.phonenumber !== ""
              ? consigneeDetails.phonenumber
              : "N/A",
        },
        package: {
          dimensions: "10 x 10 x 10 cm",
          weight:
            packageDetails !== null
              ? packageDetails.dead_weigth !== ""
                ? packageDetails.dead_weigth
                : "N/A"
              : "N/A",
          date: "10 Apr 2024, 05:03:26",
          paymentMode:
            orderDetails !== null ? orderDetails.payment_mode : "N/A",
        },
        courier: {
          name: shippingInfo?.courier_partner,
          awb: shippingInfo?.awb_number,
        },
        order: {
          id:
            orderDetails !== null
              ? orderDetails.orderid !== ""
                ? orderDetails.orderid
                : "N/A"
              : "N/A",
          amount: totalAmmount + shippingCharges,
          paymentMode:
            orderDetails !== null ? orderDetails.payment_mode : "N/A",
        },
        products:
          orderDetails !== null
            ? orderDetails.productDetails !== ""
              ? orderDetails.productDetails
              : "N/A"
            : "N/A",
      });
    }
  }, [data]);

  const handleDownloadPDF = () => {
    if (labelRef.current) {
      console.log("label checking", "checking label");
      const element = labelRef.current;
      console.log("label created", element);
      const opt = {
        margin: 0,
        filename: `shipping-label-${labelData.order.id}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: [5, 7.5], orientation: "portrait" },
      };

      html2pdf().set(opt).from(element).save();
    }
  };

  const handleScan = (data) => {
    if (data === labelData.courier.awb) {
      setScannedData(labelData);
    } else {
      alert("Scanned barcode does not match the shipping label AWB");
    }
  };

  return (
    <section className="flex gap-6">
      <Sidebar />

      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 md:p-8 m-[auto]">
        <div className="flex gap-5">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4">
              Shipping Label Generator
            </h1>
            <p className="mb-6">
              Click the button below to generate a shipping label for your
              package.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowLabel(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Generate Shipping Label
              </button>

              {showLabel && (
                <>
                  <button
                    onClick={handleDownloadPDF}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2"
                  >
                    <Download size={18} />
                    Download Label
                  </button>
                </>
              )}
            </div>
          </div>

          {showLabel && (
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 print:p-0 print:shadow-none">
              <div className="mb-4 print:hidden">
                <h2 className="text-lg font-semibold mb-2">
                  Shipping Label Preview
                </h2>
                <p className="text-sm text-gray-600">
                  Click the Download button above to save this label as PDF.
                </p>
              </div>

              <div className="flex justify-center " ref={labelRef}>
                <ShippingLabel {...labelData} />
              </div>
            </div>
          )}
        </div>

        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-section,
            .print-section * {
              visibility: visible;
            }
            .print-section {
              position: absolute;
              left: 0;
              top: 0;
            }
          }
        `}</style>
      </div>
      {console.log({ isLoading, isSuccess, data, isError, error })}
    </section>
  );
}

export default Label;

import React, { useState, useRef } from "react";
import { Download, Printer, Scan } from "lucide-react";
import ShippingLabel from "../components/userDashboardComponents/ShippingLabelGenerator";
import BarcodeScanner from "../components/userDashboardComponents/BarcodeScanner";
import html2pdf from "html2pdf.js";
import Sidebar from "../components/Sidebar";

function Label() {
  const [showLabel, setShowLabel] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const labelRef = useRef(null);

  const labelData = {
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
        amount: 100,
      },
    ],
  };

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
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Shipping Label Generator</h1>
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

                <button
                  onClick={() => setShowScanner(!showScanner)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2"
                >
                  <Scan size={18} />
                  {showScanner ? "Hide Scanner" : "Scan Barcode"}
                </button>
              </>
            )}
          </div>
        </div>

        {showScanner && (
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
            <BarcodeScanner onScan={handleScan} />
          </div>
        )}

        {scannedData && (
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Scanned Data</h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
              {JSON.stringify(scannedData, null, 2)}
            </pre>
          </div>
        )}

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
    </section>
  );
}

export default Label;

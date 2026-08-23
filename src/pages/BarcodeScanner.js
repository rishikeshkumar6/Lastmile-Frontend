import React, { useState } from "react";
import BarcodeScanner from "../components/userDashboardComponents/BarcodeScanner";
import Sidebar from "../components/Sidebar";
import { Scan } from "lucide-react";

const Barcode = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState(null);

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
      <div className="m-[auto] p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Barcode Scanner</h1>
          <p className="mb-6">
            Click the button below to scan a barcode label for your package.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowScanner(!showScanner)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2"
            >
              <Scan size={18} />
              {showScanner ? "Hide Scanner" : "Show Barcode"}
            </button>
          </div>
        </div>
        {showScanner && (
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
            <BarcodeScanner onScan={handleScan} />
          </div>
        )}
      </div>
      {console.log("scannedData", scannedData)}
    </section>
  );
};

export default Barcode;

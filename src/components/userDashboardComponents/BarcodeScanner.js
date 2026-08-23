import React, { useEffect, useRef, useState } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onScan, onError }) => {
  const scannerRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScanner = () => {
    if (scannerRef.current) {
      console.log(scannerRef.current);
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerRef.current,
            constraints: {
              width: 480,
              height: 320,
              facingMode: "environment",
            },
          },
          locator: {
            patchSize: "medium",
            halfSample: true,
          },
          numOfWorkers: 2,
          decoder: {
            readers: [
              "code_128_reader",
              "ean_reader",
              "ean_8_reader",
              "code_39_reader",
              "code_39_vin_reader",
              "codabar_reader",
              "upc_reader",
              "upc_e_reader",
              "i2of5_reader",
            ],
          },
          locate: true,
        },
        (err) => {
          if (err) {
            if (onError) onError(err);
            return;
          }
          Quagga.start();
          setIsScanning(true);
        }
      );

      Quagga.onDetected((result) => {
        console.log("quagga result", result);
        if (result && result.codeResult) {
          onScan(result.codeResult.code || "");
          playSuccessSound();
          stopScanner();
        }
      });
    }
  };

  const stopScanner = () => {
    Quagga.stop();
    setIsScanning(false);
  };

  const playSuccessSound = () => {
    const utterance = new SpeechSynthesisUtterance(
      "Order is shipped successfully"
    );
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if (isScanning) {
        Quagga.stop();
      }
    };
  }, [isScanning]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Barcode Scanner</h2>
        {!isScanning ? (
          <button
            onClick={startScanner}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Start Scanner
          </button>
        ) : (
          <button
            onClick={stopScanner}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Stop Scanner
          </button>
        )}
      </div>
      <div
        ref={scannerRef}
        className={`w-full h-64 bg-gray-200 rounded-lg overflow-hidden relative ${
          isScanning ? "border-2 border-blue-500" : ""
        }`}
      >
        {!isScanning && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Click "Start Scanner" to scan a barcode
          </div>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Position the barcode within the scanner view to scan.
      </p>
    </div>
  );
};

export default BarcodeScanner;

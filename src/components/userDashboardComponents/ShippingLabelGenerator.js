import React, { useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import { Printer } from "lucide-react";

const ShippingLabel = ({
  shipTo,
  shipFrom,
  package: packageDetails,
  courier,
  order,
  products,
}) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, courier.awb, {
        format: "CODE128",
        width: 1.5,
        height: 40,
        displayValue: false,
      });
    }
  }, [courier.awb]);

  const totalAmount = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="text-[11px] max-w-[700px] border border-black w-full md:w-[5in] h-auto md:h-[7.5in] flex flex-col print:w-[5in] print:h-[7.5in] print-section">
      <div className="flex flex-wrap md:flex-nowrap items-center">
        <div className="flex flex-col p-6 w-full md:max-w-[50%]">
          <h1 className="font-bold">Ship To :</h1>
          <span>{shipTo.name}</span>
          <span>{shipTo.address}</span>
          <span>{shipTo.city}</span>
          <span className="mt-3">
            <b>Phone</b> - {shipTo.phone}
          </span>
        </div>
        <div className="flex justify-center w-full md:w-[250px] items-center p-4">
          <svg ref={barcodeRef} className="w-full"></svg>
        </div>
      </div>
      <div className="border-t border-b border-black p-4 md:p-6 flex flex-wrap md:flex-nowrap justify-between items-center">
        <div className="flex flex-col gap-1 w-full md:max-w-[45%] mb-4 md:mb-0">
          <span>
            <b>Dimensions</b>: {packageDetails.dimensions}
          </span>
          <span>
            <b>Weight</b>: {packageDetails.weight}
          </span>
          <span>
            <b>Date</b>: {packageDetails.date}
          </span>
          <span>
            <b>Payment Mode</b>: {packageDetails.paymentMode}
          </span>
        </div>
        <div className="flex flex-col w-full md:max-w-[55%] md:flex-1">
          <span>
            <b>Courier</b> - {courier.name}
          </span>
          <span>
            <b>AWB</b> - {courier.awb}
          </span>
        </div>
      </div>
      <div className="p-4 md:p-5 border-black flex flex-wrap md:flex-nowrap justify-between items-center">
        <div className="flex flex-col w-full md:w-auto mb-4 md:mb-0">
          <h1>
            <b>Shipped By</b>: ( if undelivered, return to )
          </h1>
          <span>{shipFrom.company}</span>
          <span>{shipFrom.name}</span>
          <span>{shipFrom.address}</span>
          <span>{shipFrom.city}</span>
          <span className="mt-3">
            <b>Mobile Number</b> - {shipFrom.phone}
          </span>
        </div>
        <div className="flex flex-col pr-0 md:pr-10 w-full md:w-[200px] items-center">
          <span>
            <b>Order ID</b>: {order.id}
          </span>
          <div className="text-center mt-2">
            <h1 className="font-bold text-[20px]">PREPAID</h1>
            <h1 className="font-bold text-[18px]">₹ {order.amount}</h1>
          </div>
        </div>
      </div>
      <div className="flex-1 border-t border-black p-3 md:p-5 text-[10px]">
        <table className="w-full">
          <thead className="bg-base-100 py-3">
            <tr>
              <th className="w-[35%] py-3 text-left px-5">Product Name</th>
              <th className="w-[15%] py-3 text-left px-5">QTY</th>
              <th className="w-[15%] text-right px-5">Amount</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="px-5 py-4">{`${product.name.slice(
                  0,
                  15
                )}...`}</td>
                <td className="px-5">{product.quantity}</td>
                <td className="text-right py-4 px-5">₹{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex pr-5 justify-end mt-5">
          <b>Total</b>: ₹{totalAmount}
        </div>
      </div>
      <div className="border-b border-t px-3 md:px-5 py-2 md:py-3 text-[9px] border-black flex gap-4 md:gap-10 items-center text-center">
        All disputes will be resolved under Delhi jurisdiction. Sold goods are
        eligible for return or exchange according to the store's policy.
      </div>
      <div className="px-3 md:px-5 py-2 md:py-3 text-[9px] text-center">
        Powered by <b>Last Miles @ Warehousity</b>.
      </div>
    </div>
  );
};

export default ShippingLabel;

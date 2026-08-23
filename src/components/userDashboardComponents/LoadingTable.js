import React from "react";

const LoadingTable = ({ tabletype }) => {
  return (
    <table className="w-full text-left leading-5">
      <thead className="bg-gray-50 border-2 border-gray-200">
        {tabletype === "shippingtable" && (
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Courier Partner
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Expected Pickup
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Estimited Delivery
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Chargeable Weight
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Charges
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Action
            </th>
          </tr>
        )}
        {tabletype === "walletTable" && (
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              S.No.
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Date Time
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Transaction ID
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Credit
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Debit
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Balance
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
          </tr>
        )}

        {!tabletype && (
          <tr>
            <th className="p-3 text-sm">Order Details</th>
            <th className="p-3 text-sm">Pickup Details</th>
            <th className="p-3 text-sm">Consignee Details</th>
            <th className="p-3 text-sm">Product Details</th>
            <th className="p-3 text-sm">Package Details</th>
            <th className="p-3 text-sm">Payment Mode</th>
            <th className="p-3 text-sm">Status</th>
            <th className="p-3 text-sm">Action</th>
          </tr>
        )}
        {tabletype === "pickuplocation" && (
          <tr>
            <th className="p-3 text-sm">Pickup Location Code</th>

            <th className="p-3 text-sm">Location Type</th>
            <th className="p-3 text-sm">Contact Details</th>
            <th className="p-3 text-sm">Address</th>
            <th className="p-3 text-sm">Status</th>
            <th className="p-3 text-sm">Action</th>
          </tr>
        )}

        {tabletype === "producttable" && (
          <tr>
            <th className="p-3 text-sm border-2">Channel</th>
            <th className="p-3 text-sm border-2">Product Name</th>

            <th className="p-3 text-sm border-2">Category</th>
            <th className="p-3 text-sm border-2">Sku Code</th>
            <th className="p-3 text-sm border-2">Hsn Code</th>
            <th className="p-3 text-sm border-2">Batch No</th>

            <th className="p-3 text-sm border-2">Expiry Date</th>
            <th className="p-3 text-sm border-2">price</th>
            <th className="p-3 text-sm border-2">Dimensions/Weight</th>
            <th className="p-3 text-sm border-2">Action</th>
          </tr>
        )}
      </thead>
      <tbody className="bg-white border-2">
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <tr
              key={index}
              className={`${
                (index + 1) % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <td className="p-3 text-[0.8rem] font-[500]">
                <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
              </td>
              <td className="p-3 text-[0.8rem]">
                <div className="flex flex-col gap-1">
                  <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                  <div className="flex flex-col gap-1">
                    <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                    <div className="w-32 h-4 bg-gray-300 animate-pulse rounded"></div>
                  </div>
                </div>
              </td>
              <td className="p-3 text-[0.8rem]">
                <div className="flex flex-col gap-1">
                  <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                  <div className="flex flex-col gap-1">
                    <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                    <div className="w-32 h-4 bg-gray-300 animate-pulse rounded"></div>
                  </div>
                </div>
              </td>
              <td className="p-3 text-[0.8rem]">
                <div className="flex flex-col gap-1">
                  <div className="w-32 h-4 bg-gray-300 animate-pulse rounded"></div>
                  <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                  <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                </div>
              </td>
              <td className="p-3 text-[0.8rem]">
                <div className="flex flex-col gap-1">
                  <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                  <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                  <div className="w-20 h-4 bg-gray-300 animate-pulse rounded"></div>
                </div>
              </td>
              <td className="p-3 text-[0.8rem]">
                <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
              </td>
              <td className="p-3 text-[0.8rem]">
                <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
              </td>
              <td className="p-3 text-[0.8rem]">
                <div className="w-24 h-8 bg-gray-300 animate-pulse rounded"></div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default LoadingTable;

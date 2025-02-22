import React from "react";

const LoadingTable = () => {
  return (
    <table className="w-full text-left leading-5">
      <thead className="bg-gray-50 border-2 border-gray-200">
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

import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";

const ErrorTable = () => {
  return (
    <div className="h-[400px] flex items-center justify-center bg-white flex-col gap-5">
      <img src="/no_orders_found.webp" alt="err" className="w-[20%]" />

      <span>No Orders Found</span>
    </div>
  );
};

export default ErrorTable;

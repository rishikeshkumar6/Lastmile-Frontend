import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";

const ErrorTable = ({ className, w, errorMessage }) => {
  return (
    <div className={className}>
      <img src="/no_orders_found.webp" alt="err" className={`w-[${w}]`} />

      <span>{errorMessage}</span>
    </div>
  );
};

export default ErrorTable;

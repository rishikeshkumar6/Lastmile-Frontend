import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";

const ErrorTable = () => {
  return (
    <div className="h-[400px] flex items-center justify-center bg-white">
      <div className="flex flex-col gap-5 justify-center align-center">
        <span className="text-[25px] flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto">
          {" "}
          <MdErrorOutline className="text-red-500 " />
        </span>
        <div className="flex flex-col gap-2 mx-auto">
          <span className="font-bold text-red-800">Unable to load orders</span>
          <span className="text-sm text-red-600 text-center mx-auto">
            please try again or refresh the page
          </span>
        </div>
        <button className="w-[40%] bg-red-200 flex items-center justify-center gap-2 px-4 py-2 text-[15px] rounded-md text-red-600 mx-auto">
          {" "}
          <span>
            <HiOutlineRefresh />
          </span>
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorTable;

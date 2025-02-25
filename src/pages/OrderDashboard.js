import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import Pagination from "@mui/material/Pagination";
import { useLazyGetAllOrderQuery } from "../Redux/Action";
import Stack from "@mui/material/Stack";
import { HiOutlineRefresh } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { order } from "../Redux/exportOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DataTable from "../components/userDashboardComponents/DataTable";
import LoadingTable from "../components/userDashboardComponents/LoadingTable";
import ErrorTable from "../components/userDashboardComponents/ErrorTable";
import GenerateExcel from "../components/userDashboardComponents/ExportOrder";

const Order = () => {
  const dispatch = useDispatch();
  const Data = useSelector(
    (state) => state["rootReducer"]["orderSlice"]["exportOrder"]
  );
  const [cancelOrder, setCancelOrder] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [activeButton, setActiveButton] = useState("new");
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [getAllOrder, { isLoading, isSuccess, isError, data, error }] =
    useLazyGetAllOrderQuery();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("useEffect called with:", searchInput);
    getAllOrder({ page, searchInput, activeButton }, { force: true });
  }, [page, searchInput, activeButton]);

  const handleActiveButton = (status) => {
    switch (status) {
      case "new":
        return setActiveButton("new");
      case "Booked":
        return setActiveButton("Booked");
      case "Pickup/Mainfest":
        return setActiveButton("Pickup/Mainfest");
      case "In Transit":
        return setActiveButton("In Transit");
      case "Out For Deleivery":
        return setActiveButton("Out For Deleivery");
      case "Deleivered":
        return setActiveButton("Deleivered");
      case "Return To Origin":
        return setActiveButton("Return To Origin");
      case "Non Deleivery Report":
        return setActiveButton("Non Deleivery Report");
      case "Cancel Order":
        return setActiveButton("Cancel Order");
      case "All Orders":
        return setActiveButton("All Orders");
    }
  };
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleClick = () => {
    if (!selectAll) dispatch(order({ bulkOrder: data.orderRes }));
    setSelectAll(!selectAll);
    if (selectAll) dispatch(order({ bulkOrder: [] }));
    setSelectAll(!selectAll);
  };

  const debouncedHandleChange = debounce(handleChange, 500);

  return (
    <section className="flex gap-6">
      <Sidebar />
      <div className="m-3 text-xl text-gray-900   w-[90%] m-[auto]">
        <div class="absolute hidden z-10 p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
              <svg
                class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this product?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between py-5 pl-14">
          <div className="flex gap-5 items-center w-[40%]">
            <form
              class="max-w-md w-[100%]"
              onSubmit={(e) => e.preventDefault()}
            >
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full py-3 px-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="search awb number,order id, email id, phone number"
                  onChange={debouncedHandleChange}
                  required
                />
              </div>
            </form>
          </div>
          <div className="flex gap-5 items-center">
            <button className="  text-sm font-normal  px-8 py-3 rounded-sm  cursor-pointer flex gap-2 items-center bg-slate-900 text-white">
              <HiOutlineRefresh className="text-[20px]" /> Sync
            </button>
            <Link to="/order/ordercreate">
              <button
                variant="contained"
                className="text-sm font-normal  px-8 py-3 rounded-sm  cursor-pointer flex gap-2 items-center bg-slate-900  text-white"
                title="add single or bulk order"
              >
                <IoCartOutline className="text-[20px]" /> Add Order
              </button>
            </Link>
          </div>
        </div>

        <ul class="flex flex-wrap text-sm gap-5 text-center pl-12 text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 pb-5">
          <span
            class={`  text-sm font-normal py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "new"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("new")}
          >
            New Order
          </span>
          <span
            class={`  text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "Booked"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("Booked")}
          >
            Booked
          </span>
          <span
            class={`text-sm font-normal py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "Pickup/Mainfest"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("Pickup/Mainfest")}
          >
            Pickup/Mainfest
          </span>
          <span
            class={`text-sm font-normal py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "In Transit"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("In Transit")}
          >
            In Transit
          </span>
          <span
            class={`text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "Out For Deleivery"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("Out For Deleivery")}
          >
            Out For Deleivery
          </span>
          <span
            class={`text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "Deleivered"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("Deleivered")}
          >
            Deleivered
          </span>
          <span
            class={`text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "Return To Origin"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("Return To Origin")}
          >
            Return To Origin
          </span>
          <span
            class={`text-sm font-normal py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "Non Deleivery Report"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("Non Deleivery Report")}
          >
            Non Deleivery Report
          </span>
          <span
            class={`text-sm font-normal py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "Cancel Order"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("Cancel Order")}
          >
            Cancel Orders
          </span>
          <span
            class={`text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
              activeButton === "All Orders"
                ? " bg-black text-white"
                : " bg-white text-black"
            }`}
            onClick={() => handleActiveButton("All Orders")}
          >
            All Orders
          </span>
        </ul>

        {isError !== true && (
          <div className="w-full px-8 py-4 bg-white">
            <div className="py-5 flex justify-end">
              <GenerateExcel />
            </div>
            {isSuccess === true &&
            Object.keys(data).length > 0 &&
            data.orderRes.length > 0 ? (
              <table className="w-full text-left leading-5 ">
                <thead className="bg-gray-50 border-2 border-gray-200">
                  <tr>
                    <th className="p-3 text-sm">
                      <input
                        type="checkbox"
                        checked={!selectAll ? false : true}
                        onClick={handleClick}
                      />
                    </th>
                    <th className="p-3 text-sm">Order Details</th>
                    <th className="p-3 text-sm">Pickup Details</th>
                    <th className="p-3 text-sm">Consignee Details</th>
                    <th className="p-3 text-sm">Product Details</th>
                    <th className="p-3 text-sm">Package Details </th>
                    <th className="p-3 text-sm">Payment Mode</th>
                    <th className="p-3 text-sm">Status</th>
                    <th className="p-3 text-sm">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white border-2">
                  {data.orderRes.map((row, index) => {
                    return (
                      <DataTable
                        data={data}
                        row={row}
                        index={index}
                        selectAll={selectAll}
                        setSelectAll={setSelectAll}
                      />
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <LoadingTable />
            )}
            {isSuccess === true &&
            Object.keys(data).length > 0 &&
            data.orderRes.length > 0 ? (
              <Stack spacing={2} className="py-5 m-[auto]">
                <Pagination
                  count={data.pageCount}
                  variant="outlined"
                  shape="rounded"
                  onChange={(event, value) => setPage(value)}
                />
              </Stack>
            ) : (
              ""
            )}
          </div>
        )}
        {isLoading === true && <LoadingTable />}
        {isError === true && <ErrorTable />}
      </div>
      {console.log(
        "rtk query state",
        isLoading,
        isSuccess,
        isError,
        data,
        error
      )}
      {console.log("search term", searchInput)}
    </section>
  );
};

export default Order;

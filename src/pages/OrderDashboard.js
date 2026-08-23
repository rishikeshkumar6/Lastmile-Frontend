import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { IoCartOutline } from "react-icons/io5";
import Pagination from "@mui/material/Pagination";
import { useGetAllOrderQuery } from "../Redux/Action";
import Stack from "@mui/material/Stack";
import { HiOutlineRefresh } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { order } from "../Redux/exportOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DataTable from "../components/userDashboardComponents/DataTable";
import LoadingTable from "../components/userDashboardComponents/LoadingTable";
import ErrorTable from "../components/userDashboardComponents/ErrorTable";
import GenerateExcel from "../components/userDashboardComponents/ExportOrder";
import ReactSelect from "../components/userDashboardComponents/ReactSelect";
import AvatarDrawer from "../components/AvatarDrawer";
import { useFreightRateMutation } from "../Redux/Action";
import { toast } from "react-toastify";

const Order = () => {
  document.title = "Order";
  const dispatch = useDispatch();
  const Data = useSelector(
    (state) => state["rootReducer"]["orderSlice"]["exportOrder"],
  );
  const [shipmentRowData, setShipmentRowData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectAll, setSelectAll] = useState(false);
  const [activeButton, setActiveButton] = useState(
    searchParams.get("status") || "new",
  );
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search_term") || "",
  );
  const [dates, setDates] = useState({
    start_date: searchParams.get("start_date") || "",
    end_date: searchParams.get("end_date") || "",
  });
  const [shipmentPopup, setShipmentPopup] = useState(false);

  const { isLoading, isSuccess, isError, data, error, refetch } =
    useGetAllOrderQuery({
      page,
      searchInput,
      activeButton,
      dates,
    });
  const [
    freightRate,
    {
      isLoading: is_ferightrare_loading,
      isSuccess: is_ferightrare_success,
      data: freight_rate_data,
      isError: is_freight_error,
      error: freight_error,
    },
  ] = useFreightRateMutation();
  const navigate = useNavigate();
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page);
    newSearchParams.set("search_term", searchInput);
    newSearchParams.set("status", activeButton);
    newSearchParams.set("start_date", dates.start_date);
    newSearchParams.set("end_date", dates.end_date);
    setSearchParams(newSearchParams);
  }, [page, searchInput, activeButton, dates]);

  const handleActiveButton = (status) => {
    switch (status) {
      case "new":
        return setActiveButton("new");
      case "booked":
        return setActiveButton("booked");
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
      case "supicious_order":
        return setActiveButton("supicious_order");
      case "all":
        return setActiveButton("all");
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
    console.log("function is execute");
    if (!selectAll) dispatch(order({ bulkOrder: data.orderRes }));
    setSelectAll(!selectAll);
    console.log("function is execute");
    if (selectAll) dispatch(order({ bulkOrder: [] }));
    setSelectAll(!selectAll);
  };

  const debouncedHandleChange = debounce(handleChange, 500);

  return (
    <>
      <AvatarDrawer
        popup={shipmentPopup}
        setPopup={setShipmentPopup}
        shipmentRowData={shipmentRowData}
        setActiveButton={setActiveButton}
        freightRate={freightRate}
        is_ferightrare_loading={is_ferightrare_loading}
        is_ferightrare_success={is_ferightrare_success}
        freight_rate_data={freight_rate_data}
        is_freight_error={is_freight_error}
        freight_error={freight_error}
      />
      <section className="flex gap-6">
        <Sidebar />
        <div className="m-3 text-xl text-gray-900   w-[90%] m-[auto]">
          <div className={`flex justify-between justify-end py-5 pl-14`}>
            <div className={`gap-5 items-center w-[40%] flex`}>
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

            <div className={` gap-5 items-center flex`}>
              <button
                className="  text-sm font-normal  px-8 py-3 rounded-sm  cursor-pointer flex gap-2 items-center bg-slate-900 text-white"
                onClick={() => {
                  refetch();
                  toast.info("Syncing data...", { autoClose: "2000" });
                }}
              >
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
            <button
              class={`  text-sm font-normal py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
                activeButton === "new"
                  ? " bg-black text-white"
                  : " bg-white text-black"
              }`}
              onClick={() => handleActiveButton("new")}
            >
              New Order
            </button>
            <button
              class={`  text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
                activeButton === "booked"
                  ? " bg-black text-white"
                  : " bg-white text-black"
              }`}
              onClick={() => handleActiveButton("booked")}
            >
              Booked
            </button>
            <button
              class={`text-sm font-normal py-2 px-3  rounded-sm  flex gap-2 items-center ${
                activeButton === "Pickup/Mainfest"
                  ? " bg-black text-white"
                  : " bg-white text-black"
              }`}
              onClick={() => handleActiveButton("Pickup/Mainfest")}
            >
              Pickup/Mainfest
            </button>
            <button
              class={`text-sm font-normal py-2 px-3  rounded-sm   flex gap-2 items-center ${
                activeButton === "In Transit"
                  ? " bg-black text-white"
                  : " bg-white text-black"
              }`}
              onClick={() => handleActiveButton("In Transit")}
            >
              In Transit
            </button>
            <button
              class={`text-sm font-normal  py-2 px-3  rounded-sm   flex gap-2 items-center ${
                activeButton === "Out For Deleivery"
                  ? " bg-black text-white"
                  : " bg-white text-black"
              }`}
              onClick={() => handleActiveButton("Out For Deleivery")}
              title="coming soon"
            >
              Out For Deleivery
            </button>
            <button
              class={`text-sm font-normal  py-2 px-3  rounded-sm flex gap-2 items-center ${
                activeButton === "Deleivered"
                  ? " bg-black text-white"
                  : " bg-white text-black"
              }`}
              onClick={() => handleActiveButton("Deleivered")}
            >
              Deleivered
            </button>
            <button
              class={`text-sm font-normal  py-2 px-3  rounded-sm flex gap-2 items-center ${
                activeButton === "Return To Origin"
                  ? " bg-black text-white"
                  : " bg-white text-black"
              }`}
              onClick={() => handleActiveButton("Return To Origin")}
              title="coming soon"
            >
              RTO
            </button>
            <button
              class={`text-sm font-normal py-2 px-3  rounded-sm flex gap-2 items-center ${
                activeButton === "Non Deleivery Report"
                  ? " bg-black text-white"
                  : " bg-white text-black"
              }`}
              onClick={() => handleActiveButton("Non Deleivery Report")}
            >
              Non Deleivery Report
            </button>
            <button
              class={`text-sm font-normal py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
                activeButton === "supicious_order"
                  ? " bg-black text-white"
                  : " bg-white text-black"
              }`}
              onClick={() => handleActiveButton("supicious_order")}
            >
              Suspicious Orders
            </button>
            <button
              class={`text-sm font-normal py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
                activeButton === "Cancel Order"
                  ? " bg-black text-white"
                  : " bg-white text-black"
              }`}
              onClick={() => handleActiveButton("Cancel Order")}
              disabled={false}
            >
              Cancel Orders
            </button>
            <button
              class={`text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center ${
                activeButton === "all"
                  ? " bg-black text-white"
                  : " bg-white text-black"
              }`}
              onClick={() => handleActiveButton("all")}
            >
              All
            </button>
          </ul>

          <div className="w-full px-8 py-4 bg-white">
            <div className="py-5 flex justify-between">
              <ReactSelect dates={dates} setDates={setDates} />
              <GenerateExcel />
            </div>

            {isSuccess === true &&
              Object.keys(data).length > 0 &&
              data.orderRes.length > 0 && (
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
                      <th className="p-3 text-sm">
                        {activeButton === "new" ||
                        activeButton === "supicious_order"
                          ? "Pickup Details"
                          : "Courier Details"}
                      </th>
                      <th className="p-3 text-sm">Consignee Details</th>
                      <th className="p-3 text-sm">Product Details</th>
                      <th className="p-3 text-sm">Package Details </th>
                      <th className="p-3 text-sm">Payment Mode</th>
                      <th className="p-3 text-sm">Status</th>
                      {activeButton !== "all" && (
                        <th className="p-3 text-sm">Action</th>
                      )}
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
                          shipmentPopup={shipmentPopup}
                          setShipmentPopup={setShipmentPopup}
                          setShipmentRowData={setShipmentRowData}
                          isError={isError}
                          isLoading={isLoading}
                          freightRate={freightRate}
                          is_ferightrare_loading={is_ferightrare_loading}
                          is_ferightrare_success={is_ferightrare_success}
                          freight_rate_data={freight_rate_data}
                          is_freight_error={is_freight_error}
                          freight_error={freight_error}
                          activeButton={activeButton}
                        />
                      );
                    })}
                  </tbody>
                </table>
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

          {isError === true && (
            <ErrorTable
              className="h-[400px] flex items-center justify-center bg-white flex-col gap-5"
              w={["20%"]}
              errorMessage={"No Order Found"}
            />
          )}
          {isLoading === true && <LoadingTable />}
        </div>
        {console.log(
          "rtk query state",
          isLoading,
          isSuccess,
          isError,
          data,
          error,
        )}
        {console.log("search term", searchInput)}
      </section>
    </>
  );
};

export default Order;

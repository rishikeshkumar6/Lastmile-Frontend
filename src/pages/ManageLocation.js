import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";

import Pagination from "@mui/material/Pagination";
import { useLazyGetAllPickupQuery } from "../Redux/Action";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import LoadingTable from "../components/userDashboardComponents/LoadingTable";
import ErrorTable from "../components/userDashboardComponents/ErrorTable";
import ManageLocationData from "../components/userDashboardComponents/ManageLocationData";
import Drawers from "../components/OrderForm/PickupDrawer";
import { FiPlus } from "react-icons/fi";

const Order = () => {
  const [open, setOpen] = useState(false);
  const [pickupData, setPickupData] = useState(null);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [getAllPickup, { isLoading, isSuccess, data, isError, error }] =
    useLazyGetAllPickupQuery();
  useEffect(() => {
    getAllPickup({ page, searchInput });
  }, [page, searchInput]);

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

  const debouncedHandleChange = debounce(handleChange, 500);

  return (
    <>
      <Drawers
        open={open}
        setOpen={setOpen}
        pickupData={pickupData}
        editMode={true}
      />
      <section className="flex gap-6">
        <Sidebar />
        <div className="m-3 text-xl text-gray-900   w-[90%] m-[auto]">
          <div className="w-full px-8 py-4 bg-white">
            <div
              className={`py-5 flex ${
                isSuccess && data.pickupResponse.length > 0
                  ? "justify-between"
                  : "justify-end"
              }`}
            >
              <div className="flex  w-[40%]">
                {isSuccess === true && data.pickupResponse.length > 0 && (
                  <div className="flex gap-5 items-center w-[100%]">
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
                          placeholder="search by location, phonenumber, email, pincode"
                          onChange={debouncedHandleChange}
                          required
                        />
                      </div>
                    </form>
                  </div>
                )}
              </div>
              <button
                variant="contained"
                className="text-sm  px-2 font-normal py-3 w-[20%] rounded-sm  cursor-pointer flex gap-2 items-center justify-center bg-slate-900  text-white"
                onClick={() => setOpen(!open)}
              >
                <FiPlus /> Add Pickup Location
              </button>
            </div>

            <table className="w-full text-left leading-5 ">
              {isSuccess === true && data.pickupResponse.length > 0 && (
                <thead className="bg-gray-50 border-2 border-gray-200">
                  <tr>
                    <th className="p-3 text-sm">Pickup Location Code</th>

                    <th className="p-3 text-sm">Location Type</th>
                    <th className="p-3 text-sm">Contact Details</th>
                    <th className="p-3 text-sm">Address</th>
                    <th className="p-3 text-sm">Status</th>
                    <th className="p-3 text-sm">Action</th>
                  </tr>
                </thead>
              )}
              <tbody
                className={`bg-white ${
                  isSuccess === true && data.pickupResponse.length > 0
                    ? "border-2"
                    : ""
                }`}
              >
                {isSuccess === true ? (
                  data.pickupResponse.length > 0 ? (
                    data.pickupResponse.map((row, index) => {
                      return (
                        <ManageLocationData
                          row={row}
                          index={index}
                          open={open}
                          setOpen={setOpen}
                          setPickupData={setPickupData}
                        />
                      );
                    })
                  ) : (
                    <ErrorTable
                      className="h-[400px] flex items-center justify-center bg-white flex-col gap-5 w-[100%]"
                      w={["20%"]}
                      errorMessage={"No Pickup Found"}
                    />
                  )
                ) : (
                  ""
                )}
              </tbody>
            </table>
            {isSuccess && data.pickupResponse.length > 0 && (
              <Stack spacing={2} className="py-5 m-[auto]">
                <Pagination
                  count={data.pages}
                  variant="outlined"
                  shape="rounded"
                  onChange={(event, value) => setPage(value)}
                />
              </Stack>
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
      </section>
    </>
  );
};

export default Order;

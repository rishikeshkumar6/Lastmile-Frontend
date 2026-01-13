import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Pagination from "@mui/material/Pagination";
import { useLazyGetAllOrderQuery } from "../Redux/Action";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { order } from "../Redux/exportOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../components/userDashboardComponents/LoadingTable";

import AvatarDrawer from "../components/AvatarDrawer";
import ManageProductDataTable from "../components/userDashboardComponents/ManageProductDataTable";
import { useLazyGetAllProductQuery } from "../Redux/Action";
import ErrorTable from "../components/userDashboardComponents/ErrorTable";
import DeleteCardPopup from "../components/DeleteProductCardPopup";
const ManageLocation = () => {
  const dispatch = useDispatch();
  const [getAllProduct, { isLoading, isSuccess, data, isError, error }] =
    useLazyGetAllProductQuery();
  const [shipmentRowData, setShipmentRowData] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [activeButton, setActiveButton] = useState("new");
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [dates, setDates] = useState({ start_date: "", end_date: "" });
  const [shipmentPopup, setShipmentPopup] = useState(false);
  const [deletePayload, setDeletePayload] = useState({
    orderid: "",
    sku_code: "",
  });

  const handleClick = () => {
    console.log("function is execute");
    if (!selectAll) dispatch(order({ bulkOrder: data.orderRes }));
    setSelectAll(!selectAll);
    console.log("function is execute");
    if (selectAll) dispatch(order({ bulkOrder: [] }));
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    getAllProduct({ page });
  }, [page]);

  return (
    <>
      <DeleteCardPopup
        deletePopup={deletePopup}
        setDeletePopup={setDeletePopup}
        deletePayload={deletePayload}
        setDeletePayload={setDeletePayload}
      />
      <section className="flex gap-6">
        <Sidebar />
        <div className="m-3 text-xl text-gray-900   w-[90%] m-[auto]">
          <div className="py-5 font-bold px-2">Manage Products</div>

          <div className="w-full px-8 py-4 bg-white">
            <div className="py-5 flex justify-between">
              <div className="flex justify-between w-[30%]">
                <div className="flex gap-5 items-center w-[100%]">
                  <form class=" w-[100%]" onSubmit={(e) => e.preventDefault()}>
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
                        placeholder="search by category"
                        required
                      />
                    </div>
                  </form>
                </div>
              </div>
              {/* <GenerateExcel /> */}
            </div>

            <table className="w-full text-left leading-5 tableRow">
              {isSuccess === true && data.goodsResponse.length > 0 && (
                <thead className="bg-gray-50 border-2 border-gray-200">
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
                </thead>
              )}
              <tbody
                className={`bg-white ${
                  isSuccess && data.goodsResponse.length > 0 ? "border-2" : ""
                }`}
              >
                {isSuccess === true ? (
                  data.goodsResponse.length > 0 ? (
                    data.goodsResponse.map((elem, index) => {
                      return (
                        <ManageProductDataTable
                          elem={elem}
                          deletePopup={deletePopup}
                          setDeletePopup={setDeletePopup}
                          deletePayload={deletePayload}
                          setDeletePayload={setDeletePayload}
                        />
                      );
                    })
                  ) : (
                    <ErrorTable
                      className="h-[400px] flex items-center justify-center bg-white flex-col gap-5"
                      w={["20%"]}
                      errorMessage={"No product Found"}
                    />
                  )
                ) : (
                  ""
                )}
              </tbody>
            </table>
            {isSuccess === true && data.goodsResponse.length > 0 && (
              <Stack spacing={2} className="py-5 m-[auto]">
                <Pagination
                  count={data.pageCount}
                  variant="outlined"
                  shape="rounded"
                  onChange={(event, value) => setPage(value)}
                />
              </Stack>
            )}
            {isError === true && (
              <ErrorTable
                className="h-[400px] flex items-center justify-center bg-white flex-col gap-5"
                w={["20%"]}
                errorMessage={"No Order Found"}
              />
            )}
            {isLoading === true && <LoadingTable tabletype="producttable" />}
          </div>
        </div>
        {console.log("Rtk query payload", {
          isLoading,
          isSuccess,
          data,
          isError,
          error,
        })}
      </section>
    </>
  );
};

export default ManageLocation;

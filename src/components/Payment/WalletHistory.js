import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { useLazyWalletHistoryQuery } from "../../Redux/Action";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { mockTransactions } from "./mockData";
import ErrorTable from "../userDashboardComponents/ErrorTable";
import LoadingTable from "../userDashboardComponents/LoadingTable";

const ITEMS_PER_PAGE = 10;

export default function WalletHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [walletHistory, { isLoading, isSuccess, data, isError, error }] =
    useLazyWalletHistoryQuery();

  useEffect(() => {
    walletHistory({ currentPage, batchSize: 10 });
  }, [currentPage]);

  const totalPages = Math.ceil(mockTransactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTransactions = mockTransactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const formatCurrency = (amount) => {
    if (amount === null) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <section className="flex gap-6">
      <Sidebar />
      <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Wallet History
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
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
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isSuccess === true &&
                data.walletResponse.length > 0 &&
                data?.walletResponse?.map((transaction, index) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {`${transaction.date ? transaction.date : "N/A"}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {`${
                        transaction.transaction_id
                          ? transaction.transaction_id
                          : "N/A"
                      }`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.transaction_type &&
                          transaction.transaction_type === "WALLET_RECHARGE"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {`${
                          transaction.transaction_type
                            ? transaction.transaction_type
                            : "N/A"
                        }`}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      {`${
                        transaction.credit_amount
                          ? transaction.credit_amount.toFixed(2)
                          : 0
                      }`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      {`${
                        transaction.debit_amount
                          ? transaction.debit_amount.toFixed(2)
                          : 0
                      }`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {`${
                        transaction.wallet_balance
                          ? transaction.wallet_balance.toFixed(2)
                          : "N/A"
                      }`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.payment_status &&
                          transaction.payment_status === "SUCCESS"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {`${
                          transaction.payment_status
                            ? transaction.payment_status
                            : "N/A"
                        }`}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {isSuccess === true && data.walletResponse.length > 0 && (
          <Stack spacing={2} className="py-5 m-[auto]">
            <Pagination
              count={data.totalPage}
              variant="outlined"
              shape="rounded"
              onChange={(event, value) => setCurrentPage(value)}
            />
          </Stack>
        )}
        {isError === true && (
          <ErrorTable
            className="h-[400px] flex items-center justify-center bg-white flex-col gap-5"
            w={["20%"]}
            errorMessage={"No Transation available"}
          />
        )}
        {isLoading === true && <LoadingTable />}
      </div>
    </section>
  );
}

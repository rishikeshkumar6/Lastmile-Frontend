import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useDeletePickupMutation } from "../Redux/Action";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";

const CancelCardPopup = ({ popup, setPopup, row }) => {
  const [deletePickup, { isLoading, isSuccess, data, isError, error }] =
    useDeletePickupMutation();
  const closeModal = () => setPopup(false);
  const { pickup_location_code } = row;
  const handleDelete = () => {
    deletePickup({ pickup_location_code });
  };
  useEffect(() => {
    if (isSuccess === true && data.statusCode === 200) {
      toast.success(data.message, { autoClose: "2000" });
      setPopup(!popup);
    }
    if (isError === true && data.statusCode === 401) {
      toast.error(data.errorMessage, { autoClose: "2000" });
      setPopup(!popup);
    }
  }, [data]);
  return (
    <>
      <button type="button" className="button" onClick={() => setPopup(!popup)}>
        Delete Pickup
      </button>
      <Popup
        open={popup}
        closeOnDocumentClick
        onClose={closeModal}
        position="center"
        modal
        contentStyle={{
          width: "30%",
          margin: "auto",
          borderRadius: "10px",
          padding: "24px",
          contentClassName: "popup-animate",
        }}
        overlayStyle={{
          background: "rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex gap-5 flex-col justify-center items-center">
          <button
            type="button"
            class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
            onClick={() => setPopup(!popup)}
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
          <svg
            class="mx-auto text-gray-400 w-12 h-12 dark:text-gray-200"
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
          Are you sure you want to delete this pickup
          <div>
            <button
              data-modal-hide="popup-modal"
              type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              onClick={handleDelete}
            >
              {isLoading ? "Loading..." : " Yes, I am sure"}
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => setPopup(!popup)}
            >
              No, cancel
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default CancelCardPopup;

import React, { useState, useEffect } from "react";
import { RxDotsVertical } from "react-icons/rx";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import { useUpdatePickupStatusMutation } from "../../Redux/Action";
import "reactjs-popup/dist/index.css";

import CancelCardPopup from "../CancelCardPopup";
import { toast } from "react-toastify";

const ManageLocationData = ({ row, index, open, setOpen, setPickupData }) => {
  const [cancelOrderState, setCancelOrderState] = useState(false);
  const [updatePickupStatus, { isLoading, isSuccess, data, isError, error }] =
    useUpdatePickupStatusMutation();
  const handleStatus = (pickup_location_code, pickup_account_id) => {
    updatePickupStatus({ pickup_location_code, pickup_account_id });
  };
  const handleEdit = () => {
    setOpen(!open);
    setPickupData(row);
  };
  useEffect(() => {
    if (isSuccess === true && data.statusCode === 200) {
      toast.success(data.message, { autoClose: "2000" });
    }
    if (isError === true && error.statusCode === 500) {
      toast.error(error.errorMessage, { autoClose: "2000" });
    }
  }, [data]);
  return (
    <tr className={`${(index + 1) % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
      <td className="p-3 text-[0.8rem]  font-[500]">
        <span className=" ">{`${
          row.pickup_location_code ? row.pickup_location_code : "N/A"
        }`}</span>
      </td>
      <td className="p-3 text-[0.8rem]">{`${
        row.pickup_location_name ? row.pickup_location_name : "N/A"
      }`}</td>
      <td className="p-3 text-[0.8rem]">
        <div className="flex flex-col gap-1">
          <span className="font-[500]">{`${
            row.pickup_person_name ? row.pickup_person_name : "N/A"
          }`}</span>
          <div className="flex flex-col ">
            <span>{`${
              row.pickup_person_phone ? row.pickup_person_phone : "N/A"
            }`}</span>
            <span>{`${
              row.pickup_person_email ? row.pickup_person_email : "N/A"
            }`}</span>
          </div>
        </div>
      </td>
      <td className="p-3 text-[0.8rem]">
        <div className="flex flex-col gap-1">
          <span>{`${row.pickup_address ? row.pickup_address : "N/A"}`}</span>
          <span>{`${row.pickup_pincode ? row.pickup_pincode : ""}, ${
            row.pickup_city ? row.pickup_city : ""
          }, ${row.pickup_state ? row.pickup_state : ""}`}</span>
        </div>
      </td>
      <td className="p-3 text-[0.8rem]">
        {row.isActive ? "Active" : "InActive"}
      </td>
      <td className="p-3 text-[0.8rem] ">
        <div className="relative">
          <Menu
            menuButton={
              <MenuButton>
                {" "}
                <RxDotsVertical className="cursor-pointer" />
              </MenuButton>
            }
          >
            <div class="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-40 dark:bg-gray-700 dark:divide-gray-600">
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownMenuIconButton"
              >
                <li>
                  <span
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
                    onClick={() =>
                      handleStatus(
                        row.pickup_location_code,
                        row.pickup_account_id
                      )
                    }
                  >
                    Set as Default
                  </span>
                </li>

                <li>
                  <span
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer"
                    onClick={handleEdit}
                  >
                    Edit Pickup
                  </span>
                </li>

                <li>
                  <span
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer text-red-600"
                  >
                    <CancelCardPopup
                      popup={cancelOrderState}
                      setPopup={setCancelOrderState}
                      row={row}
                    />
                  </span>
                </li>
              </ul>
            </div>
          </Menu>
        </div>
      </td>
    </tr>
  );
};

export default ManageLocationData;

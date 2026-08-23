import React, { useState, useRef, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

import "reactjs-popup/dist/index.css";
import ManageProductForm from "./ManageProductForm";

const ManageProductDataTable = ({
  elem,
  deletePopup,
  setDeletePopup,
  deletePayload,
  setDeletePayload,
}) => {
  const [popup, setPopup] = useState(false);
  const handleDelete = (elem) => {
    setDeletePopup(!deletePopup);
    setDeletePayload({
      orderid: elem.orderid,
      sku_code: elem.sku_code,
    });
  };
  return (
    <tr className={`bg-white`}>
      <td className="p-3 text-[0.8rem]  font-[500]">
        <span className="">{`${elem.channel ? elem.channel : "N/A"}`}</span>
      </td>
      <td className="p-3 text-[0.8rem] ">
        <div className="flex flex-col gap-2">
          {elem.name ? (
            <span>
              {`${elem.name}`.slice(0, 20)}
              ...
            </span>
          ) : (
            "N/A"
          )}
          <span> {`Qty - ${elem.quantity ? elem.quantity : "N/A"}`}</span>
        </div>
      </td>

      <td className="p-3 text-[0.8rem]">{`${
        elem.category ? elem.category : "N/A"
      }`}</td>
      <td className="p-3 text-[0.8rem]">{`${
        elem.sku_code ? elem.sku_code : "N/A"
      }`}</td>
      <td className="p-3 text-[0.8rem]">{`${
        elem.batch_no ? elem.batch_no : "N/A"
      }`}</td>
      <td className="p-3 text-[0.8rem]">{`${
        elem.hsn_code ? elem.hsn_code : "N/A"
      }`}</td>
      <td className="p-3 text-[0.8rem]">{`${
        elem.expiry_date ? elem.expiry_date : "N/A"
      }`}</td>
      <td className="p-3 text-[0.8rem]">{`${
        elem.price ? elem.price : "N/A"
      }`}</td>
      <td className="p-3 text-[0.8rem] ">
        <div className="flex flex-col gap-2">
          <span>{`${elem.length || 0} x ${elem.breath || 0} x ${
            elem.height || 0
          } (cm)`}</span>
          <span>{`volumetric weight- ${
            ((elem.length || 0) * (elem.breath || 0) * (elem.height || 0)) /
            5000
          }kg`}</span>
          <span>{`dead weight- ${elem.dead_weigth || 0}kg`}</span>
        </div>
      </td>

      <td className="p-3 text-[0.8rem] ">
        <div className="flex items-center gap-2">
          <div className="text-[20px]">
            <ManageProductForm popup={popup} setPopup={setPopup} Data={elem} />
          </div>
          <div className="text-[20px] text-red-600">
            <MdDelete
              className="cursor-pointer"
              onClick={() => handleDelete(elem)}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ManageProductDataTable;

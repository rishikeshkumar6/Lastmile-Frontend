import React from "react";
import WarehouseTable from "./testingcomponent";

const data = [
  {
    serial: 1,
    title: "2 Test location",
    contactDetails: "Moksh\nmoksh.jaswal1@gmail.com\n9871787775",
    pincode: "110075",
    address:
      "Arunachal Aparment, plot 16, sector 7, Dwarka, New Delhi, Delhi, India, 110075",
    createdBy: "Warehousity",
    createdAt: "5 Dec 2024, 05:02 PM",
    status: "Active",
  },
  {
    serial: 2,
    title: "Test Location",
    contactDetails: "Test\nmokshjaswal101@gmail.com\n9871787775",
    pincode: "110075",
    address:
      "Arunachal Aparment, plot 16, sector 7, Dwarka, New Delhi, Delhi, India, 110075",
    createdBy: "Warehousity",
    createdAt: "5 Dec 2024, 01:18 PM",
    status: "Active",
  },
];

function ResponsibleTable() {
  return (
    <div class="grid grid-cols-3 gap-4">
      <div class="card bg-white shadow-lg rounded-lg p-4 w-64 h-64 flex flex-col justify-between overflow-hidden">
        <h2 class="font-bold text-lg mb-2">Card Title</h2>
        <p class="text-gray-600 text-sm line-clamp-4">
          This is some sample content. It's designed to fit within the card
          without overflowing. If the content is too long, it will be truncated
          to fit.
        </p>
        <button class="mt-auto bg-blue-500 text-white py-2 px-4 rounded">
          Read More
        </button>
      </div>

      <div class="card bg-white shadow-lg rounded-lg p-4 w-64 h-64 flex flex-col justify-between overflow-hidden">
        <h2 class="font-bold text-lg mb-2">Another Title</h2>
        <p class="text-gray-600 text-sm line-clamp-4">
          This is another example where the content might be shorter.
        </p>
        <button class="mt-auto bg-blue-500 text-white py-2 px-4 rounded">
          Read More
        </button>
      </div>

      <div class="card bg-white shadow-lg rounded-lg p-4 w-64 h-64 flex flex-col justify-between overflow-hidden">
        <h2 class="font-bold text-lg mb-2">Yet Another Card</h2>
        <p class="text-gray-600 text-sm line-clamp-4">
          Here, the content could be much longer, but the card will manage it
          gracefully without breaking its layout.
        </p>
        <button class="mt-auto bg-blue-500 text-white py-2 px-4 rounded">
          Read More
        </button>
      </div>
    </div>
  );
}

export default ResponsibleTable;

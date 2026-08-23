import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const DateRangePicker = ({ dates, setDates }) => {
  const [selectedRange, setSelectedRange] = useState("today");

  useEffect(() => {
    updateDateRange("last3months");
  }, []);

  const updateDateRange = (range) => {
    const today = dayjs();
    let start, end;

    switch (range) {
      case "today":
        start = end = today;
        break;
      case "yesterday":
        start = end = today.subtract(1, "day");
        break;
      case "last7":
        start = today.subtract(6, "day");
        end = today;
        break;
      case "last1month":
        start = today.subtract(1, "month");
        end = today;
        break;
      case "last3months":
        start = today.subtract(3, "month");
        end = today;
        break;
      default:
        start = end = today;
    }

    setSelectedRange(range);
    setDates({
      start_date: start.format("YYYY-MM-DD"),
      end_date: end.format("YYYY-MM-DD"),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-5">
        {[
          { label: "Today", value: "today" },
          { label: "Yesterday", value: "yesterday" },
          { label: "Last 7 Days", value: "last7" },
          { label: "Last 1 Month", value: "last1month" },
          { label: "Last 3 Months", value: "last3months" },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => updateDateRange(option.value)}
            className={`text-sm font-normal  py-2 px-3  rounded-sm  cursor-pointer flex gap-2 items-center  ${
              selectedRange === option.value
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {console.log("dates", dates)}
    </div>
  );
};

export default DateRangePicker;

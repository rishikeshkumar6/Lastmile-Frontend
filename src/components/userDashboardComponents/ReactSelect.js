import React, { useState, useEffect } from "react";
import Select from "react-select";
import dayjs from "dayjs";

const options = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last7days", label: "Last 7 Days" },
  { value: "last1months", label: "Last 1 Months" },
  { value: "last3months", label: "Last 3 Months" },
];

export default function ReactSelect({ dates, setDates }) {
  const [selectedOption, setSelectedOption] = useState(
    options[options.length - 1]
  );
  useEffect(() => {
    const updateDateRange = () => {
      const today = dayjs();
      let start, end;

      switch (selectedOption.value) {
        case "today":
          start = end = today;
          break;
        case "yesterday":
          start = end = today.subtract(1, "day");
          break;
        case "last7days":
          start = today.subtract(6, "day");
          end = today;
          break;
        case "last1months":
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
      setDates({
        start_date: start.format("YYYY-MM-DD"),
        end_date: end.format("YYYY-MM-DD"),
      });
    };
    updateDateRange();
  }, [selectedOption]);

  return (
    <div className="w-[20%]">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        className="text-sm"
      />
      {console.log(selectedOption)}
    </div>
  );
}

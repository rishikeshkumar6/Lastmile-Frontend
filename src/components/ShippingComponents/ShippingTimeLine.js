import React from "react";
import { Check, Clock } from "lucide-react";
import { mockShippingData } from "./mockData";

const ShippingTimeline = () => {
  const { timeline } = mockShippingData;

  return (
    <div className="space-y-8">
      {timeline.map((event, index) => {
        const isCompleted = event.completed;
        const isLast = index === timeline.length - 1;

        return (
          <div key={index} className="relative flex items-start">
            <div className="flex flex-col items-center mr-4">
              <div
                className={`
                flex items-center justify-center w-8 h-8 rounded-full 
                ${
                  isCompleted
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-400"
                }
              `}
              >
                {isCompleted ? <Check size={18} /> : <Clock size={18} />}
              </div>

              {!isLast && (
                <div
                  className={`
                  w-0.5 h-full absolute top-8 left-4 transform -translate-x-1/2
                  ${isCompleted ? "bg-green-200" : "bg-gray-200"}
                `}
                  style={{ height: "3.5rem" }}
                ></div>
              )}
            </div>

            <div className="pb-8">
              <h3
                className={`font-medium ${
                  isCompleted ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {event.status}
              </h3>
              <div className="mt-1 text-sm text-gray-500 space-y-1">
                <p>{event.location}</p>
                <p>
                  {event.date} {event.time && `• ${event.time}`}
                </p>
                {event.description && (
                  <p className="text-gray-600 italic">{event.description}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShippingTimeline;

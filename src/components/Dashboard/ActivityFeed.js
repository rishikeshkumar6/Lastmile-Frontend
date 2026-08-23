import React from "react";
import { format } from "date-fns";

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "order_created":
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
            📝
          </div>
        );
      case "order_shipped":
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
            🚚
          </div>
        );
      case "order_delivered":
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
            ✅
          </div>
        );
      case "order_returned":
        return (
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-500">
            ↩️
          </div>
        );
      case "order_cancelled":
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
            ❌
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
            📋
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
      </div>
      <div className="p-4">
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex space-x-3">
              {getActivityIcon(activity.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.description}
                  {activity.orderId && (
                    <span className="ml-1 text-indigo-600">
                      #{activity.orderId}
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  {activity.user && <span>{activity.user} • </span>}
                  {format(new Date(activity.timestamp), "MMM dd, h:mm a")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityFeed;

import React from "react";
import OrderStatusCard from "../components/Dashboard/OrderStatusCard";
import OrdersTable from "../components/Dashboard/OrderTables";
import StatusChart from "../components/Dashboard/StatusChart";
import TrendChart from "../components/Dashboard/TrendChart";
import ActivityFeed from "../components/Dashboard/ActivityFeed";
import {
  Package,
  Truck,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  ShoppingCart,
  Clock,
  XCircle,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const orderStatusData = [
    {
      title: "New Orders",
      count: 42,
      icon: <ShoppingCart size={20} />,
      color: "bg-blue-500",
    },
    {
      title: "In Transit",
      count: 64,
      icon: <Truck size={20} />,
      color: "bg-indigo-500",
    },
    {
      title: "Delivered",
      count: 128,
      icon: <CheckCircle size={20} />,
      color: "bg-green-500",
    },
    {
      title: "NDR",
      count: 12,
      icon: <AlertTriangle size={20} />,
      color: "bg-orange-500",
    },
    {
      title: "Returns",
      count: 8,
      icon: <RotateCcw size={20} />,
      color: "bg-red-500",
    },
    {
      title: "Pending",
      count: 18,
      icon: <Clock size={20} />,
      color: "bg-yellow-500",
    },
    {
      title: "Cancelled",
      count: 5,
      icon: <XCircle size={20} />,
      color: "bg-gray-500",
    },
    {
      title: "All Orders",
      count: 277,
      icon: <Package size={20} />,
      color: "bg-purple-500",
    },
  ];

  const pieChartData = [
    { name: "New", value: 42, color: "#3b82f6" },
    { name: "In Transit", value: 64, color: "#6366f1" },
    { name: "Delivered", value: 128, color: "#22c55e" },
    { name: "NDR", value: 12, color: "#f97316" },
    { name: "Returns", value: 8, color: "#ef4444" },
    { name: "Pending", value: 18, color: "#eab308" },
    { name: "Cancelled", value: 5, color: "#6b7280" },
  ];

  const trendData = [
    { name: "Mon", orders: 24, returns: 2 },
    { name: "Tue", orders: 32, returns: 3 },
    { name: "Wed", orders: 45, returns: 4 },
    { name: "Thu", orders: 38, returns: 2 },
    { name: "Fri", orders: 52, returns: 5 },
    { name: "Sat", orders: 64, returns: 6 },
    { name: "Sun", orders: 42, returns: 3 },
  ];

  const recentOrders = [
    {
      id: "ORD-12345",
      customer: "Rahul Sharma",
      date: new Date(2025, 3, 15),
      status: "Delivered",
      platform: "Amazon",
      amount: 2499.99,
      trackingNumber: "AMZ123456789",
      courier: "Blue Dart",
    },
    {
      id: "ORD-12346",
      customer: "Priya Patel",
      date: new Date(2025, 3, 14),
      status: "In Transit",
      platform: "Flipkart",
      amount: 1299.5,
      trackingNumber: "FKT987654321",
      courier: "Delhivery",
    },
  ];

  const activities = [
    {
      id: "act-1",
      type: "order_delivered",
      description: "Order delivered successfully",
      timestamp: new Date(2025, 3, 15, 14, 30),
      orderId: "12345",
      user: "System",
    },
  ];

  return (
    <section className="flex gap-6">
      <Sidebar />
      <div className="space-y-6 m-[auto] w-[82%]">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {orderStatusData.slice(0, 4).map((status, index) => (
            <OrderStatusCard
              key={index}
              title={status.title}
              count={status.count}
              icon={status.icon}
              color={status.color}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatusChart data={pieChartData} />
          <TrendChart data={trendData} title="Weekly Order Trends" />
        </div>

        <div className="mt-6">
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

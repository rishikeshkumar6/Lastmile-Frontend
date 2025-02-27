import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { MdOutlineSubscriptions } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";

export const menus = [
  { name: "dashboard", link: "/dashboard", icon: MdOutlineDashboard },
  { name: "Orders", link: "/order", icon: IoCartOutline },
  { name: "messages", link: "/", icon: FiMessageSquare },
  { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
  { name: "Wallet History", link: "/wallethistory", icon: IoWalletOutline },
  { name: "Subscription", link: "/subscription", icon: MdOutlineSubscriptions },
  { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
  { name: "logout", link: "/", icon: IoIosLogOut },
];

import { MdOutlineDashboard } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineSubscriptions } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";

export const menus = [
  { name: "dashboard", link: "/dashboard", icon: MdOutlineDashboard },
  { name: "Orders", link: "/order", icon: IoCartOutline },
  {
    name: "barcode scanner",
    link: "/barcode-scanner",
    icon: MdOutlineQrCodeScanner,
  },
  { name: "messages", link: "/", icon: FiMessageSquare },
  { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
  { name: "Wallet History", link: "/wallethistory", icon: IoWalletOutline },
  { name: "Subscription", link: "/subscription", icon: MdOutlineSubscriptions },
  { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
  { name: "logout", link: "/", icon: IoIosLogOut },
];

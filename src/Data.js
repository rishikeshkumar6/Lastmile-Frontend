import { MdOutlineDashboard } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineSubscriptions } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { GrCalculator } from "react-icons/gr";
import { MdLocationOn } from "react-icons/md";
import { BiLogoProductHunt } from "react-icons/bi";
import { AiOutlineProduct } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BsBox } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";

import { GiCalculator } from "react-icons/gi";

export const menus = [
  { name: "dashboard", link: "/dashboard", icon: MdOutlineDashboard },
  { name: "Orders", link: "/order", icon: IoCartOutline },
  { name: "Manage Location", link: "/manage_location", icon: GrMapLocation },
  { name: "Manage Product", link: "/manage_product", icon: BsBox },

  { name: "messages", link: "/chat", icon: FiMessageSquare },
  {
    name: "Rate Calculator",
    link: "/rate-calculator",
    icon: GiCalculator,
    margin: true,
  },
  { name: "Wallet History", link: "/wallethistory", icon: IoWalletOutline },
  { name: "Rate Card", link: "/rate_card", icon: GiCalculator },
  { name: "Saved", link: "/saved", icon: AiOutlineHeart, margin: true },
  { name: "logout", link: "/", icon: IoIosLogOut },
];

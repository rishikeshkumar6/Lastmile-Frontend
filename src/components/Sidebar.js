import React, { useState } from "react";
import { menus } from "../Data";
import { HiMenuAlt3 } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Redux/rootReducer";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [curowsel, setCurowsel] = useState(false);
  const handleLogout = () => {
    console.log("handleLogout function is invoked");
    dispatch(logout());
  };
  return (
    <section className={`flex gap-6  fixed z-[2000]`}>
      <div
        className={` hidden 
    lg:block 
    lg:bg-slate-900 
    lg:min-h-screen 
    lg:overflow-y-auto 
    lg:duration-500 
    lg:text-gray-100 
    lg:px-4 
    lg:hover:w-72 
    ${open ? "lg:w-72" : "lg:w-16"} 
    lg:has-[:checked]:bg-indigo-50 
    lg:has-[:checked]:text-indigo-900 
    lg:has-[:checked]:ring-indigo-200 `}
        onMouseOver={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
      >
        <div className="py-3 flex justify-between">
          {open && <h1 className="text-[20px] font-bold">Rishu Logistic</h1>}

          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setCurowsel(!curowsel)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <div onClick={handleLogout}>
              <Link
                to={menu?.link}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md hover:cursor-pointer`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;

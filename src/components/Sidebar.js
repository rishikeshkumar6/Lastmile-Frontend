import React, { useState, useEffect } from "react";
import { menus } from "../Data";
import { HiMenuAlt3 } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../Redux/Action";
import { userLogout } from "../Redux/rootReducer";

const Sidebar = () => {
  const [logout, { isLoading, isSuccess, isError, data, error }] =
    useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [curowsel, setCurowsel] = useState(false);

  useEffect(() => {
    if (isSuccess === true && data) {
      dispatch(userLogout());
      window.location.href = "/";
    }
  }, [data, error]);

  const handleClick = (link, label) => {
    if (label !== "logout") {
      console.log("link and label", link, label);
      console.log("if condition is execute");
      navigate(`${link}`);
    } else {
      console.log("else condition is execute");
      logout();
    }
  };
  return (
    <section className={`flex gap-6 fixed z-[200]`}>
      <div
        className={`hidden lg:flex lg:flex-col lg:overflow-hidden
      lg:block 
      lg:bg-slate-900 
      lg:min-h-screen 
      lg:duration-500 
      lg:text-gray-100 
      lg:px-4 
      lg:hover:w-72 
      ${open ? "lg:w-72" : "lg:w-16"} 
      lg:has-[:checked]:bg-indigo-50 
      lg:has-[:checked]:text-indigo-900 
      lg:has-[:checked]:ring-indigo-200`}
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Header Section - Non-scrolling */}
        <div className="py-3 flex justify-between flex-shrink-0">
          {open && (
            <h1 className="text-[20px] font-bold"> Logistic Solutions</h1>
          )}
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setCurowsel(!curowsel)}
          />
        </div>

        {/* Scrollable Content Section */}
        <div className="mt-4 flex flex-col gap-4 relative flex-1 overflow-y-auto">
          {menus?.map((menu, i) => (
            <div key={i}>
              <div
                onClick={() => handleClick(menu.link, menu?.name)}
                className={`${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md hover:cursor-pointer`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{ transitionDelay: `${i + 3}00ms` }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                >
                  {menu?.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;

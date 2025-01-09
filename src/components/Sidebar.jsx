import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { useStateContext } from "../contexts/ContextProvider"; // Ensure this path is correct
import { FiPieChart, FiShoppingBag } from "react-icons/fi";
import { RiContactsLine } from "react-icons/ri";
import { FaWpforms } from "react-icons/fa6";
import { BsKanban } from "react-icons/bs";
import { AiOutlineAreaChart, AiOutlineBarChart } from "react-icons/ai";

const Sidebar = ({ userRole }) => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  const operatorLinks = [
    { name: "dashboard", icon: <FiShoppingBag /> },
    { name: "OperatorSubmit", icon: <RiContactsLine /> },
    { name: "Forms", icon: <FaWpforms /> },
  ];

  const technicianLinks = [
    { name: "dashboard", icon: <FiShoppingBag /> },
    { name: "TechnicianSubmit", icon: <RiContactsLine /> },
    { name: "Forms", icon: <FaWpforms /> },
  ];

  const adminLinks = [
    { name: "dashboard", icon: <FiShoppingBag /> },
    { name: "submitform", icon: <RiContactsLine /> },
    { name: "forms", icon: <FaWpforms /> },
    { name: "projects", icon: <FiPieChart /> },
    { name: "kanban", icon: <BsKanban /> },
    { name: "area", icon: <AiOutlineAreaChart /> },
    { name: "bar", icon: <AiOutlineBarChart /> },
  ];

  const links =
    userRole === "operator"
      ? operatorLinks
      : userRole === "technician"
      ? technicianLinks
      : adminLinks;
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Preventive Maintenance</span>
            </Link>
            <Tooltip content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </Tooltip>
          </div>
          <div className="mt-10">
            {links.map((link) => (
              <NavLink
                to={`/${link.name}`}
                key={link.name}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                {link.icon}
                <span className="capitalize">{link.name}</span>
              </NavLink>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;

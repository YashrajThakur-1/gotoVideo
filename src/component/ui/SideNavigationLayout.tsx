import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import { PiFolderStarFill, PiLinkSimpleBold } from "react-icons/pi";
import { AiFillHome } from "react-icons/ai";
import { HiClipboardDocumentList, HiMiniQrCode } from "react-icons/hi2";
import { FiSettings } from "react-icons/fi";
import UserPropfileCard from "./UserPropfileCard";
import { MdOutlineAdd } from "react-icons/md";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
type NavigationItem = {
  path: string;
  label: string;
  icon: IconType;
};

const Header = () => {
  return (
    <div className="header flex justify-between items-center py-4 px-[1px] sm:px-2 "></div>
  );
};

const SideNavigationLayout = ({ children }: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleToggleClick = () => {
    setOpen(!open);
  };

  const navigationItems: NavigationItem[] = [
    { path: "/home", label: "Home", icon: AiFillHome },
    // { path: "/liveSong", label: "Link", icon: PiLinkSimpleBold },
    // { path: "/01", label: "QR Code", icon: HiMiniQrCode },
    // { path: "/02", label: "Documents", icon: HiClipboardDocumentList },
    { path: "/analytics", label: "analytics", icon: TbBrandGoogleAnalytics },
    { path: "/03", label: "Files", icon: PiFolderStarFill },
    { path: "/links-view", label: "Custom Links", icon: PiLinkSimpleBold },
    { path: "/03", label: "Settings", icon: FiSettings },
  ];

  const handleMobileItemClick = () => {
    setOpen(false);
  };

  return (
    <div className="w-full h-screen">
      <div className={`app flex flex-col ${open ? "open" : ""}`}>
        <div className="flex border-b border-gray-300">
          <div className=" flex justify-between w-full items-center px-2 py-1">
            <div>
              <button
                className="toggle-button text-2xl bg-transparent  cursor-pointer text-gray-500"
                onClick={handleToggleClick}
              >
                ☰
              </button>
            </div>
            <div>
              <UserPropfileCard />
            </div>
          </div>
          <Header />
        </div>
        <div className="flex w-full h-screen   border-t border-divider">
          <div className=" text-white h-full w-fit  border-r border-divider flex flex-col ">
            <div className="flex flex-col items-center justify-center w-full bg-[#3B82F6] py-4">
              <button
                className=" rounded-sm  text-white font-medium text-[22px] "
                onClick={() => {
                  navigate("/create");
                }}
              >
                <MdOutlineAdd />
              </button>
            </div>
            <ul className={`p-0 m-0  ${open ? "block" : "hidden md:block"}`}>
              {navigationItems.map((item, index) => (
                <li key={index} className="text-blue-500 ">
                  <Link
                    to={item.path}
                    onClick={handleMobileItemClick}
                    className={`${
                      location.pathname === item.path ? "bg-slate-300" : ""
                    } flex items-center p-4 transition duration-200 hover:bg-white`}
                  >
                    <span className="text-[25px] font-bold flex flex-col gap-5">
                      <item.icon />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="main-content bg-[#F4F6FA] flex-1 transition duration-200 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavigationLayout;

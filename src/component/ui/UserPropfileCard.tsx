import React from "react";
import ATMClickableAccordian from "../atom/ATMClickableAccordian/ATMClickableAccordian";
import { useNavigate } from "react-router-dom";

type Props = {};

const UserPropfileCard = (props: Props) => {
  const userFirstName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();
  const handleSignOut = () => {
    // Remove user-related data from localStorage
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("GoogleAccessToken");
    navigate("/");
    // Redirect the user to the login page or perform any other logout actions
    // For example, you can use React Router to navigate to the login page:
    // import { useHistory } from 'react-router-dom';
    // const history = useHistory();
    // history.push('/login');
  };
  return (
    <div className="flex gap-3 items-center">
      <div>
        <ATMClickableAccordian
          className="w-fit p-2"
          titleExtraClass="p-1"
          title={
            <div className="flex gap-1 items-center">
              <div className="bg-[#273144] text-white w-[35px] h-[35px] text-[18px] flex items-center justify-center rounded-full font-bold">
                {userFirstName?.substring(0, 1)}
              </div>
              <div className="hidden sm:inline text-[16px] font-medium text-gray-500 ">
                {userFirstName}
              </div>
            </div>
          }
        >
          <div className=" pt-4">
            <div className="flex gap-3 border-b pb-4 border-gray-300 items-center justify-center px-6 ">
              <div>
                <div className="bg-[#273144] text-white w-[40px] h-[40px] text-[18px] flex items-center justify-center rounded-full font-bold">
                  {userFirstName?.substring(0, 1)}
                </div>
              </div>
              <div className="flex-1 gap-1 ">
                <div className="text-[14px] font-medium sm:text-[16px]">
                  {userFirstName}
                </div>
                <div className="text-[14px] font-medium">{userEmail}</div>
              </div>
            </div>
            <div className="flex gap-3 justify-between items-center  border-b border-gray-300 py-2 px-6">
              <div className="flex flex-col gap-1 text-gray-600">
                <div className="text-[14px] font-medium">o_1jfomi9lim</div>
                <div className="text-[14px] font-medium">Free Account</div>
              </div>
              <div>
                <button className="bg-blue-500 text-white px-3 py-[1px] sm:text-[14px] text-[12px]  flex items-center justify-center rounded-full ">
                  Upgrade
                </button>
              </div>
            </div>
            <div className="border-b border-gray-300 py-4 px-6">
              <ul className="flex flex-col gap-2 text-gray-600 text-[15px]">
                <li>Support</li>
                <li>Api Documentation</li>
                <li>Webinars</li>
                <li>go2.video Seminars</li>
              </ul>
            </div>
            <div className="py-2 px-6">
              <button
                className=" text-[15px] font-medium text-gray-600"
                onClick={() => {
                  handleSignOut();
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </ATMClickableAccordian>
      </div>
    </div>
  );
};

export default UserPropfileCard;

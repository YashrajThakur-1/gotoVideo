import React from "react";
import { BiSolidLock } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { SiAudiomack } from "react-icons/si";
import { MdDateRange, MdModeEdit } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import moment from "moment";
import { BsArrowReturnRight, BsThreeDots } from "react-icons/bs";
import { PiArrowElbowDownRightBold } from "react-icons/pi";
import { ImQrcode } from "react-icons/im";
import { IoCloseOutline } from "react-icons/io5";
type Props = {
  liveSongId: string | null;
  isDrawerOpen: boolean;
  IsDrawerClose: (value: any) => void;
};
const linkDetail = {
  id: "1",
  customerName: "moahn doe",
  longUrl: "https://example.com/long-url-1",
  createdAt: "sep 30",
  expireAt: "2023-11-01",
  customer: {
    email: "john.doe@example.com",
    phone: 1234567890,
    name: "john doe",
    clickCount: 100,
  },
  planDetails: {
    type: "basic",
    rateLimit: 1000,
    expiresAt: "2023-12-31",
  },
};
const LiveSongLinkDetail = ({
  liveSongId,
  isDrawerOpen,
  IsDrawerClose,
}: Props) => {
  return (
    <div className="w-full p-10 ">
      <div className="flex-1 p-8 hidden md:inline">
        <div className="">
          <div className="flex flex-col gap-8 w-full h-full">
            <div className="bg-white p-5">
              <div className="flex flex-col gap-3 rounded-md">
                <div className="flex justify-between ">
                  <div className="flex items-center  text-[15px] font-medium">
                    <span className="text-red-500 text-[22px] sm:[25px] md:[29px]">
                      <GoDotFill />
                    </span>{" "}
                    {linkDetail?.planDetails?.type}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex text-[14px] gap-1 font-medium bg-[#EDF2FF] border items-center p-2 pb-1 rounded-md">
                      <MdModeEdit className="" />
                      <span>Edit</span>
                    </button>
                    <button className="p-2 border rounded-md">
                      <BsThreeDots />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-[14px]">
                  <span className="text-black text-[16px]">
                    <MdDateRange />{" "}
                  </span>
                  {linkDetail?.createdAt} by {linkDetail?.customerName}
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-[12px]">
                  <span className="text-black text-[16px]">
                    <SiAudiomack />
                  </span>
                  0 total engagments
                </div>
              </div>
            </div>
            <div className="bg-[#F3F6F9]">
              <div className="bg-white  p-4">
                <div className="flex justify-between ">
                  <a
                    href="/ go2.video/HariGovinda"
                    className="font-bold text-[#2E5DD7] text-[16px] "
                  >
                    go2.video/{linkDetail?.customer?.name}
                  </a>
                  <div className="flex gap-2">
                    <button className="flex text-[14px] gap-1 font-medium bg-[#EDF2FF] border items-center p-2 pb-1 rounded-md">
                      <MdContentCopy className="" />
                      <span>Copy</span>
                    </button>
                    <button className="p-2 border rounded-md">
                      <BsThreeDots />
                    </button>
                  </div>
                </div>
                <div className="text-[14px] text-gray-600">
                  {linkDetail?.customer?.clickCount} clicks
                </div>
                <div className="flex text-[14px] text-gray-700 items-center gap-2 font-medium p">
                  <BsArrowReturnRight />
                  <a href="https://www.youTube.coms py-2">
                    {linkDetail?.longUrl}
                  </a>
                  <BiSolidLock />
                  <span className="text-gray-300">Redirect</span>
                </div>
                <div className="text-[16px] font-bold flex justify-between py-2">
                  <div>QR Code</div>
                  <div>Link-in-bio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDrawerOpen && (
        <div>
          <Dialog
            className="md:hidden"
            open={isDrawerOpen}
            onClose={IsDrawerClose}
            fullWidth
            maxWidth="md"
          >
            <div className="flex justify-between items-center bg-[#60606C] p-4">
              <h1 className="font-medium text-[18px] sm:text-[24px] text-white">
                Link Details
              </h1>
              <div
                onClick={IsDrawerClose}
                className="text-white text-[18px] sm:text-[24px]"
              >
                {" "}
                <IoCloseOutline />
              </div>
            </div>
            <div className="bg-[#F3F6F9] p-3">
              <DialogContent className="">
                <>
                  <div className="flex flex-col gap-4">
                    <div className="bg-white p-4 ">
                      <div className="sm:flex sm:justify-between ">
                        <div className="flex items-center gap-1">
                          <div className="text-red-500 text-[22px] sm:[25px] md:[29px]">
                            <GoDotFill />
                          </div>
                          <div className="font-medium text-[16px]">
                            {linkDetail?.planDetails?.type}
                          </div>
                        </div>
                        <div className="flex gap-2 py-4 sm:py-0">
                          <button className="flex gap-1 font-medium text-[16px] px-2 bg-[#EDF2FF] border items-center  rounded-md">
                            <MdModeEdit />
                            <div className="">Edit</div>
                          </button>
                          <button className="p-2 border rounded-md">
                            <BsThreeDots />
                          </button>
                        </div>
                      </div>
                      <div className="flex sm:items-center gap-2  text-gray-500 sm:text-[16px] text-[14px] py-2 sm:py-0">
                        <div className="text-black mt-[4px] sm:mt-0 text-[20px] ">
                          <MdDateRange />{" "}
                        </div>
                        <div>
                          {moment(linkDetail?.createdAt)
                            .utcOffset("+05:30")
                            .format("MMMM D YYYY h:mm A [GMT+5:30]")}{" "}
                          by {linkDetail?.customerName}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-[14px] sm:text-[16px]">
                        <div className="text-black text-[14px]">
                          <SiAudiomack />
                        </div>
                        0 total engagments
                      </div>
                    </div>

                    <div className="bg-white p-4">
                      <div className="sm:flex sm:justify-between ">
                        <a
                          href="/go2.video/HariGovinda"
                          className="font-bold text-[#2E5DD7] text-[16px] "
                        >
                          go2.video/HariGovinda
                        </a>
                        <div className="flex gap-2 py-3 sm:py-0">
                          <button className="flex gap-1 font-medium text-[16px] px-2 bg-[#EDF2FF] border items-center  rounded-md">
                            <MdContentCopy className="" />
                            <div className="">Copy</div>
                          </button>
                          <button className="p-2 border rounded-md">
                            <BsThreeDots />
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="text-[16px] text-gray-600 font-medium">
                          0 clicks
                        </div>
                        <div className="flex text-[16px]  items-center gap-2 py-2">
                          <PiArrowElbowDownRightBold className="text-[28px] sm:text-[16px] font-bold" />
                          <div className="truncate">
                            <a href="https://www.youTube.coms py-2">
                              https://www.youTube.com/watch?v=tZ-EHDhzgL8
                            </a>
                          </div>
                          <BiSolidLock className="text-[28px] sm:text-[16px] font-bold" />
                          <span className="text-gray-500 text-[14px]">
                            Redirect
                          </span>
                        </div>
                        <div className="text-[16px] sm:flex items-center gap-2 font-medium pb-2">
                          <div>QR Code</div>
                          <div>
                            <ImQrcode />
                          </div>
                        </div>
                        <div className="text-[16px] font-bold hidden sm:inline">
                          Link-in-bio
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </DialogContent>
            </div>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default LiveSongLinkDetail;

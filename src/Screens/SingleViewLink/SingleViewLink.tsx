import React, { useState } from "react";
import {
  MdContentCopy,
  MdDateRange,
  MdDelete,
  MdOutlineBarChart,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import ORCode from "./../../assets/Qr code.svg";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import EditLinksFormWrapper from "../EditLinks/EditLinksFormWrapper";
import ATMClickableAccordian from "../../component/atom/ATMClickableAccordian/ATMClickableAccordian";
import { BsArrowReturnRight, BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidLock } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Tooltip } from "@mui/material";
import { AiFillTag } from "react-icons/ai";
import LinkViewBarChart from "../../component/ui/LinkViewBarChart";
import LinkViewProgressBar from "../../component/ui/LinkViewProgressBar";
import LinkViewPieCharts from "../../component/ui/LinkViewPieCharts";
import TableUi from "../../component/ui/TableUi";
import { useGetDocumentByCustomNameQuery } from "../../redux/Service/LinkService";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { string } from "yup";
type linkVeiwResponse = {
  title: string;
  shortUrl: string;
  longUrl: string;
  createdAt: string;
  tags: string[];
  click: number;
  avtarUrl: string;
};
type Props = {
  singleLinkData: linkVeiwResponse;
};

const BaseUrl = process.env.REACT_APP_BASE_URL;
const SingleViewLink = ({ singleLinkData }: Props) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const [isChartLoading, setIsChartFetching] = useState(false);
  const [chartData, setChartData] = useState<any>({});
  const { customName } = useParams()
  console.log(customName, "customName")
  const { data, isLoading, isError, isFetching } =
    useGetDocumentByCustomNameQuery(customName || "");
  // console.log("chartData22", chartData);
  useEffect(() => {
    if (isLoading && isFetching) {
      console.log("Inside useEffect:", customName);

      setIsChartFetching(true);
    } else {
      setChartData(data);
      setIsChartFetching(false);
    }
  }, [isLoading, isFetching, data]);
  console.log(data, "tyyyyyyyyyyyy");

  return (
    <div className="">
      <div className="sm:p-4 md:p-6 lg:p-10 bg-[#F4F6FA] flex flex-col gap-4 p-5">
        <div>
          <Link
            to="/links-view"
            className="font-medium text-[14px] sm:text-[16px] flex gap-1 items-center"
          >
            <MdOutlineKeyboardArrowLeft />
            <span>Back to link</span>
          </Link>
        </div>
        <div className=" w-full h-full items-start p-5 bg-white shadow-lg rounded-lg">
          <div className="flex  items-start flex-col  sm:flex-row">
            {/* COPY EDIT MENU UI START ========================================================== */}
            <div className="flex w-full sm:w-fit justify-end">
              <div className="flex gap-3 items-center">
                <CopyToClipboard text={singleLinkData?.shortUrl}>
                  <Tooltip title={copied ? "cpoied" : "copy"} placement="top">
                    <button className=" bg-[#EDF2FF] border p-2 items-center rounded-md">
                      <MdContentCopy className="" />
                      <span
                        onClick={() => {
                          setCopied(true);
                        }}
                      ></span>
                    </button>
                  </Tooltip>
                </CopyToClipboard>

                {/* <EditLinksFormWrapper
                  customData={singleLinkData?.links}
                  handleEdit={function (values: any): void {
                    throw new Error("Function not implemented.");
                  }}
                /> */}

                <ATMClickableAccordian
                  className="w-[200px] p-2"
                  titleExtraClass="p-1"
                  title={
                    <button className=" border p-2 rounded-md">
                      <BsThreeDotsVertical />
                    </button>
                  }
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between hover:bg-[#F4F6FA]">
                      <div className="flex items-center gap-2 text-[15px] font-medium text-gray-300">
                        <span className="">
                          <BsArrowReturnRight />
                        </span>
                        <button
                          onClick={() => setIsButtonDisabled(true)}
                          disabled={isButtonDisabled}
                        >
                          Redirect
                        </button>
                      </div>
                      <div className="">
                        <BiSolidLock />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[15px] font-medium hover:bg-[#F4F6FA] ">
                      <span>
                        <MdDelete />
                      </span>
                      <button> Delete</button>
                    </div>
                  </div>
                </ATMClickableAccordian>
              </div>
            </div>
            {/* COPY EDIT MENU UI START ========================================================== */}

            {/* LINK AND AVTAR UI =========================================================>>overflow-hidden truncate  */}
            <div className="flex  gap-4 w-full h-full">
              <div className="hidden sm:block ">
                <Avatar
                  alt=""
                  src={singleLinkData?.avtarUrl}
                  sx={{ width: 35, height: 35 }}
                />
              </div>
              <div className="flex flex-col w-full h-full">
                <div className="w-full h-full flex flex-col gap-1">
                  <div className="flex flex-col  sm:flex-row-reverse justify-between">
                    <div className="flex items-center w-full text-[18px] font-bold overflow-hidden truncate">
                      {singleLinkData?.title}
                    </div>
                  </div>
                  <div className="text-blue-600 text-[16px]">
                    <a href={singleLinkData?.shortUrl}>
                      {singleLinkData?.shortUrl}
                    </a>
                  </div>
                  <div className="text-black text-[16px] overflow-auto truncate">
                    <a href={singleLinkData?.longUrl}>
                      {singleLinkData?.longUrl}
                    </a>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 py-2">
                  <div className="flex gap-3 sm:inline ">
                    {/* <div className="flex items-center gap-2 text-gray-500 text-[12px]">
                    <span className="text-black text-[16px]">
                      <TbAntennaBars5 />
                    </span>
                  </div> */}
                    <div className="flex text-[13px] bg-[#F4F6FA] p-[2px] rounded-sm text-gray-700 items-center gap-1 font-medium ">
                      <span className="text-black text-[16px]">
                        <BiSolidLock />
                      </span>
                      <span
                        className={`${singleLinkData?.click > 0
                          ? "text-blue-600"
                          : "text-gray-700"
                          }`}
                      >
                        {singleLinkData?.click} cliks
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-[13px]">
                    <span className="text-black text-[16px]">
                      <MdDateRange />
                    </span>
                    {moment(singleLinkData?.createdAt)
                      .format("MMM D, yyyy")
                      .toLowerCase()}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 ">
                    <span className="text-black text-[16px]">
                      <AiFillTag />
                    </span>
                    {/* <div className="flex flex-col gap-2">
                      {" "}
                      {singleLinkData?.click}Tag
                    </div> */}
                    {singleLinkData?.tags?.map((tag) => {
                      return (
                        <div className="rounded-sm bg-[#F4F6FA] p-[2px] text-[13px] ">
                          {singleLinkData?.tags?.length === 0 ? (
                            <div>No Tags</div>
                          ) : (
                            <div>{tag}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full h-full p-5 items-start bg-white shadow-lg rounded-lg flex gap-4 font-medium text-[14px] ">
            <img
              src={ORCode}
              alt=""
              style={{ filter: "grayscale(100%)" }}
              className="w-[150px] h-[150px] border "
            ></img>
            <button className="py-2 px-3 border-[1px] border-gray-300 flex items-center justify-center gap-1 rounded text-gray-700 hover:bg-[#F4F6FA] text-[14px] sm:text-[16px]">
              <MdOutlineBarChart />
              Create QR Code
            </button>
          </div>
        </div>
        {/* <BAR CARD UI END ========================================================================> */}

        <LinkViewBarChart browsercount={chartData} />
        <LinkViewProgressBar citycount={chartData} />
        <LinkViewPieCharts deviceCount={chartData} referer_counts={chartData} />
        <TableUi />
      </div>
    </div>
  );
};

export default SingleViewLink;

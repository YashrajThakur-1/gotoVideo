import { Button, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { BiLinkAlt } from "react-icons/bi";
import { IoQrCode } from "react-icons/io5";
import { BiSpreadsheet } from "react-icons/bi";
import { useGetDocumentsByEmailQuery } from "../../redux/Service/LinkService";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
interface YourDataType {
  createdAt: string;
  customName: string;
  shortURL: string;
  // Other fields in your data structure
}
type Props = {
  onClose: () => void;
};
const BitlyLinkDialog = ({ onClose }: Props) => {
  const emailId: string | null = localStorage.getItem("email");
  const navigate = useNavigate();
  const { data } = useGetDocumentsByEmailQuery(emailId);
  const [shortURLCustomName, setShortURLCustomName] = useState<string>("");
  const [shortURL, setShortURL] = useState<string>("");
  console.log("shortURL =", shortURL);

  useEffect(() => {
    if (data && data.data && data.data.length > 0) {
      // Assuming 'createdAt' exists in your data structure to sort by creation date
      const sortedData: YourDataType[] = [...data.data].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
      console.log("Sort data", sortedData);
      setShortURLCustomName(sortedData[0]?.customName || "");
      setShortURL(sortedData[0]?.shortURL);
    }
  }, [data]);
  const handleCopyLink = async () => {
    try {
      // Copy shortURL to clipboard
      await navigator.clipboard.writeText(shortURL);
    } catch (error) {
      console.error("Error copying link to clipboard", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  return (
    <div className=" w-full h-full">
      <Dialog
        open={true}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-aria-describedby="alert-dailog-description"
        sx={{
          "& .Mui-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "700px",
            },
          },
        }}
      >
        <div className="">
          {/* <SideNavigationLayout> */}
          {/* link =============================================================>> */}

          <div className="  flex flex-col gap-5  p-3 sm:py-6 w-full h-full">
            <div className="text-[20px] flex justify-end" onClick={onClose}>
              <RxCross2 />
            </div>
            {shortURLCustomName && shortURLCustomName.length > 0 ? (
              <div className="">
                <div className="text-[22px]  sm:text-[30px] font-bold flex  pb-2">
                  Congrats ! Here's Your Go To Video Link
                </div>
                <div className="flex flex-col p-4  sm:flex-row items-center justify-center bg-[#EDF2FF]  gap-3 cursor-pointer">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={shortURL}
                    className="font-bold text-[#2E5DD7] text-[20px]"
                  >
                    {shortURLCustomName}
                  </a>

                  <Button
                    variant="outlined"
                    size="small"
                    className="text-[14px] flex gap-2 bg-white"
                    onClick={handleCopyLink}
                  >
                    <MdContentCopy className="text-[#2E5DD7] " />
                    <span className="text-[10px] sm:text-[14px] text-[#2E5DD7]">
                      Copy link
                    </span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <button
                  className="px-4  py-[6px] rounded-sm bg-blue-700 text-white  text-[16px] font-medium "
                  onClick={() => {
                    navigate("/create");
                  }}
                >
                  Create Link{" "}
                </button>
              </div>
            )}

            {/* link =============================================================>> */}
            <div className="sm:text-[18px] text-[16px] font-bold text-center py-2">
              go2.video is the best plateform for connecting with everyone
              around you
            </div>
            {/* Link icon=================================================================================>>> */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex sm:flex-col items-center justify-center shadow-md p-2 gap-2 sm:p-4">
                <a
                  href="/"
                  className="bg-[#0DAEB8] text-white w-fit rounded-full p-2"
                >
                  {" "}
                  <BiLinkAlt />
                </a>
                <p className="font-normal text-[15px] text-center flex-1">
                  Be short and sweet with short links
                </p>
              </div>
              <div className="flex sm:flex-col items-center justify-center shadow-md p-2 gap-2 sm:p-4">
                <a
                  href="/"
                  className="bg-[#6B52D1] text-white w-fit rounded-full p-2 "
                >
                  <IoQrCode />
                </a>
                <p className="font-normal text-[15px] text-center flex-1">
                  Connect in the real world with QR codes
                </p>
              </div>
              <div className="flex sm:flex-col items-center justify-center shadow-md p-2 gap-2 sm:p-4">
                <a
                  href="/"
                  className="bg-[#E8AE0A] text-white w-fit rounded-full p-2 "
                >
                  <BiSpreadsheet />
                </a>
                <p className="font-normal text-[15px] text-center flex-1">
                  show case your link with link in bio page
                </p>
              </div>
            </div>

            {/*  Link icon end=================================================================================>>> */}
            {/* <div className="sm:text-[18px] text-[16px] font-bold text-center py-4">
            Get more powerfull link when you upgrade
          </div> */}

            {/* card ui=================================================================================>>> */}
            {/* <div className="grid sm:grid-cols-2 gap-4 ">
            <div className="shadow-lg p-2">
              <div className="flex justify-between ">
                <div className="font-bold text-[14px] uppercase">
                  Core Annual
                </div>
                <button className="flex items-center justify-center rounded text-[#0DAEB8] bg-[#EDF2FF] text-[12px] gap-1 px-2 ">
                  <BiLinkAlt className="" />
                  More Monthly Links
                </button>
              </div>

              <p className="text-[14 px] text-left text-gray-600 leading-2 py-2  text-left">
                Upgrade to 100 short link per month and the powerfull ability to
                redirect your link to new destinations
              </p>
              <div className="text-[16px] font-bold ">
                $8/month{" "}
                <span className="text-[14px] font-normal">
                  (one-time charge of $ 96 year)
                </span>
              </div>
              <div className="flex items-center justify-center py-2">
                <button className="text-[16px] text-[#2E5DD7] ">
                  Veiw plans
                </button>
              </div>
            </div>
            <div className="shadow-lg p-2">
              <div className="flex justify-between">
                <div className="font-bold text-[14px] uppercase">
                  Growth annual
                </div>
                <button className="flex items-center rounded justify-center text-[#0DAEB8] bg-[#EDF2FF] text-[12px] gap-1 px-2 ">
                  <BiLinkAlt className="" />
                  More Monthly Links
                </button>
              </div>

              <p className="text-[14px] text-left text-gray-600 leading-2 py-2">
                Upgrade to 100 short link per month and the powerfull ability to
                redirect your link to new destinations
              </p>
              <div className="text-[16px] font-bold ">
                $8/month{" "}
                <span className="text-[14px] font-normal">
                  (one-time charge of $ 96 year)
                </span>
              </div>
              <div className="flex items-center justify-center py-2">
                <button className="text-[16px] text-[#2E5DD7] ">
                  Veiw plans
                </button>
              </div>
            </div>
          </div> */}
            {/* card ui and=================================================================================>>> */}
            <div className="text-[16px] text-center pt-4">
              Explore more option on our{" "}
              <span className="text-[#2E5DD7]">pricing page</span>
            </div>
          </div>
          {/* </SideNavigationLayout> */}
        </div>
      </Dialog>
    </div>
  );
};
export default BitlyLinkDialog;

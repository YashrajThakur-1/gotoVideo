import React, { useState, useEffect } from "react";
import { Avatar, Checkbox } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  MdContentCopy,
  MdDateRange,
  MdDelete,
  MdFeedback,
} from "react-icons/md";
import { Tooltip } from "@mui/material";
import { MdEdit } from "react-icons/md";
import { BsArrowReturnRight, BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidLock } from "react-icons/bi";
import { VscRefresh } from "react-icons/vsc";
import { AiFillTag, AiOutlineSearch } from "react-icons/ai";
import ATMSelect from "../../component/atom/ATMSelect/ATMSelect";
import { TbAntennaBars5, TbArrowsUpDown } from "react-icons/tb";
import ATMSwitchButton from "../../component/atom/ATMTextField/ATMSwitchButton/ATMSwitchButton";
import { CgClipboard } from "react-icons/cg";
import EditLinksFormWrapper from "../EditLinks/EditLinksFormWrapper";
import ATMClickableAccordian from "../../component/atom/ATMClickableAccordian/ATMClickableAccordian";
import { HiMiniQrCode } from "react-icons/hi2";
import { PiLinkSimpleBold } from "react-icons/pi";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import LoadingCardComponent from "../../component/ui/LoadingCardComponent";
import { useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { Right } from "react-bootstrap/lib/Media";
import ColorPickerDialog from "./EditQrCode";
// TYPES OF LINK DATA PROPS=================>>
export type Links = {
  id: string;
  tags: string[];
  customName: string;
  customer: {
    email: string;
    phone: string;
    name: string;
  };
  createdAt: string;
  shortURL: string;
  longURL: string;
  title: string;
  planDetails: {
    type: string;
    expiresAt: string;
    rateLimit: number;
  };
  clickCount: number;
  expiresAt: string;
  color: string;
};
type Props = {
  linksData?: Links[];
  isLoading: boolean;
  handleDelete: (shortUrlId: any) => void;
  handleEditShortUrl: (shortUrlId: any, title: string, tags: string[]) => void;
  selectedOptions: string[];
  setSelectedOptions: (value: any) => void;
  refetch: any
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
};
//MENU OPTIONS PROPS===============================>>
type Option = {
  id: number;
  text: string;
};
// MAIN COMPONENT STATRS
const LinksView = ({
  linksData,
  isLoading,
  handleDelete,
  handleEditShortUrl,
  selectedOptions,
  setSelectedOptions,
  refetch,
  setIsLoading
}: Props) => {
  const { qrCode } = useSelector((state: RootState) => state.authSlice);
  console.log(qrCode, "qrCode=======================");
  const navigate = useNavigate();
  const params: any = useParams();
  // ALL STATES OF FUNCTIONS
  const [isShowActive, isSetShowActive] = useState("Active");
  const [selectedLinks, setSelectedLinks] = useState<Links[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedActiveQuantity, setSelectedActiveQuantity] = useState(0);
  const [selectedHiddenQuantity, setSelectedHiddenQuantity] = useState(0);
  const [isDialogBoxOpen, setColorPickerOpen] = useState(false);
  const [qrCodeColor, setQrCodeColor] = useState("#000");
  const [linkColors, setLinkColors] = useState<{ [key: string]: string }>({});
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [hiddenLinks, setHiddenLinks] = useState(() => {
    const storedHiddenLinks = localStorage.getItem("hiddenLinks");
    return storedHiddenLinks ? JSON.parse(storedHiddenLinks) : [];
  });
  // TagMenu state
  const [inputText, setInputText] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedLinkShortURL, setSelectedLinkShortURL] = useState<string>("");

  // TagMenu state end .....
  console.log("Selcet link to apply Color", selectedLinks);
  // EDIT DIALOGBOX FUNCTION====================================>
  const handleClickOpen = () => {
    setOpen(true);
  };
  //TAG MENU LOGIN AND SEARCH FUNCTIONALITY============================>
  const filteredOptions = options.filter((option) =>
    option.text.toLowerCase().includes(inputText.toLowerCase())
  );
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputText.trim() !== "") {
      setOptions((prevOptions) => [
        ...prevOptions,
        { id: options.length + 1, text: inputText, checked: false },
      ]);
      setInputText("");
    }
  };
  const handleCheckboxToggle = (id: number) => {
    setOptions((prevOptions) =>
      prevOptions.map((option: any) =>
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );
  };
  console.log("first   my color of the qr code     ", qrCodeColor);
  //TAG MENU LOGIN AND SEARCH FUNCTIONALITY END========================>
  //HANDLE CHECKBOX LOGIC =====================================>
  const handleCheckboxChange = (link: Links) => {
    const isActive = isShowActive === "Active";

    if (selectedLinks.includes(link)) {
      // If link is already selected, remove it and decrement the appropriate quantity state
      setSelectedLinks(
        selectedLinks.filter((selectedLink) => selectedLink !== link)
      );
      setSelectedQuantity(selectedQuantity - 1);

      if (isActive && !hiddenLinks.includes(link)) {
        setSelectedActiveQuantity(selectedActiveQuantity - 1);
      } else if (!isActive && hiddenLinks.includes(link)) {
        setSelectedHiddenQuantity(selectedHiddenQuantity - 1);
      }
    } else {
      // If link is not selected, add it and increment the appropriate quantity state
      setSelectedLinks([...selectedLinks, link]);
      setSelectedQuantity(selectedQuantity + 1);

      if (isActive && !hiddenLinks.includes(link)) {
        setSelectedActiveQuantity(selectedActiveQuantity + 1);
      } else if (!isActive && hiddenLinks.includes(link)) {
        setSelectedHiddenQuantity(selectedHiddenQuantity + 1);
      }
    }
  };
  // HANDLE HIDDEN CARDS LOGIC=========================================>
  const handleHideSelected = () => {
    // Retrieve the previously stored hidden state from localStorage
    const storedHiddenState = localStorage.getItem("hiddenState");
    const hiddenState = storedHiddenState ? JSON.parse(storedHiddenState) : {};

    if (isShowActive === "hidden") {
      selectedLinks.forEach((selectedLink) => {
        // Mark the selected card as not hidden
        // hiddenState[selectedLink.id] = false;
      });
      // Update the hiddenLinks state by filtering out the selectedLinks
      setHiddenLinks((prevHiddenLinks: any) =>
        prevHiddenLinks.filter((hiddenLink: any) => {
          return !selectedLinks.includes(hiddenLink);
        })
      );
    } else {
      selectedLinks.forEach((selectedLink) => {
        // Mark the selected card as hidden
        // hiddenState[selectedLink.id] = true;
      });
      // Add the selectedLinks to hiddenLinks state
      setHiddenLinks((prevHiddenLinks: any) => [
        ...prevHiddenLinks,

        ...selectedLinks,
      ]);
    }

    // Update the hidden state in local storage
    localStorage.setItem("hiddenState", JSON.stringify(hiddenState));

    // Clear the selected links and reset selected quantities
    setSelectedLinks([]);
    setSelectedQuantity(0);
    setSelectedActiveQuantity(0);
    setSelectedHiddenQuantity(0);

    setOpen(false);
  };

  // USEEFFECT FOR GETTING THE HIDDEN STATES FROM USEEFFECT==========================>
  useEffect(() => {
    const storedHiddenState =
      (localStorage.getItem("hiddenState") ||
        sessionStorage.getItem("hiddenState")) ??
      "{}"; // Provide a default JSON string if it's null
    const parsedHiddenState = JSON.parse(storedHiddenState);
    if (parsedHiddenState) {
      // Filter hiddenLinks from linksData based on hiddenState
      const loadedHiddenLinks = linksData?.filter((link: any) => {
        // const responses = JSON.parse(link);
        return parsedHiddenState[link._id];
      });
      setHiddenLinks(loadedHiddenLinks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleOpenColorPicker = (shortURL: string) => {
    setColorPickerOpen(true);
    setSelectedLinkShortURL(shortURL);
  };
  const handleCloseColorPicker = () => {
    setColorPickerOpen(false);
  };

  const handleColorChange = (newColor: any) => {
    setQrCodeColor(newColor);
  };
  // SETTIMEOUT FOR COPY TO CLIPBOARD STATE FALSE======================>
  setTimeout(() => {
    setCopied(false);
  }, 2000);
  useEffect(() => {
    // Access the QR code link from the URL parameter
    const qrCodeLink = decodeURIComponent(params.link);
    // Fetch data based on the QR code link or perform any other necessary actions
    // Example: fetchLinksData(qrCodeLink);
    // Update linksData and setIsLoading accordingly
  }, [params.link]);
  const getQrCode: any = localStorage.getItem("qrCode");
  // console.log(getQrCode, "fgfdjkgdfjsdkfgsdjkfshdfgfghhhfgfsdjhsuyjh");
  // Open Dialog Color on the QR Code link
  const handleUpdateClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      refetch()
    }, 2000);
    // Reload the entire page
    // window.location.reload();
  };

  return (
    // PAGE UI START=========================================>
    <div className="bg-[#F4F6FA] py-5 w-full  px-4 sm:px[60px] md:px-[100px] flex flex-col">
      <div className=" flex flex-col gap-5 w-full h-full">
        {/* LINK VIEWE PAGE HEADER STARTS=========================================> */}
        <div className="flex flex-col gap-3 border-b border-divider py-3 w-full">
          <div className="flex sm:flex-row gap-5 flex-col justify-between  sm:items-center">
            <div className=" flex gap-3 items-center">
              <h1 className="text-[30px] font-bold text-black">Links</h1>
              <div className="flex items-center pl-2">
                <ATMSwitchButton />
                <label
                  htmlFor=""
                  className="sm:text-[16px] text-[12px] font-medium"
                >
                  Preview New Links Page
                </label>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="text-blue-600 font-medium flex gap-2 text-[14px] items-center ">
                <span>
                  <MdFeedback />
                </span>
                <span>Leave Feedbacks</span>
              </div>
              <button className="text-gray-300 flex gap-3 items-center text-[11px] font-medium border border-gray-200 rounded-sm w-fit px-3 py-2">
                <span className="text-[18px]">
                  <TbAntennaBars5 />
                </span>
                <span>Top Performing</span>
              </button>
            </div>
          </div>
          <div className="flex  gap-5">
            <button className="text-black bg-white fl text-[12px] sm:text-[14px] py-1 rounded-md px-[6px] border border-gray-300  flex gap-3 items-center">
              <span>
                <MdDateRange />
              </span>
              <span>Filter by Created Date</span>
            </button>
            <button className="text-black bg-white text-[12px] sm:text-[14px] py-1 rounded-md px-[6px] border border-gray-300  flex gap-3 items-center">
              <span>
                <TbArrowsUpDown />
              </span>
              <span>Add Filters</span>
            </button>
            <button
              className="text-black bg-white text-[12px] sm:text-[14px] py-1 rounded-md px-[6px] border border-gray-300  flex gap-3 items-center"
              onClick={handleUpdateClick}
            >
              <span>
                <VscRefresh />
              </span>
              <span>Update</span>
            </button>
          </div>
        </div>
        {/* LINK VIEW PAGE HEADER END=========================================> */}

        {/* SELECTED HIDE TAG EXPORT UI STARTS===============================> */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex items-center gap-3 text-[14px]">
            {isShowActive === "Active" ? (
              <div className="text-black">
                {selectedActiveQuantity} Selected
              </div>
            ) : (
              <div className="text-black">
                {selectedHiddenQuantity} Selected
              </div>
            )}

            <div className="flex text-[13px] bg-[#F4F6FA] p-[2px] rounded-sm text-gray-700 items-center gap-1 font-medium p">
              <span className="text-black text-[16px]">
                <BiSolidLock />
              </span>
              <span className=" text-gray-400">Export</span>
            </div>
            <button
              onClick={handleClickOpen}
              className={`${selectedLinks.length > 0
                ? "text-blue-500 border-2 border-gray-400 rounded-lg font-medium px-[4px] py-[2px] "
                : "text-gray-400 font-medium "
                }-600 cursor-pointer`}
            >
              {isShowActive === "Active" ? "Hide" : "Unhide"}
            </button>
            {selectedLinks.length > 0 && (
              <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <div className="w-full sm:w-[450px] md:w-[450px] ">
                  <DialogTitle>
                    <div className="flex justify-between ">
                      <h1 className="font-bold ">Hide Links</h1>
                      <button onClick={() => setOpen(false)}>
                        <IoCloseSharp />
                      </button>
                    </div>
                  </DialogTitle>
                  <DialogContent>
                    <p className="text-[14px] sm:text-[16px] font-medium font-sans">
                      {isShowActive === "Active"
                        ? "Are you sure you want to hide the selected links? This action can be undone any time."
                        : "Are you sure you want to unhide the selected links?"}
                    </p>
                    <div className="flex gap-2 justify-end text-[14px] py-4 font-medium">
                      <button
                        className="border border-gray-300 py-2 px-3 rounded hover:bg-[#E3F1FE] "
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleHideSelected}
                        // onClick={
                        //   isShowActive === "Active"
                        //     ? handleHideSelected
                        //     : handleUnhideSelected
                        // }
                        className="bg-[#2a5bd7] py-2 px-3 rounded text-white hover:bg-[#0C3EBB] hover:border-blue-500"
                      >
                        {isShowActive === "Active"
                          ? "Hide-Links"
                          : "Unhide-Links"}
                      </button>
                    </div>
                  </DialogContent>
                </div>
              </Dialog>
            )}

            {/* tag menu open =========================================================>> */}
            <div className="relative">
              <button
                className={`${selectedLinks.length > 0
                  ? "text-blue-500"
                  : "text-gray-400 font-medium"
                  } cursor-pointer `}
                onClick={() => setOpenMenu((prevIsVisible) => !prevIsVisible)}
              >
                Tag
              </button>
              {openMenu && (
                <div className="absolute right-0 sm:left-0 bg-white w-fit z-10 border border-gray-200 shadow">
                  <div className="relative w-full pb-2 ">
                    <input
                      type="text"
                      placeholder="Type and press Enter..."
                      className="outline-none border-b-[1px] border-gray-200 px-3 py-2"
                      value={inputText}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                    />
                    <div className="absolute right-0  top-[6px] m-1">
                      <AiOutlineSearch
                        size={24}
                        color="black"
                        className="text-[12px] p-1 bg-white "
                      />
                    </div>

                    <div className="pt-2">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option: any) => (
                          <div
                            key={option.id}
                            className="flex items-left py-1 hover:bg-gray-200 px-2"
                          >
                            <input
                              type="checkbox"
                              checked={option.checked}
                              onChange={() => handleCheckboxToggle(option.id)}
                              className="mr-2"
                            />
                            <div className={option.checked ? "" : ""}>
                              {option.text}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-600 py-2 px-4">
                          No matches. Hit enter to create a new option.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <ATMSelect
              name=""
              className="bg-white"
              value={isShowActive}
              onChange={(e) => {
                isSetShowActive(e.target.value);
              }}
              options={[
                { label: "Show:Active", value: "Active" },
                { label: "Show:Hidden", value: "hidden" },
              ]}
            />
          </div>
        </div>
        {/* SELECTED HIDE TAG EXPORT UI END===============================> */}
        <div className=" flex flex-col space-y-2  w-full h-full">
          {isLoading ? (
            <div className="text-[150px]">
              <LoadingCardComponent />
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {/* CARDS UI START==============================================> */}
              {linksData?.map((link: any) => {
                // console.log("Short URl", link?.shortURL);
                // console.log("link", link);
                // const link = JSON.parse(link);
                // Check if the link should be displayed based on the isShowActive state and hiddenLinks state
                const isDeleted = link.status === "DElETED";
                console.log("link?.customName", link?.customName);
                const shouldDisplayLink =
                  (!isDeleted &&
                    isShowActive === "Active" &&
                    !hiddenLinks.includes(link)) ||
                  (isShowActive === "hidden" && hiddenLinks.includes(link));
                // console.log("link._id22", link._id);
                return shouldDisplayLink ? (
                  <div
                    key={link._id} // Add a unique key
                    className={`flex flex-col   w-full h-full p-3 sm:p-5 items-start bg-white shadow-lg rounded-lg  ${selectedLinks.includes(link) && "border-blue-500 border"
                      }`}
                  >
                    {/* COPY EDIT MENU UI STARTS=============================> */}
                    <div className="flex w-full   justify-between items-center">
                      <div className="flex gap-5 items-center">
                        <div>
                          <Checkbox
                            checked={selectedLinks.includes(link)}
                            onChange={() => handleCheckboxChange(link)}
                          />
                        </div>
                        <div className="hidden sm:block">
                          <Avatar
                            alt=""
                            src=""
                            sx={{ width: 35, height: 35 }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <CopyToClipboard text={link?.shortURL}>
                          <Tooltip
                            title={copied ? "cpoied" : "copy"}
                            placement="top"
                          >
                            <button className=" bg-[#EDF2FF]  items-center p-2 rounded-md">
                              <MdContentCopy className="" />
                              <span
                                onClick={() => {
                                  setCopied(true);
                                }}
                              ></span>
                            </button>
                          </Tooltip>
                        </CopyToClipboard>

                        <EditLinksFormWrapper
                          selectedOptions={selectedOptions}
                          setSelectedOptions={(selectedOptions) => {
                            setSelectedOptions(selectedOptions);
                          }}
                          handleEdit={handleEditShortUrl}
                          customId={link?.customName}
                        />

                        <ATMClickableAccordian
                          className="w-[200px] "
                          titleExtraClass="p-1"
                          title={
                            <button className=" border p-2 rounded-md  relative z-auto">
                              <BsThreeDotsVertical />
                            </button>
                          }
                        >
                          <div className="flex flex-col gap-3 p-4">
                            {/* <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2 text-[15px] font-medium ">
                                <span>
                                  <BsArrowReturnRight />
                                </span>
                                <button>Redirect</button>
                              </div>
                              <div className="overflow-hidden">
                                <BiSolidLock />
                              </div>
                            </div> */}
                            <div className="flex items-center gap-2 text-[15px] font-medium">
                              <span>
                                <MdDelete />
                              </span>
                              <button
                                onClick={() => handleDelete(link?.customName)}
                              >
                                Delete
                              </button>{" "}
                            </div>
                            <div className="flex items-center gap-2 text-[15px] font-medium">
                              <span>
                                <PiLinkSimpleBold />
                              </span>
                              <button
                                onClick={() =>
                                  navigate(`/links-view/${link?.customName}`)
                                }
                              >
                                View Link Detail
                              </button>
                            </div>
                            <button
                              className="flex items-center gap-2 text-[15px] font-medium "
                              onClick={() =>
                                handleOpenColorPicker(link?.shortURL)
                              }
                            >
                              <span>
                                <MdEdit />
                              </span>
                              <span className="mr-2 ">Edit QR Code</span>
                            </button>
                            {/* <div className="flex items-center gap-2 text-[15px] font-medium ">
                              <span>
                                <HiMiniQrCode />
                              </span>
                              <button onClick={() => navigate(`/links-view/1`)}>
                                View QR Code
                              </button>
                            </div> */}

                            {/* <div className="flex items-center gap-2 text-[15px] font-medium">
                              <span>
                                <CgClipboard />
                              </span>
                              <button>Create link in bio</button>
                            </div> */}
                          </div>
                        </ATMClickableAccordian>
                      </div>
                    </div>
                    {/* COPY EDIT MENU UI end=============================> */}
                    {/* CHECKBOX AND URL LINKS UI STARTS=============================> */}
                    <div className="flex  flex-col sm:flex-row gap-3 sm:gap-5 w-full h-full ">
                      {/* <div>
                    <Checkbox
                      checked={selectedLinks.includes(link)}
                      onChange={() => handleCheckboxChange(link)}
                    />
                  </div> */}

                      <div className="flex  gap-2 w-full items-center">
                        {/* <div className="hidden sm:block border-blue-500">
                      <Avatar
                        alt=""
                        src={link?.avtarUrl}
                        sx={{ width: 35, height: 35 }}
                      />
                    </div> */}

                        <div className="flex flex-col gap-4 w-full h-full mt-3 border p-4">
                          <div className="flex flex-col lg:flex-row items-center lg:justify-between overflow-hidden">
                            {/* Link Section (Left) */}
                            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                              <div className="flex flex-col sm:flex-row-reverse justify-between items-center">
                                <div className="flex items-center w-full text-[25px] font-bold overflow-hidden truncate">
                                  {link?.customName}
                                </div>
                              </div>
                              <div className="text-blue-600 text-[20px] font-medium overflow-hidden">
                                <a
                                  href={link?.shortURL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline"
                                >
                                  {link?.shortURL}
                                </a>
                              </div>
                              <div className="text-black text-[20px] font-medium truncate overflow-hidden">
                                <a
                                  href={link?.longURL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline"
                                >
                                  {link?.longURL}
                                </a>
                              </div>
                            </div>

                            {/* QR Code Section and Button (Right) */}
                            <div className="flex flex-col items-center lg:items-end w-full lg:w-1/2 mt-4 lg:mt-0">
                              {isDialogBoxOpen && (
                                <ColorPickerDialog
                                  linkId={selectedLinkShortURL}
                                  onClose={() => setColorPickerOpen(false)}
                                  onColorChange={(linkId, color: any) => {
                                    setQrCodeColor(color); // Assuming `setQrCodeColor` is a function that sets the color in your state
                                    setLinkColors((prevColors) => ({
                                      ...prevColors,
                                      [linkId]: color,
                                    }));
                                  }}
                                  shortURL={selectedLinkShortURL}
                                />
                              )}
                              <div className="lg:w-32 lg:h-32 overflow-hidden mt-4 mr-2 ">
                                <QRCode
                                  value={link?.shortURL}
                                  fgColor={linkColors[link?.shortURL]}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3 ml-3 ">
                            <div className="flex items-center gap-2 text-gray-500 text-sm lg:text-base">
                              <span className="text-black text-lg lg:text-[16px]">
                                <TbAntennaBars5 />
                              </span>
                            </div>
                            <div className="flex text-sm lg:text-base bg-[#F4F6FA] p-[2px] rounded-sm text-gray-700 items-center gap-1 font-medium p">
                              <span className="text-black text-lg lg:text-[16px]">
                                <BiSolidLock />
                              </span>
                              <span
                                className={`${link?.clickCount > 0
                                  ? "text-blue-600"
                                  : "text-gray-700"
                                  } text-lg lg:text-[16px]`}
                              >
                                {link?.clickCount} clicks
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500 text-sm lg:text-base">
                              <span className="text-black text-lg lg:text-[16px]">
                                <MdDateRange />
                              </span>
                              <span className="text-lg lg:text-[16px]">
                                {moment(link?.createdAt)
                                  .format("MMM D, yyyy")
                                  .toLowerCase()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <span className="text-black text-lg lg:text-[16px]">
                                <AiFillTag />
                              </span>
                              {/* <span>{link?.tags}</span> */}
                              {link?.tags?.map((tag: any, index: number) => (
                                <div
                                  key={index}
                                  className="rounded-sm bg-[#F4F6FA] p-[2px] text-sm lg:text-base"
                                >
                                  {link?.tags?.length === 0 ? (
                                    <div>No Tags</div>
                                  ) : (
                                    <div>{tag}</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinksView;

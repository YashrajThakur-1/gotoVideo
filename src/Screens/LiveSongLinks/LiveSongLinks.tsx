import React, { useState, useEffect } from "react";
import { Checkbox } from "@mui/material";
import { TbArrowsUpDown } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
import { SiAudiomack } from "react-icons/si";
import moment from "moment"
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ATMSwitchButton from "../../component/atom/ATMTextField/ATMSwitchButton/ATMSwitchButton";
import LiveSongLinkDetail from "../LivePageDetail/LiveSongLinkDetail";
const customStyles = makeStyles({
  radio: {
    "& .MuiSvgIcon-root": {
      fontSize: "16px", // Adjust the radio button size
    },
  },
  label: {
    fontSize: "12px",
    fontWeight: "bold", // Adjust the label size
    color: "#494A56",
  },
});

type LinkProps = {
  id: string;
  customerName: string;
  longUrl: string;
  createdAt: string;
  expireAt: string;
  customer: {
    email: string;
    phone: number;
    name: string;
    clickCount: number;
  };
  planDetails: {
    type: string;
    rateLimit: number;
    expiresAt: string;
  };
};
type Props = {
  linksData: LinkProps[];
  linkDetail: LinkProps;
};
const LiveSongLinks = ({ linksData  
}: Props) => {
  const classes = customStyles();
  const [selectedValue, setSelectedValue] = useState("option1");
  const [isSideCardOpen, setIsSideCardOpen] = useState<string | null>(null);// State for controlling side card visibility
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(linksData[0]?.id);
  const [checkedLinks, setCheckedLinks] = useState(
    linksData.map((_, index) => (index === 0 ? true : false))
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // State for controlling drawer visibility
  const handleRadioChange = (event: any) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    // Reset checkbox state when the drawer is closed
    if (!isDrawerOpen) {
      const newCheckedLinks = checkedLinks.map((checked, i) =>
        i === 0 ? false : false
      );
      setCheckedLinks(newCheckedLinks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawerOpen]);

  const handleCheckboxChange = (index: number, link: any) => {
    // Clone the current checkedLinks array
    const newCheckedLinks = checkedLinks.map((checked, i) => {
      if (i === index) {
        // Toggle the clicked checkbox
        return !checked;
      } else if (i === 0) {
        // Ensure the first checkbox is always checked
        return false;
      } else {
        // Uncheck other checkboxes
        return false;
      }
    });
    console.log("selectedID",link)
    setCheckedLinks(newCheckedLinks);
    console.log("link",link)
   
    if (window.innerWidth < 640) {
      setIsDrawerOpen(true);
      setSelectedLinkId(link?.id);
      console.log(isSideCardOpen)      
    } else {
      setIsSideCardOpen(link);
     
    }
  };
  return (
    <div className="h-full w-full">
      <div className="w-full h-full">
        {/* HEADER FOR LINK PAGE ------------------------------------------------------ */}
        <div className="flex flex-col gap-3 border-gray-300 border p-5 w-full">
          <div className="flex sm:flex-row gap-5 flex-col flex justify-between  sm:items-center">
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
              <button className="text-white text-[14px] py-1 font-medium rounded-sm px-[6px] bg-[#2B5BD7] ">
                Upgrade for custom links
              </button>
              <div className="bg-[#E8EAF1] text-[#273144] text-[11px]  rounded-sm w-fit px-3 py-1">
                Select Date
              </div>
            </div>
          </div>
          <div>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="options"
                name="options"
                value={selectedValue}
                onChange={handleRadioChange}
                row
              >
                <FormControlLabel
                  value="option1"
                  control={<Radio classes={{ root: classes.radio }} />}
                  label={<span className={classes.label}>Date Created</span>}
                />
                <FormControlLabel
                  value="option2"
                  control={<Radio classes={{ root: classes.radio }} />}
                  label={<span className={classes.label}>Top Performing</span>}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <button className="text-white text-[14px] py-1 rounded-md px-[6px] bg-[#2B5BD7] flex gap-3 items-center">
              <span>
                <TbArrowsUpDown />
              </span>
              <span> Filters</span>
            </button>
          </div>
          
        </div>
       
        <div className="flex sm:flex-row flex-col  bg-slate-100 w-full h-full">
           {/* ALL LINK DATA------------------------------------------------------- */}
          <div
            className={`border-r border-divider border-gray-300 sm:w-[250px] md:w-[300px] w-full h-full flex flex-col overflow-auto`}
          >
            <div className="text-[#273144] text-[12px] p-3 border-b flex justify-end border-gray-300 w-full">
              Engagments
            </div>
            <div className="flex flex-col px-3">
              {linksData?.map((link, index) => {
                return (
                  <div
                    key={link?.id}
                    className="flex gap-1 items-center border-b border-gray-300 hover:bg-white p-1"
                  >
                    <div>
                      <Checkbox
                        checked={checkedLinks[index]}
                        onChange={() => handleCheckboxChange(index, link?.id)}
                      />
                    </div>
                    <div className="flex flex-col gap-1  w-full">
                      <div className="flex flex-col">
                        <span className="text-gray-400 text-[12px]">
                          {moment(link?.createdAt).format('MMM D').toLowerCase()}
                        </span>
                        <div className="flex items-center  ">
                          <span className="text-red-500 text-[22px] ">
                            <GoDotFill />
                          </span> 
                          <span className="text-[15px] font-medium">{link?.planDetails?.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[14px] w-full">
                        <div className="text-red-400">
                          bit{link?.customerName}
                        </div>
                        <div className="flex items-center ">
                          {link?.createdAt}
                          <span>
                            <SiAudiomack />
                          </span>
                        </div>
                      </div>
                    </div>
                   <div>
                   
                   </div>
                  </div>
                );
              
              })}
            </div>
          </div>
          {/* LIVE SONG SIGLE DETAIL DATA */}
         <div className="flex-1 p-8 hidden sm:inline">
         <LiveSongLinkDetail liveSongId={selectedLinkId}
          isDrawerOpen={isDrawerOpen} 
          IsDrawerClose={() => {
            setIsDrawerOpen(!isDrawerOpen);
            setSelectedLinkId(null);
          }}
          />
         </div>
        </div>
        </div>
    </div>
  );
};

export default LiveSongLinks;

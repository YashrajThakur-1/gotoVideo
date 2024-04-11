import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IoCloseSharp } from "react-icons/io5";
import ATMTextField from "../../component/atom/ATMTextField/ATMTextField";
import { LinksProps } from "./EditLinksFormWrapper";
import { FormikProps } from "formik";
import { AiFillWarning, AiFillQuestionCircle } from "react-icons/ai";

import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { TextField } from "@mui/material";
import { MdModeEdit } from "react-icons/md";

type Props = {
  linksProps: FormikProps<LinksProps>;
  isOpen?: boolean;
  handleSubmit: (values: string, title: string, tags: string[]) => void;
  selectedOptions: string[];
  setSelectedOptions: (value: any) => void;
};

const EditLinksForm = ({
  linksProps,
  handleSubmit,
  selectedOptions,
  setSelectedOptions,
}: Props) => {
  const { values, setFieldValue } = linksProps;
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInputSelected, setIsInputSelected] = useState(false);
  const handleSelect = (_event: object, value: string[]) => {
    setSelectedOptions(value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  // console.log(values);
  console.log("selectedOptions", selectedOptions);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue) {
      setSelectedOptions((prev: any) => {
        const newArray = Array.isArray(prev) ? [...prev, inputValue] : [inputValue];
        return newArray;
      });

      setInputValue("");
    }
  };
  // console.log("inputValue", setFieldValue);
  const options = [""];
  return (
    <div>
      <button
        className="flex text-[14px] gap-1 font-medium bg-[#EDF2FF] border  p-2 items-center rounded-md "
        onClick={handleOpen}
      >
        <MdModeEdit className="" />
      </button>
      <Dialog open={open}>
        <DialogTitle>
          <div className="flex justify-between ">
            <h1 className="font-bold">Edit link</h1>
            <button onClick={() => setOpen(false)}>
              <IoCloseSharp />
            </button>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className=" border-b-[1px] sm:pb-8 pb-6 border-gray-300">
            <div className="">
              <ATMTextField
                name="title"
                value={values.title}
                onChange={(e) => {
                  setFieldValue("title", e.target.value);
                }}
                label="Title"
                className="w-full p-2 input-field  outline-none border-gray-300 rounded text-[#273144] sm:text-[16px] text-[14px] bg-white font-normal"
                size="medium"
              />
              <div className="grid sm:grid-cols-2 gap-4 py-4 mt-1">
                <div className="">
                  <ATMTextField
                    name="domain"
                    value="go2.video"
                    onChange={(e) => {
                      setFieldValue("Domain", e.target.value);
                    }}
                    disabled
                    label="Domain "
                    placeholder="bit/ly"
                    className="w-full p-2 input-field outline-none border-gray-300 rounded text-[#273144] sm:text-[16px] text-[14px] bg-[#F4F6FA] font-normal"
                    size="medium"
                  />
                </div>
                <div className="">
                  <ATMTextField
                    name="customName"
                    value={values.customName}
                    onFocus={() => setIsInputSelected(true)}
                    // onBlur={handleInputBlur}
                    onChange={(e) => {
                      setFieldValue("customName", e.target.value);
                    }}
                    className="w-full p-2  input-field outline-none border-gray-300 rounded text-[#273144] sm:text-[16px] text-[14px] bg-white font-normal"
                    label="Custom Name (optional)"
                    size="medium"
                  />
                </div>
              </div>
            </div>
            {isInputSelected && (
              <div className="text-[#9A6C00] text-[14px]  sm:text-[16px] flex gap-2 items-center font-normal sm:py-4 py-2">
                <span className="text-[#F1C21B]">
                  <AiFillWarning />
                </span>
                <span className="flex gap-1">
                  <p className="">
                    By editing the back-half, the QR Code visual will change
                  </p>
                  <a
                    href="/read-more"
                    className="underline hover:text-[#F1C21B]"
                  >
                    Read more
                  </a>
                </span>
              </div>
            )}

            <div className="sm:pt-4 pt-3">
              <div className="p-3 bg-[#E9FBEE] text-[#014d19] flex gap-2 items-center s:text-[18px] text-[16px] font-sans ">
                <p>
                  You can create <span className="font-medium">4</span> more
                  custom back-halves this month.
                </p>
                <span>
                  <AiFillQuestionCircle />
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-bold sm:py-6 py-4">Optional details</h2>
            <div className="">
              <Autocomplete
                multiple
                options={options}
                value={values.tags}
                size="small"
                onChange={handleSelect}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      size="small"
                      deleteIcon={
                        <IoCloseSharp
                          style={{ fontSize: "14px", color: "black" }}
                        />
                      }
                      style={{
                        borderRadius: "2px",
                        backgroundColor: "#E6E6E6",
                      }}
                      label={option}
                      {...getTagProps({ index })}
                      onDelete={() =>
                        setSelectedOptions((prev: any) =>
                          prev.filter((item: any) => item !== option)
                        )
                      }
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    style={{ fontSize: "5px", outline: "none" }}
                    {...params}
                    placeholder="Select options"
                    value={values.tags}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end text-[14px] py-4 font-medium">
            <button
              className=" border-[1px] border-gray-300 py-2 px-3 rounded hover:bg-[#E3F1FE]"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#2a5bd7] py-2 px-3 rounded text-white hover:bg-[#0C3EBB]"
              onClick={() => {
                handleSubmit(values.customName, values.title, selectedOptions);
                setOpen(false);
                // console.log("firstttttttttt", values.tags);
              }}
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditLinksForm;

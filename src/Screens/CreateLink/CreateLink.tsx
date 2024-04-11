import React from "react";
import ATMTextField from "../../component/atom/ATMTextField/ATMTextField";
import { AiFillLock } from "react-icons/ai";
import ATMSwitchButton from "../../component/atom/ATMTextField/ATMSwitchButton/ATMSwitchButton";
import { BsStars } from "react-icons/bs";
import { FormikProps } from "formik";
import { CreateUrlIntialValues } from "./CreateLinkWrapper";
import { useNavigate } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";

type Props = {
  createLinkProps: FormikProps<CreateUrlIntialValues>;
};

const CreateLink = ({ createLinkProps }: Props) => {
  const navigate = useNavigate();
  const { values, setFieldValue, isSubmitting } = createLinkProps;

  return (
    <div className="w-full h-full p-10  items-center ">
      <div className="flex h-full justify-center items-center">
        <div className="w-fit h-full  justify-center items-center bg-white rounded-lg shadow-lg flex flex-col gap-3 p-5">
          <div className="flex flex-col gap-5">
            <div className="font-bold text-[25px] text-[#273144]">
              Create New{" "}
            </div>
            <div className="">
              <ATMTextField
                name="longURL"
                value={values.longURL}
                onChange={(e) => {
                  setFieldValue("longURL", e.target.value);
                }}
                label=" Paste a long URL to shorten it"
                placeholder="Example:http//super-long-link.com/shorten"
                className="w-full p-2 border border-gray-300 rounded  outline-none sm:text-[16px] text-[14px] bg-white font-normal"
                size="medium"
              />
              <div className="grid sm:grid-cols-2 gap-4 py-4 mt-1">
                <div className="flex">
                  <div className="relative w-full">
                    <ATMTextField
                      name="domain"
                      value={values.domain}
                      onChange={(e) => {
                        setFieldValue("domain", e.target.value);
                      }}
                      disabled
                      label="Domain "
                      placeholder="bit/ly"
                      className="w-full p-2 border border-gray-300 rounded cursor-not-allowed  outline-none text-gray-600 text-[16px] bg-gray-200"
                      size="medium"
                    />
                    <div className="absolute right-2 top-9">
                      <AiFillLock size={24} color="black" />
                    </div>
                  </div>
                </div>
                <div>
                  <ATMTextField
                    name="customName"
                    value={values.customName}
                    onChange={(e) => {
                      setFieldValue("customName", e.target.value);
                    }}
                    className="w-full p-2 border border-gray-300 rounded  outline-none sm:text-[16px] text-[14px] bg-white font-normal"
                    label="Custom Name (optional)"
                    size="medium"
                    placeholder="exmple:favorite-link"
                  />
                </div>
              </div>
            </div>
            <div className=" w-full pt-3">
              <a
                href="/"
                className="bg-[#C1F4F4] p-3 sm:text-[14px]  text-[12px] text-[#188CFF] flex items-center gap-2"
              >
                <BsStars /> End your link with words that will make it unique
              </a>
            </div>
            <div>
              <h2 className="text-[16px] font-medium pt-2 pb-1"> QR code</h2>
              <div className="flex p-3 items-center ">
                <ATMSwitchButton />{" "}
                <div className="text-[10px] font-medium sm:text-[14px]">
                  Generate a OR code share anywhere people can scane it{" "}
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <div>
                <button
                  type="button"
                  className="text-blue-700 px-3 py-1 rounded-[20px] hover:bg-blue-700 hover:text-white text-[16px] font-medium"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  Cancel
                </button>
              </div>
              <button
                className={`px-4 py-[6px] rounded-[20px] bg-blue-700 text-white text-[16px] font-medium ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit" // Ensure this is a submit button
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <span className="mr-2">Creating...</span>
                    <div className="animate-spin text-[20px]">
                      <LuLoader2 />
                    </div>
                  </div>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </div>

          {/* <=========cursel ===========> */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CreateLink;

import React, { useEffect } from "react";
import { AiFillLock } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ATMSwitchButton from "../../component/atom/ATMTextField/ATMSwitchButton/ATMSwitchButton";
import ATMTextField from "../../component/atom/ATMTextField/ATMTextField";
import { ShortUrlInitialValues } from "./ShortLinkWrapper";
import { useDispatch } from "react-redux";
import {
  setHandleApiCall,
  setLoginProps,
} from "../../redux/Slice/FunctionSlice";
import { FormikProps } from "formik";
import bittly from "../../assets/images/bitly.webp";

type Props = {
  loginProps: FormikProps<ShortUrlInitialValues>;
  handleAPICall: (values: ShortUrlInitialValues) => void;
};
const ShortLink = ({ loginProps, handleAPICall }: Props) => {
  const { values, setFieldValue } = loginProps;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHandleApiCall(handleAPICall));
    dispatch(setLoginProps(loginProps));
    // if (isValid) {
    //   navigate("/login"); // Navigate to the login page if isValid is true
    // }
  }, [dispatch, handleAPICall, loginProps]);
  const handleButtonClick = () => {
    const { longURL, domain, customName } = values;

    if (longURL && domain && customName) {
      // If all fields are not empty, navigate to the login page
      navigate("/login");
    } else {
      // Handle the case where one or more fields are empty, e.g., display an error message
    }
  };

  return (
    <div className="bg-[#F4F6FA] h-screen w-full">
      <div className="flex  sm:justify-around  pt-4 items-center justify-between px-8 sm:px-0">
        <div className="text-[30px] poppins text-[#EE6123] font-bold ">
          go2.video
        </div>
        <div className="flex gap-4">
          <p className="font-medium text-[20px] hover:border-b-[3px] hover:text-[#0236B9] hover:border-[#0236B9] w-fit hidden sm:inline">
            {" "}
            Pricing
          </p>
          <p
            className="sm:font-medium sm:text-[20px] text-[18px] hover:text-[#0236B9] font-bold w-fit"
            onClick={() => navigate("/sign_in")}
          >
            {" "}
            Login
          </p>
          <p className="font-medium text-[20px] text-[#0236B9]  w-fit sm:inline hidden">
            {" "}
            SignUpFree
          </p>
        </div>
      </div>
      <div className=" flex flex-col h-fit gap-4 py-4">
        <div className="grid  xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-5 md:px-10 py-4">
          <div className="sm:w-[600px] rounded-md h-full bg-white shadow-lg md:w-[900px] flex flex-col gap-3  lg:w-[585px] xl:w-full  py-5 px-8">
            <div className="w-full">
              {/* <div className="sm:text-[18px] text-blue-800 text-[16px] cursor-pointer text font-medium ">
              <a href="/">Go to Video</a>
            </div> */}

              <h1 className=" md:text-[30px] font-bold sm:text-[26px] text-[24px] shorturlname">
                {" "}
                A simple Short link but a powerful tool for your Video to Share
                and Growww...
              </h1>
              <h1>
                {/* <a
                href="https://www.youtube.com/"
                className="font-medium sm:text-[35px] text-[26px] inline-block text-center bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent"
              >
                Video Editor!
              </a> */}
              </h1>
            </div>
            <div className="w-full py-4 ">
              <p className="text-[18px] sm:text-[20px] text-gray-600">
                Our tool allows you to seamlessly track your audience with
                simple and easy-to-remember yet powerful links and provide your
                customers a unique tailored experience.
              </p>
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
                    type="text"
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
              {/* <h2 className="text-[16px] font-medium pt-2 pb-1"> QR code</h2> */}
              {/* <div className="flex p-3 items-center ">
                <ATMSwitchButton />{" "}
                <div className="text-[10px] font-medium sm:text-[14px]">
                  Generate a OR code share anywhere people can scane it{" "}
                </div>
              </div> */}
            </div>
            <div className="py-2">
              <button
                type="submit"
                className="bg-[#2B5BD7] text-[14px] sm:text-[16px] text-white py-2 px-4 rounded-md flex items-center"
                onClick={handleButtonClick}
              >
                Sign Up and Get Your Link
              </button>
            </div>
          </div>

          <div className="sm:w-[600px] md:w-[900px] lg:w-[585px] xl:w-full py-4 px-8">
            {/* <img
              src={bittly}
              style={{
                height: "75%",
                width: "75%",
                margin: "auto",
                borderRadius: "10px",
              }}
              className="w-full h-auto xl:max-w-full xl:h-[85%] lg:max-w-full lg:h-[60%]"
              alt="Responsive Bittly Image"
            /> */}
            {
              <picture
                style={{
                  height: "75%",
                  width: "75%",
                  margin: "auto",
                  borderRadius: "10px",
                }}
                className="w-full h-auto xl:max-w-full xl:h-[85%] lg:max-w-full lg:h-[60%]"
              >
                <source src={bittly} type="image/webp" />

                <source src={bittly} type="image/jpeg" />

                <img
                  src={bittly}
                  alt="Alternative text for the image"
                  style={{
                    height: "100%",
                    width: "75%",
                    margin: "auto",
                    borderRadius: "10px",
                  }}
                  className="w-full h-auto xl:max-w-full xl:h-[85%] lg:max-w-full lg:h-[60%]"
                />
              </picture>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortLink;

import React, { useState } from "react";
import GoogleLogin from "./LoginWithGoogle/GoogleLogin";
import LoginWithFacebook from "../../component/ui/LoginWithFacebook";
import login from "../../assets/images/logo.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";

const SignIn = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  // const responseGoogle = ({ data, provider }: any) => {
  //   setLoader(true);
  //   console.log("ashviiiiii");
  //   console.log("data1212211", data, provider);
  //   if (data.access_token) {
  //     setLoader(false);
  //     const email = data.email;
  //     localStorage.setItem("email", email);
  //     localStorage.setItem("GoogleAccessToken", data.access_token);
  //     localStorage.setItem("userName", data?.name);

  //     // You can directly navigate to "/home" here
  //     navigate("/home");
  //     toast.success("User Login Successfully");
  //   } else {
  //     setLoader(false);
  //     toast.error("User Not logged in with Google");
  //   }
  // };
  const responseGoogle = ({ data, provider }: any) => {
    setLoader(true);
    if (data.access_token) {
      const email = data.email;
      localStorage.setItem("email", email);
      localStorage.setItem("GoogleAccessToken", data.access_token);
      localStorage.setItem("userName", data?.name);

      // You can directly navigate to "/home" here
      navigate("/home");
      toast.success("User Login Successfully");
    } else {
      toast.error("User Not logged in with Google");
    }
    setLoader(false); // Set loader to false after handling the response
  };

  return (
    <div className="w-full h-screen items-center">
      <div className="flex  justify-center items-center  gap-5 w-full  h-full">
        <div className="shadow-2xl sm:px-20 p-4 sm:py-10  border border-gray-100">
          <div className="flex flex-col ">
            <div className="flex justify-center ">
              <img
                src={login}
                alt="Bitly login"
                className="w-[60px]  h-[60px] rounded-full"
              />
            </div>
            <h1 className="sm:text-[22px] text-[18px] font-medium text-gray-600 text-center py-1">
              Log in and start sharing
            </h1>
            <div className="flex items-center justify-center py-1">
              <p>Don't have an account</p>
            </div>
            <div className=" flex text-gray-600 sm:text-[18px] text-[17px] font-medium py-2 items-center ">
              Sign In
            </div>
            <div className="border-t border-gray-200 py-3 flex flex-col gap-3 items-center">
              <p className="font-medium text-[17px]">Log in with</p>
              {loader ? (
                <div>"loading.................."</div>
              ) : (
                <>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-center ">
                      <button
                        onClick={() => {
                          console.log("clicked");
                        }}
                        // disabled={!loginProps.isValid || !loginProps.dirty}
                      >
                        <GoogleLogin
                          className="w-full bg-[#C94130] "
                          //localId
                          // clientId="932839488446-boosudhkvt7a7lptfvm6lkprs90b0bu5.apps.googleusercontent.com"
                          // clientId="288887239237-2el2kiacmdl6naq7ikk6uft76jbcc9a5.apps.googleusercontent.com"
                          //liveId
                          onResponse={(data) => {
                            responseGoogle(data);
                          }}
                          iconProps={<AiOutlineGoogle />}
                          buttonText="Login With Google"
                        />
                      </button>
                    </div>
                    <div className="text-[12px] font-medium flex justify-center">
                      Or
                    </div>
                    <div>
                      <LoginWithFacebook />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

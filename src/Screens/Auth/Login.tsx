import React, { useEffect, useState } from "react";
import GoogleLogin from "./LoginWithGoogle/GoogleLogin";
import LoginWithFacebook from "../../component/ui/LoginWithFacebook";
import login from "../../assets/images/logo.png";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/Store";
import { AiOutlineGoogle } from "react-icons/ai";

const Login = () => {
  const { handleApiCall, loginProps } = useSelector(
    (state: RootState) => state.function
  );

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const responseGoogle = async ({ provider, data }: any) => {
    console.log("data1212", data);
    setLoading(true);

    if (data.access_token && handleApiCall && loginProps) {
      const email = data.email;
      console.log("email", email);
      localStorage.setItem("email", email);
      localStorage.setItem("GoogleAccessToken", data.access_token);
      localStorage.setItem("userName", data?.name);
      try {
        const payload = {
          longURL: loginProps?.values.longURL,
          domain: loginProps?.values.domain,
          customName: loginProps?.values.customName,
          email: email,
        };
        if (typeof handleApiCall === "function") {
          await handleApiCall(payload);
        } else {
          console.error("handleApiCall is not a function");
        }
        navigate("/home");
        toast.success("User Login Successfully");
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        loginProps?.setSubmitting(false);
      }
    } else {
      setLoading(false);
      toast.error(
        "User Not logged in with Google or handleApiCall/loginProps is null"
      );
    }
  };

  return (
    <div className="w-full h-screen items-center">
      <div className="flex justify-center items-center gap-5 w-full h-full">
        <div className="shadow-2xl sm:px-20 p-4 sm:py-10 border border-gray-100">
          <div className="flex flex-col ">
            <div className="flex justify-center ">
              <img
                src={login}
                alt=""
                className="w-[60px] h-[60px] rounded-full"
              />
            </div>
            <h1 className="sm:text-[22px] text-[18px] font-medium text-gray-600 text-center py-1">
              Log in and start sharing
            </h1>
            <div className="flex items-center justify-center py-1">
              <p>Don't have an account</p>
            </div>
            <div className="flex text-gray-600 sm:text-[18px] text-[17px] font-medium py-2 items-center ">
              Sign In
            </div>
            <div className="border-t border-gray-200 py-3 flex flex-col gap-3 items-center">
              <p className="font-medium text-[17px]">Log in with</p>
              <div className="flex flex-col gap-3">
                <div>
                  <button>
                    <GoogleLogin
                      className={`w-full bg-[#C94130] ${
                        loading && "cursor-wait"
                      }`}
                      onResponse={(data) => {
                        console.log("dat65650", data);
                        responseGoogle(data);
                      }}
                      iconProps={<AiOutlineGoogle />}
                      buttonText={
                        loading ? "Logging In..." : "Login With Google"
                      }
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

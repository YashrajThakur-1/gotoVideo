import React from "react";
import FacebookLogin from "react-facebook-login";
import { FaFacebookF } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
import {toast} from "react-hot-toast"
const LoginWithFacebook = () => {
  const navigate=useNavigate()
 
  const responseFacebook = (response: any) => {
    console.log("res",response)
    if (response.accessToken

      ) {
      localStorage.setItem("facebookAccessToken", response.accessToken

      );
      navigate("/")
      console.log("res",response.status)
      toast.success("User Login Succesfully")
    } else {
      toast.error("User Not login")
      console.log("err",response.messgae)
    console.log("login not succesfully")
    }
     
  };
  return (
    <div>
       <FacebookLogin
        appId="3227356837568591"
        autoLoad={false}
        xfbml={true}
        cookie={true}
        version	="18.0"
        scope="public_profile,email,user_birthday"
        textButton="Login With Facebook"
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="bg-[#0352D0] w-full text-white py-2 px-4 flex gap-1 text-[14px] rounded items-center font-medium font-bold"
        icon={<FaFacebookF />}
        redirectUri="https://dicecoder.com/demo_1/home" 
      />
      
    </div>
  );
};

export default LoginWithFacebook;

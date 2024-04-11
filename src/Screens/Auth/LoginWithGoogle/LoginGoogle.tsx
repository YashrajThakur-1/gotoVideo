import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
const LoginGoogle = () => {
  const navigate = useNavigate();
  const clientId =
    "288887239237-2el2kiacmdl6naq7ikk6uft76jbcc9a5.apps.googleusercontent.com";
  const responseGoogleWithoutValidation = (response: any) => {
    let decoded: any = jwt_decode(response?.credential);
    console.log("decoded", decoded);
    const token = decoded?.tokenId;
    console.log(token, "token");
    const googleId = decoded?.googleId;
    const result = { token, googleId };
    // dispatch(googleLogin({ result, navigate, toast }));
    console.log(result);

    if (response.access_token) {
      localStorage.setItem("GoogleAccessToken", decoded.access_token);
      localStorage.setItem("email", decoded.email);
      console.log("err", response);
      navigate("/home");

      toast.success("User Login Succesfully");
    } else {
      toast.error("User Not Logged In");
    }
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={responseGoogleWithoutValidation}
          state_cookie_domain={"single_host_origin"}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default LoginGoogle;

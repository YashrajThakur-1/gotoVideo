// import React from "react";
// import { LoginSocialGoogle } from "reactjs-social-login";
// import { Toaster } from "react-hot-toast";
// import { twMerge } from "tailwind-merge";

// type Props = {
//   buttonText: string;
//   onResponse: (value: any) => void;
//   className?: string;
//   // clientId: string;
//   iconProps?: React.ReactNode;
// };

// const GoogleLogin = ({
//   buttonText,
//   className,
//   onResponse,
//   // clientId,
//   iconProps,
// }: Props) => {
//   return (
//     <div>
//       <LoginSocialGoogle
//         // client_id="932839488446-boosudhkvt7a7lptfvm6lkprs90b0bu5.apps.googleusercontent.com" //port-300
//  client_id="288887239237-eap1kva69ldaet6q7r5fbs41couaqvpk.apps.googleusercontent.com" //port-800 local
// client_id="288887239237-2el2kiacmdl6naq7ikk6uft76jbcc9a5.apps.googleusercontent.com
//         // client_id={clientId}
//         scope="openid profile email"
//         discoveryDocs="claims supported"
//         typeResponse="accessToken"
//         access_type="online"
//         cookie_policy="single_host_origin"
//         onResolve={onResponse}
//         onReject={(err: any) => {
//           console.log(err, "error");
//         }}
//       >
//         <Toaster />
//         <button
//           className={twMerge(
//             ` bg-[#0352D0] w-full text-white py-2 px-5 flex gap-1 text-[14px] rounded items-center font-medium ${className}`
//           )}
//         >
//           {iconProps} {buttonText}
//         </button>
//       </LoginSocialGoogle>
//     </div>
//   );
// };

// export default GoogleLogin;
import React, { useState } from "react";
import { LoginSocialGoogle } from "reactjs-social-login";
import { Toaster } from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { LuLoader2 } from "react-icons/lu";

type Props = {
  buttonText: string;
  onResponse: (value: any) => void;
  className?: string;
  iconProps?: React.ReactNode;
};

const GoogleLogin = ({
  buttonText,
  className,
  onResponse,
  iconProps,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleResponse = (value: any) => {
    setLoading(false);
    onResponse(value);
  };

  return (
    <div className="flex justify-center items-center">
      <LoginSocialGoogle
        // client_id="288887239237-eap1kva69ldaet6q7r5fbs41couaqvpk.apps.googleusercontent.com" //port-800 local
        client_id="288887239237-2el2kiacmdl6naq7ikk6uft76jbcc9a5.apps.googleusercontent.com"
        scope="openid profile email"
        discoveryDocs="claims supported"
        typeResponse="accessToken"
        access_type="online"
        cookie_policy="single_host_origin"
        onResolve={handleResponse}
        onReject={(err: any) => {
          setLoading(false);
          console.log(err, "error");
        }}
      >
        <Toaster />
        {loading ? (
          <div className="flex justify-center items-center ">
            <button
              onClick={() => setLoading(true)}
              className={twMerge(
                ` bg-[#0352D0] w-full text-white py-2 px-5 flex gap-1 text-[14px] rounded items-center  font-medium ${className}`
              )}
              disabled={loading} // Disable the button when loading
            >
              {loading && (
                <div className="flex items-center justify-center gap-3  ">
                  <div className="animate-spin text-[20px] ">
                    <LuLoader2 />
                  </div>
                  <div>Logging</div>
                </div>
              )}{" "}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setLoading(true)}
            className={twMerge(
              ` bg-[#0352D0] w-full text-white py-2 px-5 flex gap-1 text-[14px] rounded items-center font-medium ${className}`
            )}
            disabled={loading} // Disable the button when loading
          >
            {loading && (
              <div>
                <LuLoader2 />
              </div>
            )}{" "}
            {/* Show "Loading..." text when loading */}
            {iconProps} {buttonText}
          </button>
        )}
      </LoginSocialGoogle>
    </div>
  );
};

export default GoogleLogin;
{
  /* <picture>

        <source srcset="image.webp" type="image/webp">

        <source srcset="image.jpeg" type="image/jpeg">

        <img src="image.jpeg" alt="Alternative text for the image">

    </picture> */
}

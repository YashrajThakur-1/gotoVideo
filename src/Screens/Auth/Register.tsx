import { FormikProps } from "formik";
import React from "react";
import { RegisterProps } from "./RegisterWrapper";
import ATMTextField from "../../component/atom/ATMTextField/ATMTextField";


type Props = {
  registerProps: FormikProps<RegisterProps>;
};

const Register = ({ registerProps }: Props) => {
  const { values, setFieldValue } = registerProps;
  return (
    <div className="p-5 shadow-lg">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="font-bold text-[24px] ">Register</h1>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <ATMTextField
                value={values?.firstName}
                placeholder="Enter Your First Name"
                className="border border-gray-500 rounded-none py-3 outline-none"
                onChange={(e:any) => {
                  setFieldValue("firstName", e.target.value);
                }}
                name="firstName"
                label="First Name"
                required
              />
              <ATMTextField
                value={values?.lastName}
                placeholder="Enter Your Last Name"
                className="border border-gray-500 rounded-none py-3 outline-none"
                onChange={(e:any) => {
                  setFieldValue("lastName", e.target.value);
                }}
                name="lastName"
                label="Last Name"
                required
              />
            </div>
            <ATMTextField
              value={values?.email}
              placeholder="Enter Your Email Address"
              className="border border-gray-500 rounded-none py-3 outline-none"
              onChange={(e:any) => {
                setFieldValue("email", e.target.value);
              }}
              name="email"
              label="Email Address*"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <ATMTextField
                value={values?.password}
                placeholder="Enter Your Password"
                className="border border-gray-500 rounded-none py-3 outline-none"
                onChange={(e) => {
                  setFieldValue("password", e.target.value);
                }}
                name="password"
                label="Password"
                required
              />

              <ATMTextField
                value={values?.confirmPassword}
                placeholder="Enter Your Confirm Password"
                className="border border-gray-500 rounded-none py-3 outline-none"
                onChange={(e:any) => {
                  setFieldValue("confirmPassword", e.target.value);
                }}
                name="confirmPassword"
                label="Confirm Password"
                required
              />
            </div>
          </div>
        </div>
        <div className="py-2">
          <button className="bg-[#363F4D] hover:text-white hover:bg-yellow-500 p-5 py-2 w-fit  text-white rounded">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React from "react";
import Login from "./Login";
import { Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Toaster } from "react-hot-toast";
export type LoginInitialValues = {
  email: string;
  password: string;
};
const initialValues: LoginInitialValues = {
  email: "",
  password: "",
};
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginWrapper = () => {
  const handleLogin = (
    values: LoginInitialValues,
    { resetForm, setSubmitting }: FormikHelpers<LoginInitialValues>
  ) => {};

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        {(loginProps) => (
          <Form>
            {/* <Login loginProps={loginProps} /> */}
            <Toaster />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginWrapper;

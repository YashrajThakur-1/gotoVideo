import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useCreateShortUrlMutation } from "../../redux/Service/LinkService";
import ShortLink from "./ShortLink";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export type ShortUrlInitialValues = {
  longURL: string;
  domain: string;
  customName: string;
  email: string;
};
const validationSchema = yup.object().shape({
  longURL: yup
    .string()
    .url("Please enter a valid URL")
    .required("URL is required"),
  customName: yup.string().required("customName is required"),
});

const ShortenLinkWrapper = () => {
  const navigate = useNavigate();
  const initialValues: ShortUrlInitialValues = {
    longURL: "",
    domain: "https://go2.video/",
    customName: "",
    email: "",
  };
  // Retrieve the email from localStorage


  const userEmail = localStorage.getItem("email");
  console.log("userEmail======>",userEmail)
  if (userEmail) {
    console.log("if condition:::::::")
    initialValues.email = userEmail;
  }
  const [shortUrlMutation] = useCreateShortUrlMutation();

  const handleAPICall = (values: ShortUrlInitialValues) => {
    const { domain, ...formattedValue }: any = {
      ...values,

      email: localStorage.getItem("email"),
      longURL: values?.longURL,
      customName: values?.customName,
    };
    console.log(formattedValue, "values");
    // Make the API call using the values from the form
    shortUrlMutation(formattedValue)
      .then((response: any) => {
        console.log("respone data", response);
      
        if (response?.error) {
          toast.error(response?.error?.data?.message);
        } else {
          if (response?.data) {
            console.log("message", response);
            toast.success(response?.data?.message);
            navigate("/home");
          } else {
            console.log("erRR", response);
            toast.error(response?.data?.message);
            //   showToast("error", response?.data?.message);
          }
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={() => console.log("")}
        validationSchema={validationSchema}
      >
        {(shortUrlProps) => (
          <Form>
            <ShortLink
              loginProps={{
                ...shortUrlProps,
                resetForm: shortUrlProps.resetForm,
                setSubmitting: shortUrlProps.setSubmitting,
              }}
              handleAPICall={handleAPICall}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShortenLinkWrapper;

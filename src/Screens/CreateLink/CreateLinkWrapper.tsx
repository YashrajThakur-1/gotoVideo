import React, { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useCreateShortUrlMutation } from "../../redux/Service/LinkService";
import { toast } from "react-hot-toast";
import CreateLink from "./CreateLink";
import { useNavigate } from "react-router-dom";
import SideNavigationLayout from "../../component/ui/SideNavigationLayout";
import BitlyLinkDialog from "../DialogBox/BitlyLinkDialog";
import CreateLinkError from "./CreateLinkError";

export type CreateUrlIntialValues = {
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
  customName: yup.string().required("backhalf is required"),
});

const CreateLinkWrapper = () => {
  const navigate = useNavigate();
  const [opensuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setopenErrorDialog] = useState<string | false>();
  const initialValues: CreateUrlIntialValues = {
    longURL: "",
    domain: "https://go2.video/",
    customName: "",
    email: "",
  };
  // Retrieve the email from localStorage
  const userEmail = localStorage.getItem("email");
  if (userEmail) {
    initialValues.email = userEmail;
  }
  const [shortUrlMutation] = useCreateShortUrlMutation();

  const handleSubmit = (
    values: CreateUrlIntialValues,
    { resetForm, setSubmitting }: FormikHelpers<CreateUrlIntialValues>
  ) => {
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
        console.log("responee", response);
        if (response?.error) {
          setopenErrorDialog(
            response?.error?.data?.message
          );
          setSubmitting(false);
        } else {
          if (response?.data) {
            console.log("message", response);
            toast.success(response?.data?.message);
            navigate("/home");
            resetForm();
            setOpenSuccessDialog(true);
            setSubmitting(false);
          } else {
            console.log("erRR", response);
            toast.error(response?.data?.message);
            //   showToast("error", response?.data?.message);
            setSubmitting(false);
          }
        }

      })
      .catch((error) => {
        console.error("API Error:", error);
        setSubmitting(false);
      });
  };

  return (
    <div>
      <SideNavigationLayout>
        <div className="w-full h-full">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(createUrlProps) => (
              <Form>
                <CreateLink createLinkProps={createUrlProps} />
                <button
                  type="submit"
                  className="create-button"
                  disabled={createUrlProps.isSubmitting}
                >
                  {createUrlProps.isSubmitting ? "" : ""}
                </button>
              </Form>
            )}
          </Formik>

          {opensuccessDialog ? (
            <div>
              <BitlyLinkDialog
                onClose={() => {
                  setOpenSuccessDialog(false);
                }}
              />
            </div>
          ) : null}

          {openErrorDialog ? (
            <div>
              <CreateLinkError
                message={openErrorDialog}
                onClose={() => {
                  setopenErrorDialog(false);
                }}
              />
            </div>
          ) : null}
        </div>
      </SideNavigationLayout>
    </div>
  );
};

export default CreateLinkWrapper;
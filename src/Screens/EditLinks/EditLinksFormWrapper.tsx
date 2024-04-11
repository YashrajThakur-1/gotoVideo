import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import EditLinksForm from "./EditLinksForm";

export type LinksProps = {
  title: string;
  customName: string;
  tags: string[];
};

interface EditLinksFormWrapperProps {
  handleEdit: (values: any, title: string, tag: string[]) => void;
  customId: any;
  selectedOptions: string[];
  setSelectedOptions: (value: any) => void;
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Please Enter Title"),
  customName: yup.string().required("Domain is required"),
  backhalf: yup.string().required("backhalf is required"),
});

const EditLinksFormWrapper: React.FC<EditLinksFormWrapperProps> = ({
  handleEdit,
  customId,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [customData, setCustomData] = useState<any | null>(null);

  console.log("first");
  const initialValue = {
    title: customData?.data?.title || "",
    customName: customData?.data?.customName || "",
    tags: customData?.data?.tags || "",
  };

  console.log("customData", customData?.data?.customName);
  const fetchData = async () => {
    try {
      const response = await fetch("https://testapi.go2.video/customName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customName: customId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      setCustomData(data);
      // Set the response data in the state
      //
    } catch (error: any) {
      console.error("API Error:", error.message);
    }
  };
  useEffect(() => {
    fetchData();

    // fetchData()
  }, []); // Empty dependency array means it runs once on mount
  console.log("initialValues", initialValue);
  return (
    <div>
      <Formik
        initialValues={initialValue}
        enableReinitialize={true}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <Form>
            <EditLinksForm
              linksProps={formikProps}
              handleSubmit={handleEdit}
              selectedOptions={selectedOptions}
              setSelectedOptions={(value) => {
                setSelectedOptions(value);
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditLinksFormWrapper;

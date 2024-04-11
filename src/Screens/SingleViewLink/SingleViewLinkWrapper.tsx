import React, { useEffect, useState } from "react";
import SideNavigationLayout from "../../component/ui/SideNavigationLayout";
import SingleViewLink from "./SingleViewLink";
import { useParams } from "react-router-dom";

const SingleViewLinkWrapper = () => {
  const { customName } = useParams();
  const [customData, setCustomData] = useState<any>(null);
  const fetchData = async () => {
    try {
      const response = await fetch(`https://testapi.go2.video/customName`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customName: customName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      setCustomData(data);
    } catch (error: any) {
      console.error("API Error:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log("first", customData);
  const linkssingleViewData = {
    avtarUrl: customData?.data?.avtarUrl || "",
    title: customData?.data?.title || "",
    click: customData?.data?.clicks || "",
    longUrl: customData?.data?.longURL || "",
    shortUrl: customData?.data?.shortURL || "",
    createdAt: customData?.data?.createdAt || "",
    tags: customData?.data?.tags || ["No Tags"],
  };

  return (
    <div className="w-full h-screen">
      <SideNavigationLayout>
        <SingleViewLink singleLinkData={linkssingleViewData} />
      </SideNavigationLayout>
    </div>
  );
};

export default SingleViewLinkWrapper;

import React, { useEffect, useState } from "react";
import SideNavigationLayout from "../../component/ui/SideNavigationLayout";
import LinksView from "./LinksView";
import {
  useGetDocumentsByEmailQuery,
  useDeleteShortUrlMutation,
  useEditShortUrlMutation,
} from "../../redux/Service/LinkService";

const LinksViewWrapper = () => {
  const emailId: string | null = localStorage.getItem("email");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [documentDetail, setDocumentDetail] = useState<any[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<any>();
  const {
    data: documentData,
    isLoading: documentIsLoading,
    isFetching: documentIsFetching,
    refetch
  } = useGetDocumentsByEmailQuery(emailId);
  const [deleteShortUrlMutation] = useDeleteShortUrlMutation();
  const [editShortUrlMutation] = useEditShortUrlMutation();

  // console.log(documentData, "documentDetail");

  // // const dataIntoParse = JSON.parse(documentData?.data);
  // console.log(documentDetail, "documentData");

  useEffect(() => {
    if (documentIsLoading && documentIsFetching) {
      setIsLoading(true);
    } else {
      setDocumentDetail(documentData?.data || []);
      setIsLoading(false);
    }
  }, [documentData, documentIsLoading, documentIsFetching]);
  const handleDeleteShortUrl = async (customeName: string) => {
    await deleteShortUrlMutation({ customName: customeName })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleEditShorUrl = async (
    customeName: string,
    title: string,
    tags: string[]
  ) => {
    await editShortUrlMutation({
      customName: customeName,
      title: title,
      tags: tags,
    })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <div className="w-full h-screen ">
      <SideNavigationLayout>
        <LinksView
          linksData={documentDetail}
          isLoading={isLoading}
          handleDelete={handleDeleteShortUrl}
          handleEditShortUrl={handleEditShorUrl}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          refetch={refetch}
          setIsLoading={setIsLoading}
        />
      </SideNavigationLayout>
    </div>
  );
};
export default LinksViewWrapper;

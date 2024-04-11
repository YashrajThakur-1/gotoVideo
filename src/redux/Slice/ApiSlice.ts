import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BaseUrl = process.env.REACT_APP_BASE_URL;
console.log(BaseUrl, "BaseUrl");
const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  endpoints: (build) => ({}),
  tagTypes: ["goToVideo"],
});
export default apiSlice;

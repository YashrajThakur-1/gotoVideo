import { ShortenUrlRequest } from "../../model/goToVideo.model";
import apiSlice from "../Slice/ApiSlice";
const linkService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Add Link
    createShortUrl: builder.mutation({
      invalidatesTags: ["goToVideo"],
      query: (body: ShortenUrlRequest) => ({
        url: "/createshorturl",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),

    getDocumentsByEmail: builder.query({
      providesTags: ["goToVideo"],
      query: (emailId: string | null) => ({
        url: `/email`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { emailId },
      }),
    }),

    getDocumentByCustomName: builder.query({
      providesTags: ["goToVideo"],
      query: (customName: string | null) => ({
        url: `/InsightsByCustomName`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { customName },
      }),
    }),
    deleteShortUrl: builder.mutation({
      invalidatesTags: ["goToVideo"],
      query: (body: any) => ({
        url: `/markfordelete`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
    EditShortUrl: builder.mutation({
      invalidatesTags: ["goToVideo"],
      query: (body: any) => ({
        url: `/editshorturl`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),

    // EditShortUrl: builder.mutation({
    //   invalidatesTags: ["goToVideo"],
    //   query: (shortUrlId: string | null) => ({
    //     url: `/editshorturl/${shortUrlId}`,
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }),
    // }),
  }),
});
export const {
  useCreateShortUrlMutation,
  useGetDocumentsByEmailQuery,
  useGetDocumentByCustomNameQuery,
  useDeleteShortUrlMutation,
  useEditShortUrlMutation,
} = linkService;

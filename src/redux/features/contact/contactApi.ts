import { baseApi } from "@/redux/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/contact/send-message",
        method: "POST",
        body: data,
      }),
    }),
    getAllMessages: builder.query({
      query: () => ({
        url: "/contact/all-messages",
        method: "GET",
      }),
      providesTags: ["MESSAGES"],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/contact/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MESSAGES"],
    }),
  }),
});

export const { useSendMessageMutation, useGetAllMessagesQuery, useDeleteMessageMutation } = contactApi;

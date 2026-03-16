import { baseApi } from "@/redux/baseApi";


const aiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatResponse: builder.mutation({
      query: (message: string) => ({
        url: "/ai/chat",
        method: "POST",
        body: { message },
      }),
    }),
  }),
});

export const { useGetChatResponseMutation } = aiApi;
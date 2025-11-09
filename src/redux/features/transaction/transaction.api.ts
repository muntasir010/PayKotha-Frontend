 
import { baseApi } from "@/redux/baseApi";

// Extend baseApi for transaction-related queries
export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get Transaction History
    getTransactionHistory: builder.query({
      query: ({ page = 1, limit = 10, type, startDate, endDate }) => {
        let url = `/api/transactions/history?page=${page}&limit=${limit}`;
        if (type) url += `&type=${type}`;
        if (startDate) url += `&startDate=${startDate}`;
        if (endDate) url += `&endDate=${endDate}`;
        return { url, method: "GET" };
      },
      providesTags: ["TRANSACTIONS"],
    }),

    // ✅ Get Commission History
    getCommissionHistory: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/api/transactions/commission?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["TRANSACTIONS"],
    }),
  }),
});

export const { useGetTransactionHistoryQuery, useGetCommissionHistoryQuery } =
  transactionApi;
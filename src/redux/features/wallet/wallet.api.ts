/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get Wallet
    getWallet: builder.query({
      query: () => ({
        url: "/wallet",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),

    // ✅ Add Money
    addMoney: builder.mutation({
      query: (data) => ({
        url: "/wallet/add-money",
        method: "POST",
        body:data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            walletApi.util.updateQueryData(
              "getWallet",
              undefined,
              (draft: any) => {
                if (draft?.data?.wallet) {
                  draft.data.wallet.balance = data.data.wallet.balance;
                }
              }
            )
          );
        } catch (err) {
          console.error("AddMoney cache update failed:", err);
        }
      },
      invalidatesTags: ["TRANSACTIONS"],
    }),

    // ✅ Withdraw
    withdraw: builder.mutation({
      query: (data) => ({
        url: "/wallet/withdraw",
        method: "POST",
         body:data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            walletApi.util.updateQueryData(
              "getWallet",
              undefined,
              (draft: any) => {
                if (draft?.data?.wallet) {
                  draft.data.wallet.balance = data.data.wallet.balance;
                }
              }
            )
          );
        } catch (err) {
          console.error("Withdraw cache update failed:", err);
        }
      },
      invalidatesTags: ["TRANSACTIONS"],
    }),

    // ✅ Send Money
    sendMoney: builder.mutation({
      query: (data) => ({
        url: "/wallet/send-money",
        method: "POST",
         body:data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            walletApi.util.updateQueryData(
              "getWallet",
              undefined,
              (draft: any) => {
                if (draft?.data?.wallet) {
                  draft.data.wallet.balance = data.data.fromWallet.balance;
                }
              }
            )
          );
        } catch (err) {
          console.error("SendMoney cache update failed:", err);
        }
      },
      invalidatesTags: ["TRANSACTIONS"],
    }),

    // ✅ Agent Cash In
    cashIn: builder.mutation({
      query: (data) => ({
        url: "/wallet/cash-in",
        method: "POST",
        body:data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            walletApi.util.updateQueryData(
              "getWallet",
              undefined,
              (draft: any) => {
                if (draft?.data?.wallet && data?.data?.wallet) {
                  draft.data.wallet.balance = data.data.wallet.balance;
                }
              }
            )
          );
        } catch (err) {
          console.error("CashIn cache update failed:", err);
        }
      },
      invalidatesTags: ["TRANSACTIONS"],
    }),

    // ✅ Agent Cash Out
    cashOut: builder.mutation({
  query: ({ userId, amount, description }) => ({
    url: "/wallet/cash-out",
    method: "POST",
    body: {
      userId,      
      amount,       
      description: description || "",
    },
    credentials: "include",
  }),
})

  }),
});

export const {
  useGetWalletQuery,
  useAddMoneyMutation,
  useWithdrawMutation,
  useSendMoneyMutation,
  useCashInMutation,
  useCashOutMutation,
} = walletApi;
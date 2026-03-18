import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 📊 Overview
    getOverview: builder.query({
      query: () => ({
        url: `/admin/overview`,
        method: "GET",
      }),
      providesTags: ["OVERVIEW"],
    }),

    // 👤 Get all users (with filters & search)
    getAllUsers: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        status = "",
      }: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
      }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (search) params.append("search", search);
        if (status) params.append("status", status);

        return {
          url: `/admin/users?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["USERS"],
    }),


    // 👛 Get all wallets (with filters & search)
    getAllWallets: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        isBlocked = "",
      }: {
        page?: number;
        limit?: number;
        search?: string;
        isBlocked?: string; // "true" | "false"
      }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (search) params.append("search", search);
        if (isBlocked) params.append("isBlocked", isBlocked);

        return {
          url: `/admin/wallet?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["WALLET"],
    }),

    // 💸 Get all transactions (with advanced filters)
    getAllTransactions: builder.query({
      query: ({
        page = 1,
        limit = 10,
        type = "",
        status = "",
        minAmount = "",
        maxAmount = "",
        startDate = "",
        endDate = "",
        search = "",
      }: {
        page?: number;
        limit?: number;
        type?: string;
        status?: string;
        minAmount?: string;
        maxAmount?: string;
        startDate?: string;
        endDate?: string;
        search?: string;
      }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (type) params.append("type", type);
        if (status) params.append("status", status);
        if (minAmount) params.append("minAmount", minAmount);
        if (maxAmount) params.append("maxAmount", maxAmount);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        if (search) params.append("search", search);

        return {
          url: `/admin/transactions?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["TRANSACTIONS"],
    }),

    // 🔒 Block a wallet
    blockWallet: builder.mutation({
      query: (walletId: string) => ({
        url: `/admin/wallet/${walletId}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["WALLET", "TRANSACTIONS"],
    }),

    // 🔓 Unblock a wallet
    unblockWallet: builder.mutation({
      query: (walletId: string) => ({
        url: `/admin/wallet/${walletId}/unblock`,
        method: "PATCH",
      }),
      invalidatesTags: ["WALLET", "TRANSACTIONS"],
    }),

    //  Approve an agent
    approveAgent: builder.mutation({
      query: (userId: string) => ({
        url: `/admin/agents/${userId}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS"],
    }),

    // 🚫 Suspend an agent
    suspendAgent: builder.mutation({
      query: (userId: string) => ({
        url: `/admin/agents/${userId}/suspend`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS"],
    }),

    // 🚫 Block a user
    blockUser: builder.mutation({
      query: (userId: string) => ({
        url: `/admin/users/${userId}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS", "WALLET"],
    }),

    // 🔓 Unblock a user
    unblockUser: builder.mutation({
      query: (userId: string) => ({
        url: `/admin/users/${userId}/unblock`,
        method: "PATCH",
      }),
      invalidatesTags: ["USERS", "WALLET"],
    }),
  }),
});

export const {
  useGetOverviewQuery,
  useGetAllUsersQuery,
  useGetAllWalletsQuery,
  useGetAllTransactionsQuery,
  useBlockWalletMutation,
  useUnblockWalletMutation,
  useApproveAgentMutation,
  useSuspendAgentMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
} = adminApi;

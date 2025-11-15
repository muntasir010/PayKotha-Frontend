import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // ✅ Update userInfo cache with logged-in user
          dispatch(
            authApi.util.updateQueryData("userInfo", undefined, () => data.data)
          );
        } catch (err) {
          console.error("Login cache update failed:", err);
        }
      },
    }),

    // logout: builder.mutation({
    //   query: () => ({
    //     url: "/auth/logout",
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["USER"],
    // }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // ✅ Clear frontend token
          localStorage.removeItem("token");
          // Optionally reset any Redux slices
          dispatch(authApi.util.resetApiState());
        } catch (err) {
          console.error("Logout failed:", err);
        }
      },
      invalidatesTags: ["USER"],
    }),

    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    // ✅ New: Update Profile
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/users/update",
        method: "PUT",
        body: profileData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Update userInfo cache with new profile data
          dispatch(
            authApi.util.updateQueryData(
              "userInfo",
              undefined,
              () => data.data.user
            )
          );
        } catch (err) {
          console.error("Profile update cache failed:", err);
        }
      },
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUserInfoQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
} = authApi;

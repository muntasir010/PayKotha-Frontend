import { baseApi } from "@/redux/baseApi";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
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

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),

    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
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
        url: "/user/update",
        method: "PUT",
        data: profileData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Update userInfo cache with new profile data
          dispatch(
            authApi.util.updateQueryData("userInfo", undefined, () => data.data.user)
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
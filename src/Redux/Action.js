import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_DEVELOPEMENT_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      console.log(state);
      headers.set(
        "Authorization",
        `bearer ${state["rootReducer"]["userSlice"]["token"]}`
      );
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (payload) => ({
        url: "/api/v1/read",
        method: "GET",
      }),
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/register",
        method: "POST",
        body: payload,
      }),
    }),
    otpverification: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/otpverification",
        method: "PUT",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/login",
        method: "POST",
        body: payload,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/forgotpassword",
        method: "POST",
        body: payload,
      }),
    }),
    forgotPasswordOtpVerification: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/passowrdotpverification",
        method: "POST",
        body: payload,
      }),
    }),
    updatePassword: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/updatepassword",
        method: "PUT",
        body: payload,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/v1/logout",
        method: "POST",
      }),
    }),
  }),
});

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    subscriptionsCreation: builder.query({
      query: () => ({
        url: "/api/v1/buysubscription",
        method: "GET",
      }),
    }),
    orderCreation: builder.mutation({
      query: (body) => ({
        url: "/api/v1/ordercreation",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: (payload = "default") => ({
        url: `/api/v1/getAllOrder?page=${payload.page}&batchSize=10&order_status=${payload.activeButton}&searchTerm=${payload.searchInput}&start_date=2025-01-22&end_date=2025-04-06`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getOrder: builder.query({
      query: (obj) => ({
        url: `/api/v1/getorder?id=${obj.orderid}&slug=${obj.slug}`,
        method: "GET",
      }),
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/api/v1/ordercreate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
    bulkUploadOrder: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/bulkorderupload",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["order"],
    }),
    updateOrder: builder.mutation({
      query: (body) => ({
        url: "/api/v1/orderupdate",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useRegisterMutation,
  useOtpverificationMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useForgotPasswordOtpVerificationMutation,
  useUpdatePasswordMutation,
  useLogoutMutation,
} = userApi;

export const { useOrderCreationMutation, useLazySubscriptionsCreationQuery } =
  paymentApi;

export const {
  useGetOrderQuery,
  useLazyGetAllOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useBulkUploadOrderMutation,
} = orderApi;

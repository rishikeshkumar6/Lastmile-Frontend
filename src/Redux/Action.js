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
      providesTags: ["walletRefetch"],
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
    walletHistory: builder.query({
      query: (payload) => ({
        url: `/api/v1/walletHistory?page=${payload.currentPage}&batchSize=${payload.batchSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: (payload = "default") => ({
        url: `/api/v1/getAllOrder?page=${payload.page}&batchSize=10&order_status=${payload.activeButton}&searchTerm=${payload.searchInput}&start_date=${payload.dates.start_date}&end_date=${payload.dates.end_date}`,
        method: "GET",
      }),
      providesTags: ["getAllOrders"],
    }),
    getOrder: builder.query({
      query: (obj) => ({
        url: `/api/v1/getorder?id=${obj.orderid}&slug=${obj.slug}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getAllProduct: builder.query({
      query: (payload) => ({
        url: `/api/v1/getAllProduct?page=${payload.page}&batchSize=${10}`,
        method: "GET",
      }),
      providesTags: ["getAllProduct"],
    }),
    updateProduct: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/updateProduct",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getAllProduct"],
    }),
    deleteProduct: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/deleteProduct",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getAllProduct"],
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
      invalidatesTags: ["getAllOrders"],
    }),
    updateOrder: builder.mutation({
      query: (body) => ({
        url: "/api/v1/orderupdate",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: [
        "order",
        "getAllOrders",
        "getAllPickup",
        "getAllPickupForm",
      ],
    }),
    deleteOrder: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/deleteOrder",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getAllOrders"],
    }),
    generateLabel: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/generateLabel",
        method: "POST",
        body: payload,
      }),
    }),
    shippingOrder: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/shipping_order",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getAllOrders", "walletRefetch"],
    }),
    pickupCreate: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/pickupcreate",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getAllPickup"],
    }),
    getAllPickup: builder.query({
      query: (payload) => ({
        url: `/api/v1/getAllPickup?page=${payload.page}&batchSize=10&searchTerm=${payload.searchInput}`,
        method: "GET",
      }),
      providesTags: ["getAllPickup"],
    }),
    getAllPickupForm: builder.query({
      query: () => ({
        url: "/api/v1/getAllPickup",
        method: "GET",
      }),
      providesTags: ["getAllPickupForm"],
    }),
    updatePickupStatus: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/updatePickupStatus",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getAllPickup"],
    }),
    updatePickup: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/updatePickup",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getAllPickup"],
    }),
    deletePickup: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/deletePickup",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["getAllPickup"],
    }),
    imageUpload: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/productimage",
        method: "POST",
        body: payload,
      }),
    }),
    freightRate: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/freight_rate",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response, meta, arg) => {
        const obj = response.freightResponse;
        const ArrKey = Object.keys(obj);
        const newArray = ArrKey.map((elem, index) => {
          const freight_rate = obj[elem]["freight_rate"];
          const rto_rate = obj[elem]["rto_rate"];
          const img_url = obj[elem]["img_url"];
          const min_weight = obj[elem]["min_weight"];
          const estimate_delivey_date = obj[elem]["estimate_delivey_date"];
          const estimated_pickup_date = obj[elem]["estimated_pickup_date"];
          const weight = (obj[elem]["weight"] = obj[elem]["weight"]);
          return {
            courierName: elem,
            freight_rate,
            rto_rate,
            img_url,
            min_weight,
            estimate_delivey_date,
            estimated_pickup_date,
            weight,
          };
        });
        return newArray;
      },
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

export const {
  useOrderCreationMutation,
  useLazySubscriptionsCreationQuery,
  useLazyWalletHistoryQuery,
} = paymentApi;

export const {
  useGetOrderQuery,
  useLazyGetAllOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useBulkUploadOrderMutation,
  useGenerateLabelMutation,
  useShippingOrderMutation,
  usePickupCreateMutation,
  useLazyGetAllPickupQuery,
  useLazyGetAllProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdatePickupStatusMutation,
  useGetAllPickupFormQuery,
  useDeleteOrderMutation,
  useUpdatePickupMutation,
  useDeletePickupMutation,
  useImageUploadMutation,
  useFreightRateMutation,
} = orderApi;

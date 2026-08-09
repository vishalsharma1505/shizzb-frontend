import { apiSlice } from "../../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({

    // ===============================
    // Razorpay Create Order
    // ===============================

    createRazorpayOrder: builder.mutation({

      query: (data) => ({

        url: "http://localhost:7000/api/payment/create-order",

        method: "POST",

        body: data,

      }),

    }),

    // ===============================
    // Save Order
    // ===============================

    saveOrder: builder.mutation({

      query: (data) => ({

        url: "http://localhost:7000/api/order/saveOrder",

        method: "POST",

        body: data,

      }),

      invalidatesTags: ["UserOrders"],

      async onQueryStarted(arg, { queryFulfilled }) {

        try {

          const result = await queryFulfilled;

          if (result) {

            localStorage.removeItem("couponInfo");

            localStorage.removeItem("cart_products");

            localStorage.removeItem("shipping_info");

          }

        } catch (err) {}

      },

    }),

    // ===============================
    // User Orders
    // ===============================

    getUserOrders: builder.query({

      query: () =>
        "http://localhost:7000/api/user-order",

      providesTags: ["UserOrders"],

      keepUnusedDataFor: 600,

    }),

    // ===============================
    // Single Order
    // ===============================

    getUserOrderById: builder.query({

      query: (id) =>
        `http://localhost:7000/api/user-order/${id}`,

      providesTags: (result, error, arg) => [

        { type: "UserOrder", id: arg },

      ],

      keepUnusedDataFor: 600,

    }),

  }),

});

export const {

  useCreateRazorpayOrderMutation,

  useSaveOrderMutation,

  useGetUserOrdersQuery,

  useGetUserOrderByIdQuery,

} = authApi;
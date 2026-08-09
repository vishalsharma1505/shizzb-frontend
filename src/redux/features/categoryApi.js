import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({

    // ==========================
    // Add Category
    // ==========================

    addCategory: builder.mutation({
      query: (data) => ({
        url: "https://shizzb-backend.onrender.com/api/category/add",
        method: "POST",
        body: data,
      }),
    }),

    // ==========================
    // Show Categories
    // ==========================

    getShowCategory: builder.query({
      query: () =>
        "https://shizzb-backend.onrender.com/api/category/show",
    }),

    // ==========================
    // Product Type Categories
    // ==========================

    getProductTypeCategory: builder.query({
      query: (type) =>
        `https://shizzb-backend.onrender.com/api/category/show/${type}`,
    }),

    // ==========================
    // Home Categories
    // ==========================

    getHomeCategories: builder.query({
      query: () =>
        "https://shizzb-backend.onrender.com/api/category/home",
    }),

  }),
});

export const {

  useAddCategoryMutation,

  useGetShowCategoryQuery,

  useGetProductTypeCategoryQuery,

  useGetHomeCategoriesQuery,

} = categoryApi;
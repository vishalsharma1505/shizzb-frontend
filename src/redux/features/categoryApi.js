import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({

    // ==========================
    // Add Category
    // ==========================

    addCategory: builder.mutation({
      query: (data) => ({
        url: "http://localhost:7000/api/category/add",
        method: "POST",
        body: data,
      }),
    }),

    // ==========================
    // Show Categories
    // ==========================

    getShowCategory: builder.query({
      query: () =>
        "http://localhost:7000/api/category/show",
    }),

    // ==========================
    // Product Type Categories
    // ==========================

    getProductTypeCategory: builder.query({
      query: (type) =>
        `http://localhost:7000/api/category/show/${type}`,
    }),

    // ==========================
    // Home Categories
    // ==========================

    getHomeCategories: builder.query({
      query: () =>
        "http://localhost:7000/api/category/home",
    }),

  }),
});

export const {

  useAddCategoryMutation,

  useGetShowCategoryQuery,

  useGetProductTypeCategoryQuery,

  useGetHomeCategoriesQuery,

} = categoryApi;
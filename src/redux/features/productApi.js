import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `https://shizzb-backend.onrender.com/api/product/all`,
      providesTags:['Products']
    }),
    getProductType: builder.query({
      query: ({ type, query }) => `https://shizzb-backend.onrender.com/api/product/${type}?${query}`,
      providesTags:['ProductType']
    }),
    getOfferProducts: builder.query({
      query: (type) => `https://shizzb-backend.onrender.com/api/product/offer?type=${type}`,
      providesTags:['OfferProducts']
    }),
    getPopularProductByType: builder.query({
      query: (type) => `https://shizzb-backend.onrender.com/api/product/popular/${type}`,
      providesTags:['PopularProducts']
    }),
    getTopRatedProducts: builder.query({
      query: () => `https://shizzb-backend.onrender.com/api/product/top-rated`,
      providesTags:['TopRatedProducts']
    }),
    // get single product
    getProduct: builder.query({
  query: (id) => `/api/product/single-product/${id}`,

  transformResponse: (response) => response.data,

  providesTags: (result, error, arg) => [
    { type: "Product", id: arg }
  ],

  invalidatesTags: (result, error, arg) => [
    { type: "RelatedProducts", id: arg }
  ],
}),
    // get related products
    getRelatedProducts: builder.query({
      query: (id) => `https://shizzb-backend.onrender.com/api/product/related-product/${id}`,
      providesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
  useGetOfferProductsQuery,
  useGetPopularProductByTypeQuery,
  useGetTopRatedProductsQuery,
  useGetProductQuery,
  useGetRelatedProductsQuery,
} = productApi;

import { apiSlice } from "../../api/apiSlice";

export const blogApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({

    // Get All Blogs
    getBlogs: builder.query({
      query: () => "/api/blog",
      providesTags: ["Blogs"],
    }),

    // Get Single Blog
    getBlog: builder.query({
      query: (id) => `/api/blog/${id}`,
      providesTags: (result, error, id) => [
        { type: "Blogs", id },
      ],
    }),

    // Create Blog
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/api/blog/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blogs"],
    }),

    // Update Blog
    updateBlog: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/blog/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blogs"],
    }),

    // Delete Blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/api/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),

  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
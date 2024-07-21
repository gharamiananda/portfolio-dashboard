import { baseApi } from '../../api/baseApi';

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addblog: builder.mutation({
      query: (userInfo) => ({
        url: '/blogs',
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags:['sales','filter']
    }),
    getblogs: builder.query({
      query: (query) => ({
        url: '/blogs',

        method: 'GET'
      }),
    }),
    getFilterOptions: builder.query({
      query: () => ({
        url: '/blogs/filter-options',

        method: 'GET'
      }),
      providesTags:['filter']
    }),
    
    getSingleblog: builder.query({
      query: (blogId) => ({
        url: '/blogs/'+blogId,
        method: 'GET'
      }),
    }),
    deleteblog: builder.mutation({
      query: (blogsIds) => ({
        url: '/blogs/delete-blogs',
        method: 'DELETE',
        body:blogsIds

      }),
    }),

    updateblog: builder.mutation({
      query: ({blogId,...data}) => ({
        url: '/blogs/'+blogId,
        method: 'PATCH',
        body:data

      }),

    }),
  }),
});

export const {useGetFilterOptionsQuery, useAddblogMutation, useGetblogsQuery , useDeleteblogMutation, useGetSingleblogQuery,useUpdateblogMutation} = blogApi;

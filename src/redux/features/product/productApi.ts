import { baseApi } from '../../api/baseApi';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (userInfo) => ({
        url: '/projects',
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags:['sales','product','filter']
    }),
    getProducts: builder.query({
      query: (query) => ({
        url: '/projects',

        method: 'GET'
      }),
      providesTags:['product']
    }),
    getFilterOptions: builder.query({
      query: () => ({
        url: '/products/filter-options',

        method: 'GET'
      }),
      providesTags:['filter']
    }),
    
    getSingleProduct: builder.query({
      query: (productId) => ({
        url: '/projects/'+productId,
        method: 'GET'
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productsIds) => ({
        url: '/products/delete-products',
        method: 'DELETE',
        body:productsIds

      }),
      invalidatesTags:['sales','product']
    }),

    updateProduct: builder.mutation({
      query: ({productId,...data}) => ({
        url: '/projects/'+productId,
        method: 'PATCH',
        body:data

      }),
      invalidatesTags:['sales','product']

    }),
  }),
});

export const {useGetFilterOptionsQuery, useAddProductMutation, useGetProductsQuery , useDeleteProductMutation, useGetSingleProductQuery,useUpdateProductMutation} = productApi;

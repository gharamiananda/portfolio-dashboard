import { baseApi } from '../../api/baseApi';

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSales: builder.mutation({
      query: (sales) => ({
        url: '/sales',
        method: 'POST',
        body: sales,
      }),
      invalidatesTags:['sales','product']
    }),
    getSales: builder.query({
      query: (query) => ({
        url: '/sales?'+query,
        method: 'GET'
      }),
      providesTags:['sales']
    }),
    // getSingleProduct: builder.query({
    //   query: (productId) => ({
    //     url: '/products/'+productId,
    //     method: 'GET'
    //   }),
    // }),
    // deleteProduct: builder.mutation({
    //   query: (productsIds) => ({
    //     url: '/products/delete-products',
    //     method: 'DELETE',
    //     body:productsIds

    //   }),
    // }),

    // updateProduct: builder.mutation({
    //   query: ({productId,...data}) => ({
    //     url: '/products/'+productId,
    //     method: 'PATCH',
    //     body:data

    //   }),
    // }),
  }),
});

export const { useAddSalesMutation, useGetSalesQuery} = salesApi;

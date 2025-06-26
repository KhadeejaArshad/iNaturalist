import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://109.1.1.21:5000/api' }),
  tagTypes: ['Product'],
  endpoints: builder => ({
    //Get All the products (Reading)
    getAllProduct: builder.query({
      query: () => '/products',
      providesTags: ['Product'],
    }),
    getProductById: builder.query({
      query: id => `/products/${id}`,
      providesTags: ['Product'],
    }),
    addNewProduct: builder.mutation({
      query: newProduct => ({
        url: '/product',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newProduct,
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      query: ( product ) => ({
        url: `/product`,
        method: 'PUT',

        headers: { 'Content-Type': 'application/json' },
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    DeleteProduct: builder.mutation({
      query: id => ({
        url: `/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});
export const {
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useAddNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;

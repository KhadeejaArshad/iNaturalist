import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://109.1.1.21:5000/api' }),
  endpoints: builder => ({
    //Get All the products (Reading)
    getAllProduct: builder.query({
      query: () => '/products',
    }),
    getProductById: builder.query({
      query: id => `/products/${id}`,
    }),
    addNewProduct: builder.mutation({
      query: newProduct => ({
        url: '/products/add',
        method: 'POST',

        headers: { 'Content-Type': 'application/json' },
        body:newProduct
      }),
    }),
    updateProduct: builder.mutation({
      query: ({id,updateProduct}) => ({
        url: `/products/${id}`,
        method: 'PUT',

        headers: { 'Content-Type': 'application/json' },
        body:updateProduct
      }),
    }),
    DeleteProduct:builder.mutation({
      query: id =>({
        url:`/products/${id}`,
        method:'DELETE'
      })
    })
  }),
});
export const { useGetAllProductQuery, useGetProductByIdQuery ,useAddNewProductMutation,useUpdateProductMutation,useDeleteProductMutation} = productsApi;

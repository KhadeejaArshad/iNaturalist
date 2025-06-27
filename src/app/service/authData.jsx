import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://109.1.1.21:5000/api' }),
  tagTypes: ['Auth'],
  endpoints: builder => ({
    signUp: builder.mutation({
      query: newUser => ({
        url: '/signup',
        method: 'POST',
        body: newUser,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),

    login: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.example.com',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Posts', 'User'], // Define tags for invalidation
  endpoints: (builder) => ({
    // Just an example endpoint
    getPosts: builder.query<any[], void>({
      query: () => 'posts',
      providesTags: ['Posts'],
    }),
    getPostById: builder.query<any, number>({
        query: (id) => `posts/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostsQuery, useGetPostByIdQuery } = baseApi;

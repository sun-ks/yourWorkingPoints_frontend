import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const refreshTokenAPI = createApi({
  reducerPath: 'refresh_token',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    refreshToken: build.query<any, any>({
      query: () => ({
        url: `/auth/refresh_token`,
        method: 'GET',
      }),
    }),
  }),
});

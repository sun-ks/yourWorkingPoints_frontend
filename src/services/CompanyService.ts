import {createApi} from "@reduxjs/toolkit/dist/query/react";
import baseQueryCheckAccessToken from './baseQueryCheckAccessToken';

export const companyAPI = createApi({
  reducerPath: 'companyAPI',
  baseQuery: baseQueryCheckAccessToken,
  tagTypes: ['Company'],
  endpoints: (build) => ({
    getCompany: build.query<any, any>({
      query: () => ({
        url: `/company`,
      }),
      providesTags: result => ['Company']
    }),
    updateCompany: build.mutation<any, any>({
      query: (args) => ({
        url: `/company`,
        method: 'put',
        body: args
      }),
      invalidatesTags: ['Company']
    })
  })
});
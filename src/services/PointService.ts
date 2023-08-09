import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { IPoint } from "../types/IPoint";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const pointAPI = createApi({
  reducerPath: 'pointAPI',
  baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
  tagTypes: ['Point'],
  endpoints: (build) => ({
    getPoints: build.query<IPoint[], any>({
      query: (authorizationHeaders) => ({
        url: `/points`,
        headers: authorizationHeaders
      }),
      providesTags: result => ['Point']
    }),
    createPoint: build.mutation<any, any>({
      query: (args) => ({
        url: `/points`,
        method: 'POST',
        body: args.body,
        headers: args.headers
      }),
      invalidatesTags: ['Point']
    }),
  })
});
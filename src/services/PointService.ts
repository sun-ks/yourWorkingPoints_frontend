import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { IPoint } from "../types/IPoint";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const pointAPI = createApi({
  reducerPath: 'pointAPI',
  baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
  tagTypes: ['Points', 'Point'],
  endpoints: (build) => ({
    getPoints: build.query<IPoint[], any>({
      query: (authorizationHeaders) => ({
        url: `/points`,
        headers: authorizationHeaders
      }),
      providesTags: result => ['Points']
    }),
    getPointByPointId: build.query<IPoint, any>({
      query: ({Authorization, point_id}) => ({
        url: `/points/point`,
        headers: {Authorization},
        params: {
          point_id
        }
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
      invalidatesTags: ['Points']
    }),
  })
});
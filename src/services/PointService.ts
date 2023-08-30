import {createApi} from "@reduxjs/toolkit/dist/query/react";
import { IPoint } from "../types/IPoint";
import baseQueryCheckAccessToken from './baseQueryCheckAccessToken';

export const pointAPI = createApi({
  reducerPath: 'pointAPI',
  baseQuery: baseQueryCheckAccessToken,
  tagTypes: ['Points'],
  endpoints: (build) => ({
    getPoints: build.query<IPoint[], any>({
      query: () => ({
        url: `/points`,
      }),
      providesTags: result => ['Points']
    }),
    getPointsWithHaveTickets: build.mutation<IPoint[], any>({
      query: () => ({
        url: `/points/pointsWithHaveTickets`,
      }),
      //providesTags: ['Points'],
    }),
    getPointByPointId: build.query<IPoint, any>({
      query: (point_id) => ({
        url: `/points/point`,
        params: {
          point_id
        }
      }),
      providesTags: result => ['Points']
    }),
    createPoint: build.mutation<any, any>({
      query: (args) => ({
        url: `/points`,
        method: 'POST',
        body: args.body
      }),
      invalidatesTags: ['Points']
    }),
    updatePoint: build.mutation<{point_id: string}, any>({
      query: (body) => ({
        url: `/points/point`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Points']
    }),
    deletePoint: build.mutation<{point_id: string}, any>({
      query: (point_id) => ({
        url: `/points/point`,
        method: 'DELETE',
        body: point_id
      }),
      invalidatesTags: ['Points']
    }),
  })
});
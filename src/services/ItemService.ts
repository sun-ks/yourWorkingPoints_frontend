import {createApi} from "@reduxjs/toolkit/dist/query/react";
import { IItem } from "../types/IItem";
import baseQueryCheckAccessToken from './baseQueryCheckAccessToken';

export const itemAPI = createApi({
  reducerPath: 'itemAPI',
  baseQuery: baseQueryCheckAccessToken,
  tagTypes: ['Item'],
  endpoints: (build) => ({
    getItems: build.query<IItem[], any>({
      query: ({Authorization, point_id}) => ({
        url: `/items`,
        params: {
          point_id
        }
      }),
      providesTags: result => ['Item']
    }),
  })
});
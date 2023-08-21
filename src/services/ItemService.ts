import {createApi} from "@reduxjs/toolkit/dist/query/react";
import { IItem } from "../types/IItem";
import baseQueryCheckAccessToken from './baseQueryCheckAccessToken';

export const itemAPI = createApi({
  reducerPath: 'itemAPI',
  baseQuery: baseQueryCheckAccessToken,
  tagTypes: ['Item'],
  endpoints: (build) => ({
    getItems: build.query<IItem[], any>({
      query: ({point_id}) => ({
        url: `/items`,
        params: {
          point_id
        }
      }),
      providesTags: result => ['Item']
    }),
    getItem: build.query<IItem, any>({
      query: (ticket_id) => ({
        url: `/items/item`,
        params: {
          ticket_id
        }
      }),
      providesTags: result => ['Item']
    }),
    createItem: build.mutation<IItem, any>({
      query: (body) => ({
        url: `/items`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Item']
    }),
    updateItem: build.mutation<IItem, any>({
      query: (body) => ({
        url: `/items`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['Item']
    })
  })
});

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { IItem } from "../types/IItem";


const baseUrl = process.env.REACT_APP_BASE_URL;

export const itemAPI = createApi({
  reducerPath: 'itemAPI',
  baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
  tagTypes: ['Item'],
  endpoints: (build) => ({
    getItems: build.query<IItem[], any>({
      query: ({Authorization, point_id}) => ({
        url: `/items`,
        headers: {Authorization},
        params: {
          point_id
        }
      }),
      providesTags: result => ['Item']
    }),
  })
});
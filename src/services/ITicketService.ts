import {createApi} from "@reduxjs/toolkit/dist/query/react";
import { IItem } from "../types/IItem";
import baseQueryCheckAccessToken from './baseQueryCheckAccessToken';

export const itemAPI = createApi({
  reducerPath: 'itemAPI',
  baseQuery: baseQueryCheckAccessToken,
  tagTypes: ['Item'],
  endpoints: (build) => ({
    getAllItemsTickets: build.query<IItem[], any>({
      query: () => ({
        url: `/items/allTickets`,
      }),
      providesTags: result => ['Item']
    }),
    getTicketsByPoint: build.query<IItem[], any>({
      query: ({point_id}) => ({
        url: `/items/allTicketsByPoint`,
        params: {
          point_id
        }
      }),
      providesTags: result => ['Item']
    }),
    getTicket: build.query<IItem, any>({
      query: (ticket_id) => ({
        url: `/items/ticketByTicketId`,
        params: {
          ticket_id
        }
      }),
      providesTags: result => ['Item']
    }),
    createTicket: build.mutation<IItem, any>({
      query: (body) => ({
        url: `/items/createTicket`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Item']
    }),
    updateTicket: build.mutation<IItem, any>({
      query: (body) => ({
        url: `/items/updateTicket`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['Item']
    })
  })
});
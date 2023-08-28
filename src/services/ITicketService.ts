import {createApi} from "@reduxjs/toolkit/dist/query/react";
import { IItem } from "../types/IItem";
import baseQueryCheckAccessToken from './baseQueryCheckAccessToken';

export const ticketAPI = createApi({
  reducerPath: 'ticketAPI',
  baseQuery: baseQueryCheckAccessToken,
  tagTypes: ['Iticket'],
  endpoints: (build) => ({
    getAllItemsTickets: build.query<IItem[], any>({
      query: () => ({
        url: `/tickets/allTickets`,
      }),
      providesTags: result => ['Iticket']
    }),
    getTicketsByPoint: build.query<IItem[], any>({
      query: ({point_id}) => ({
        url: `/tickets/allTicketsByPoint`,
        params: {
          point_id
        }
      }),
      providesTags: result => ['Iticket']
    }),
    getTicket: build.query<IItem, any>({
      query: (ticket_id) => ({
        url: `/tickets/ticketByTicketId`,
        params: {
          ticket_id
        }
      }),
      providesTags: result => ['Iticket']
    }),
    createTicket: build.mutation<IItem, any>({
      query: (body) => ({
        url: `/tickets/createTicket`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Iticket']
    }),
    updateTicket: build.mutation<IItem, any>({
      query: (body) => ({
        url: `/tickets/updateTicket`,
        method: 'PUT',
        body: body
      }),
      invalidatesTags: ['Iticket']
    })
  })
});
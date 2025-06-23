import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { IItem } from '../types/IItem';
import baseQueryCheckAccessToken from './baseQueryCheckAccessToken';

export const ticketAPI = createApi({
  reducerPath: 'ticketAPI',
  baseQuery: baseQueryCheckAccessToken,
  tagTypes: ['Ticket', 'Warehouse'],
  endpoints: (build) => ({
    getAllItemsTickets: build.query<IItem[], any>({
      query: () => ({
        url: `/tickets/allTickets`,
      }),
      providesTags: () => ['Ticket'],
    }),
    getTicketsByPoint: build.query<IItem[], any>({
      query: ({ point_id }) => ({
        url: `/tickets/allTicketsByPoint`,
        params: {
          point_id,
        },
      }),
      providesTags: () => ['Ticket'],
    }),
    getTicket: build.query<IItem, any>({
      query: (ticket_id) => ({
        url: `/tickets/ticketByTicketId`,
        params: {
          ticket_id,
        },
      }),
      providesTags: () => ['Ticket', 'Warehouse'],
    }),
    createTicket: build.mutation<IItem, any>({
      query: (body) => ({
        url: `/tickets/createTicket`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Ticket'],
    }),
    updateTicket: build.mutation<IItem, any>({
      query: (body) => ({
        url: `/tickets/updateTicket`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Ticket', 'Warehouse'],
    }),
    deleteTicket: build.mutation<any, any>({
      query: (id) => ({
        url: `/tickets/deleteTicket/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Ticket'],
    }),
  }),
});

import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { IApiResponse } from '../types/IApiResponse';
import { IWarehouseItem } from '../types/IWarehouse';
import baseQueryCheckAccessToken from './baseQueryCheckAccessToken';

type TWarehouseResponse = IApiResponse<IWarehouseItem>;

export const warehouseAPI = createApi({
  reducerPath: 'warehouse',
  baseQuery: baseQueryCheckAccessToken,
  tagTypes: ['Warehouse'],
  endpoints: (build) => ({
    createWarehouseItem: build.mutation<IWarehouseItem, IWarehouseItem>({
      query: (body) => ({
        url: `/warehouse`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Warehouse'],
    }),

    editWarehouseItem: build.mutation<any, IWarehouseItem>({
      query: (body) => ({
        url: `/warehouse`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Warehouse'],
    }),
    deleteWarehouseItem: build.mutation<string, { id: string }>({
      query: (body) => ({
        url: `/warehouse`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Warehouse'],
    }),
    getInventoryItemById: build.query<IWarehouseItem, string>({
      query: (warehouse_id) => ({
        url: `/warehouse/getInventoryItemById`,
        params: {
          warehouse_id,
        },
      }),
      providesTags: () => ['Warehouse'],
    }),
    getInventoryItemsByCompanyIdAndTicketId: build.query<
      TWarehouseResponse,
      string
    >({
      query: (ticket_id) => ({
        url: `/warehouse/getInventoryItemsByTicketId`,
        params: {
          ticket_id,
        },
      }),
      providesTags: () => ['Warehouse'],
    }),
    getWarehouseItemsByCompanyId: build.query<TWarehouseResponse, undefined>({
      query: () => ({
        url: `/warehouse`,
      }),
      providesTags: () => ['Warehouse'],
    }),
  }),
});

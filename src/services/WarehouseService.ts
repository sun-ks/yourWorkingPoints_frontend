import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { IWarehouseItem } from '../types/IWarehouse';
import baseQueryCheckAccessToken from './baseQueryCheckAccessToken';

interface IWarehouseItemRest<T = string> extends IWarehouseItem {
  id: T;
}

export const warehouseAPI = createApi({
  reducerPath: 'warehouse',
  baseQuery: baseQueryCheckAccessToken,
  tagTypes: ['Warehouse'],
  endpoints: (build) => ({
    createWarehouseItem: build.mutation<IWarehouseItemRest, IWarehouseItem>({
      query: (body) => ({
        url: `/warehouse`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Warehouse'],
    }),

    editWarehouseItem: build.mutation<any, IWarehouseItemRest>({
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
    getInventoryItemById: build.query<IWarehouseItemRest, string>({
      query: (warehouse_id) => ({
        url: `/warehouse/getInventoryItemById`,
        params: {
          warehouse_id,
        },
      }),
      providesTags: () => ['Warehouse'],
    }),

    getWarehouseItemsByCompanyId: build.query<IWarehouseItem, undefined>({
      query: () => ({
        url: `/warehouse`,
      }),
      providesTags: () => ['Warehouse'],
    }),
  }),
});

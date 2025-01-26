import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { IWarehouseItem } from '../types/IWarehouse';
import baseQueryCheckAccessToken from './baseQueryCheckAccessToken';

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
    getWarehouseItemsByCompanyId: build.query<IWarehouseItem, undefined>({
      query: () => ({
        url: `/warehouse`,
      }),
      providesTags: () => ['Warehouse'],
    }),
  }),
});

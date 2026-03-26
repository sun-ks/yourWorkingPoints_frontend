import { createApi } from '@reduxjs/toolkit/query/react';

import { IApiResponse } from '../types/IApiResponse';
import { IServiceItem } from '../types/IServiceItem';
import baseQueryCheckAccessToken from './baseQueryCheckAccessToken';

type TServiceResponse = IApiResponse<IServiceItem>;

export const serviceCatalogAPI = createApi({
  reducerPath: 'serviceCatalog',
  baseQuery: baseQueryCheckAccessToken,
  tagTypes: ['ServiceCatalog'],
  endpoints: (build) => ({
    getServiceItemsByCompanyId: build.query<TServiceResponse, undefined>({
      query: () => ({
        url: `/service-catalog`,
      }),
      providesTags: () => ['ServiceCatalog'],
    }),
    getServiceById: build.query<TServiceResponse, string>({
      query: (id) => ({
        url: `/service-catalog/${id}`,
      }),
      providesTags: () => ['ServiceCatalog'],
    }),
    createService: build.mutation<TServiceResponse, IServiceItem>({
      query: (body) => ({
        url: `/service-catalog`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ServiceCatalog'],
    }),
    updateService: build.mutation<TServiceResponse, IServiceItem>({
      query: (body) => ({
        url: `/service-catalog`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['ServiceCatalog'],
    }),
    deleteServiceById: build.mutation<TServiceResponse, string>({
      query: (id) => ({
        url: `/service-catalog/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ServiceCatalog'],
    }),
  }),
});

import { createApi } from '@reduxjs/toolkit/dist/query/react';

import baseQueryCheckAccessToken from './baseQueryCheckAccessToken';

export const clientAPI = createApi({
    reducerPath: 'clientAPI',
    baseQuery: baseQueryCheckAccessToken,
    tagTypes: ['Client', 'Clients'],
    endpoints: (build) => ({
        getClientByVlientId: build.query<any, any>({
            query: () => ({
                url: `/clients/clients`,
            }),
            providesTags: (result) => ['Client'],
        }),
        getClientsByCompanyId: build.query<any, any>({
            query: () => ({
                url: `/clients`,
            }),
            providesTags: (result) => ['Clients'],
        }),
        getClientByClientId: build.query<any, any>({
            query: (client_id) => ({
                url: `/clients/client`,
                params: { client_id },
            }),
            providesTags: (result) => ['Client'],
        }),
        createClient: build.mutation<any, any>({
            query: (args) => ({
                method: 'POST',
                url: `/clients/client`,
                body: args,
            }),
            invalidatesTags: ['Clients'],
        }),
        updateClient: build.mutation<any, any>({
            query: (args) => ({
                method: 'PUT',
                url: `/clients/client`,
                body: args,
            }),
            invalidatesTags: ['Clients'],
        }),
    }),
});

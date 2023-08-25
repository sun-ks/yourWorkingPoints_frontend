import {createApi} from "@reduxjs/toolkit/dist/query/react";
import baseQueryCheckAccessToken from './baseQueryCheckAccessToken';


export const tagTypes:string[] = ['Points', 'Point', 'Item'];

const emptyApi = createApi({
  reducerPath: 'pointAPI--',
  baseQuery: baseQueryCheckAccessToken,
  endpoints: () => ({})
})

export const apiWithCommonTags = emptyApi.enhanceEndpoints({addTagTypes: tagTypes})
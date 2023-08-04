import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { IUser } from "../types/IUser";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const userAPI = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
  tagTypes: ['User'],
  endpoints: (build) => ({
    login: build.mutation< any, {email: string; password: string}>({
      query: (body) => ({
        url: `/auth/login/`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['User']
    }),
  })
});
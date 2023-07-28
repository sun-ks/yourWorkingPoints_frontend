import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { IUser } from "../models/IUser";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const userAPI = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
  tagTypes: ['User'],
  endpoints: (build) => ({
    createPost: build.mutation<IUser,IUser>({
      query: (post) => ({
        url: `/auth/login`,
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['User']
    }),
  })
});
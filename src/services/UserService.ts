import {createApi} from "@reduxjs/toolkit/dist/query/react";
import { IUser } from "../types/IUser";
import baseQueryCheckAccessToken from './baseQueryCheckAccessToken';

export const userAPI = createApi({
  reducerPath: 'user',
  baseQuery: baseQueryCheckAccessToken,
  tagTypes: ['User', 'Users'],
  endpoints: (build) => ({
    getAllUsers: build.query<any, any>({
      query: () => ({
        url: `/users`,
      }),
      providesTags: result => ['Users']
    }),
    getUserById: build.query<any, any>({
      query: (userId) => ({
        url: `/users/user`,
        params: {
          userId
        }
      }),
      providesTags: result => ['User']
    }),
    login: build.mutation<IUser, {email: string; password: string}>({
      query: (body) => ({
        url: `/auth/login/`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['User']
    }),
    signUp: build.mutation<IUser, {email: string; password: string}>({
      query: (body) => ({
        url: `/users/signUp/`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['User']
    }),
    forgot: build.mutation<string, {email: string;}>({
      query: (body) => ({
        url: `/auth/resset_password`,
        method: 'POST',
        body: {email: body.email}
      }),
      invalidatesTags: ['User']
    }),
    newPassword: build.mutation<IUser, { password: string, token:string}>({
      query: (body) => ({
        url: `/auth/set_new_password`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['User']
    }),
    addWorker: build.mutation<IUser, { password: string, token:string}>({
      query: (body) => ({
        url: `/auth/addWorker`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['User', 'Users']
    }),
    inviteWorker: build.mutation<any, any>({
      query: (args) => ({
        method: 'POST',
        url: `/users/inviteWorker`,
        body: args
      }),
    }),
    updateWorker: build.mutation<any, any>({
      query: (args) => ({
        method: 'PUT',
        url: `/users/updateWorker`,
        body: args
      }),
      invalidatesTags: ['User','Users']
    }),
  })
});
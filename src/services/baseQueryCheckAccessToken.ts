import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'

const baseUrl = process.env.REACT_APP_BASE_URL;

const baseQueryWithAccessToken = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const user = (getState() as any);
    const accessToken = user.authReducer.user.tokens.accessToken

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
})

const baseQueryCheckAccessToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {

  const result = await baseQueryWithAccessToken(args, api, extraOptions);
  const redirectStatusCode = 403;

  if (result.error && result.error.status === redirectStatusCode) {
    window?.location.replace(`/auth/sign_in`);
  }
  return result
}

export default baseQueryCheckAccessToken;
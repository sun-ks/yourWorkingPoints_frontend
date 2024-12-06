import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import { authSlice } from '../store/reducers/AuthSlice';

const mutex = new Mutex();

const baseUrl = process.env.REACT_APP_API_URL;

function setBaseUrl() {
    console.log('baseUrl', baseUrl);
    return baseUrl;
}

const baseQueryWithAccessToken = fetchBaseQuery({
    baseUrl: setBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
        const user = getState() as any;

        const accessToken =
            user.authReducer.user && user.authReducer.user.accessToken;

        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }

        return headers;
    },
    credentials: 'include',
});

const baseQuery = baseQueryWithAccessToken;

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const { logOut, setCredentials } = authSlice.actions;
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // try to get a new token

        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult: any = await baseQuery(
                    '/auth/refresh_token',
                    api,
                    extraOptions,
                );

                if (refreshResult.data) {
                    api.dispatch(setCredentials(refreshResult.data));
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logOut());
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export default baseQueryWithReauth;

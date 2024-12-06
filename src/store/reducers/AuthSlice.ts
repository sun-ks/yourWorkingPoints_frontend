import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUser } from '../../types';

interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export default authSlice.reducer;

export const selectCurrentUser = (state: { authReducer: UserState }) =>
  state.authReducer.user;
export const isOwner = (state: { authReducer: UserState }) =>
  state.authReducer.user?.userInfo.role === 'owner';
export const selectAccessToken = (state: { authReducer: UserState }) =>
  state.authReducer.user?.accessToken;

//export const selectCurrentToken = (state: { auth: UserState }) => state.auth.token;

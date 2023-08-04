import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {IUser} from "../../types/IUser";


interface UserState {
  user: IUser | null;
  token: string | null
}

const initialState: UserState = {
  user: null, token: null 
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action:PayloadAction<{accessToken: string}>) => {
      console.log('action', action)
      const {  accessToken } = action.payload
     // state.user = user
      state.token = accessToken
    },
    logOut: (state, action) => {
      state.user = null
      state.token = null
    }
  },
})

export default authSlice.reducer

export const selectCurrentUser = (state: { auth: UserState }) => state.auth.user;
export const selectCurrentToken = (state: { auth: UserState }) => state.auth.token;
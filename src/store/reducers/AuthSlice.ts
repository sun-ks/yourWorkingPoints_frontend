import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {IUser} from "../../types";

interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action:PayloadAction<IUser>) => {

      state.user = action.payload
      console.log('action.payload', action.payload)
    },
    logOut: (state, action) => {
      state.user = null
    }
  },
})

export default authSlice.reducer

export const selectCurrentUser = (state: { auth: UserState }) => state.auth.user;
//export const selectCurrentToken = (state: { auth: UserState }) => state.auth.token;
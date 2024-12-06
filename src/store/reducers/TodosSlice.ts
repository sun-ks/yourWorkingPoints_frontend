import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ITodos } from '../../types/ITodos';
import { fetchUsers } from './ActionCreators';

//import {fetchUsers} from "./ActionCreators";

interface TodosState {
  todos: ITodos[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: TodosState = {
  todos: [],
  isLoading: false,
  error: '',
  count: 0,
};

export const todosSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    incriment(state, action: PayloadAction<number>) {
      state.count = ++action.payload;
    },
    dicriment(state, action: PayloadAction<number>) {
      state.count = action.payload - 1;
    },
    todoFetcing(state) {
      state.isLoading = true;
    },
    todoFetchSucsses(state, action: PayloadAction<ITodos[]>) {
      state.isLoading = false;
      state.todos = action.payload;
    },
    todoFetchErr(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<ITodos[]>) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
  },
});

export default todosSlice.reducer;

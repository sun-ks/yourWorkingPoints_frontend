import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ITodos } from '../../types/ITodos';
import { fetchUsers } from './ActionCreators';

interface TodosState {
  todos: ITodos[];
  isLoading: boolean;
  error: string | null;
  count: number;
}

const initialState: TodosState = {
  todos: [],
  isLoading: false,
  error: null,
  count: 0,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // якщо хочеш змінювати на +1/-1 без payload — зроби без PayloadAction<number>
    increment(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
    decrement(state, action: PayloadAction<number>) {
      state.count -= action.payload;
    },

    // якщо залишаєш ручні фетч-редʼюсери — ок, але зазвичай їх замінює asyncThunk
    todoFetching(state) {
      state.isLoading = true;
      state.error = null;
    },
    todoFetchSuccess(state, action: PayloadAction<ITodos[]>) {
      state.isLoading = false;
      state.todos = action.payload;
    },
    todoFetchErr(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<ITodos[]>) => {
          state.isLoading = false;
          state.todos = action.payload;
        },
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          'Unknown error';
      });
  },
});

export const {
  increment,
  decrement,
  todoFetching,
  todoFetchSuccess,
  todoFetchErr,
} = todosSlice.actions;

export default todosSlice.reducer;

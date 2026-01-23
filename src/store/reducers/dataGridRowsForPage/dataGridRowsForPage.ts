import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const dataGridRowsForPageSlice = createSlice({
  name: 'dataGridRowsForPage',
  initialState: { tickets: 50, users: 50, clients: 50, warehouses: 50 },
  reducers: {
    setdataGridRowsForPageTickets: (state, action: PayloadAction<number>) => {
      return { ...state, tickets: action.payload };
    },
    setdataGridRowsForPageUsers: (state, action: PayloadAction<number>) => {
      return { ...state, users: action.payload };
    },
    setdataGridRowsForPageClients: (state, action: PayloadAction<number>) => {
      return { ...state, clients: action.payload };
    },
    setdataGridRowsForPageWarehouses: (
      state,
      action: PayloadAction<number>,
    ) => {
      return { ...state, warehouses: action.payload };
    },
  },
});

export default dataGridRowsForPageSlice.reducer;

export const selectDataGridRowsForPageTickets = (state: {
  dataGridRowsForPageReducer: { tickets: number };
}) => state.dataGridRowsForPageReducer.tickets;

export const selectDataGridRowsForPageUsers = (state: {
  dataGridRowsForPageReducer: { users: number };
}) => state.dataGridRowsForPageReducer.users;

export const selectDataGridRowsForPageClients = (state: {
  dataGridRowsForPageReducer: { clients: number };
}) => state.dataGridRowsForPageReducer.clients;

export const selectDataGridRowsForPageWarehouses = (state: {
  dataGridRowsForPageReducer: { warehouses: number };
}) => state.dataGridRowsForPageReducer.warehouses;

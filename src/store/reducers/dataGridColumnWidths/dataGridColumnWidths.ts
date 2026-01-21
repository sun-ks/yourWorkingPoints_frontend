import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const dataGridColumnWidthsSlice = createSlice({
  name: 'dataGridColumnWidths',
  initialState: {},
  reducers: {
    setdataGridColumnWidthsTickets: (
      state,
      action: PayloadAction<{ [key: string]: number }>,
    ) => {
      return { ...state, tickets: action.payload };
    },
    setdataGridColumnWidthsClients: (
      state,
      action: PayloadAction<{ [key: string]: number }>,
    ) => {
      return { ...state, clients: action.payload };
    },
    setdataGridColumnWidthsUsers: (
      state,
      action: PayloadAction<{ [key: string]: number }>,
    ) => {
      return { ...state, users: action.payload };
    },
    setdataGridColumnWidthsWarehouses: (
      state,
      action: PayloadAction<{ [key: string]: number }>,
    ) => {
      return { ...state, warehouses: action.payload };
    },
  },
});

export default dataGridColumnWidthsSlice.reducer;

export const selectDataGridColumnWidthsTickets = (state: {
  dataGridColumnWidthsReducer: { tickets: { [key: string]: number } };
}) => state.dataGridColumnWidthsReducer.tickets;

export const selectDataGridColumnWidthsClients = (state: {
  dataGridColumnWidthsReducer: { clients: { [key: string]: number } };
}) => state.dataGridColumnWidthsReducer.clients;

export const selectDataGridColumnWidthsUsers = (state: {
  dataGridColumnWidthsReducer: { users: { [key: string]: number } };
}) => state.dataGridColumnWidthsReducer.users;

export const selectDataGridColumnWidthsWarehouses = (state: {
  dataGridColumnWidthsReducer: { warehouses: { [key: string]: number } };
}) => state.dataGridColumnWidthsReducer.warehouses;

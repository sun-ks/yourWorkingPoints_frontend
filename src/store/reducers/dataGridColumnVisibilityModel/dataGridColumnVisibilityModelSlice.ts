import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const dataGridColumnVisibilityModelSlice = createSlice({
  name: 'dataGridColumnVisibilityModel',
  initialState: {},
  reducers: {
    setColumnsVisibilityModelTickets: (
      state,
      action: PayloadAction<{ [key: string]: boolean }>,
    ) => {
      return { ...state, tickets: action.payload };
    },
    setColumnsVisibilityModelClients: (
      state,
      action: PayloadAction<{ [key: string]: boolean }>,
    ) => {
      return { ...state, clients: action.payload };
    },
    setColumnsVisibilityModelUsers: (
      state,
      action: PayloadAction<{ [key: string]: boolean }>,
    ) => {
      return { ...state, users: action.payload };
    },
    setColumnsVisibilityModelWarehouse: (
      state,
      action: PayloadAction<{ [key: string]: boolean }>,
    ) => {
      return { ...state, warehouse: action.payload };
    },
  },
});

export default dataGridColumnVisibilityModelSlice.reducer;

export const selectDataGridColumnVisibilityModeTickets = (state: {
  dataGridColumnVisibilityModelReducer: { tickets: { [key: string]: boolean } };
}) => state.dataGridColumnVisibilityModelReducer.tickets;

export const selectDataGridColumnVisibilityModeClients = (state: {
  dataGridColumnVisibilityModelReducer: { clients: { [key: string]: boolean } };
}) => state.dataGridColumnVisibilityModelReducer.clients;

export const selectDataGridColumnVisibilityModeUsers = (state: {
  dataGridColumnVisibilityModelReducer: { users: { [key: string]: boolean } };
}) => state.dataGridColumnVisibilityModelReducer.users;

export const selectDataGridColumnVisibilityModeWarehouse = (state: {
  dataGridColumnVisibilityModelReducer: {
    warehouse: { [key: string]: boolean };
  };
}) => state.dataGridColumnVisibilityModelReducer.warehouse;

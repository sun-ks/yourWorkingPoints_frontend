import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  ticketsDataGridColumnsOrder: [
    'created',
    'status',
    'priority',
    'assigned_at',
    'device_sn',
    'name',
    'client_phone',
    'client_first_name',
    'paid',
  ],
  warehouseDataGridColumnsOrder: [
    'created',
    'received_date',
    'point_id',
    'category_id',
    'supplier_id',
    'warranty',
    'name',
    'quantity',
  ],
  clientsDataGridColumnsOrder: ['created', 'phone', 'name', 'email'],
  usersDataGridColumnsOrder: [
    'created',
    'is_active',
    'role',
    'name',
    'phone',
    'email',
  ],
};

export const dataGridOrderSlice = createSlice({
  name: 'ticketsDataGridOrder',
  initialState: initialState,
  reducers: {
    setColumnsOrderTickets: (state, action: PayloadAction<string[]>) => {
      state.ticketsDataGridColumnsOrder = action.payload;
    },
    setColumnsOrderWarehouse: (state, action: PayloadAction<string[]>) => {
      state.warehouseDataGridColumnsOrder = action.payload;
    },
    setColumnsOrderClients: (state, action: PayloadAction<string[]>) => {
      state.clientsDataGridColumnsOrder = action.payload;
    },
    setColumnsOrderUsers: (state, action: PayloadAction<string[]>) => {
      state.usersDataGridColumnsOrder = action.payload;
    },
  },
});

export default dataGridOrderSlice.reducer;

export const selectTicketsDataGridColumnsOrder = (state: {
  dataGridOrderReducer: { ticketsDataGridColumnsOrder: string[] };
}) => state.dataGridOrderReducer.ticketsDataGridColumnsOrder;

export const selectWarehouseDataGridColumnsOrder = (state: {
  dataGridOrderReducer: { warehouseDataGridColumnsOrder: string[] };
}) => state.dataGridOrderReducer.warehouseDataGridColumnsOrder;

export const selectClientDataGridColumnsOrder = (state: {
  dataGridOrderReducer: { clientsDataGridColumnsOrder: string[] };
}) => state.dataGridOrderReducer.clientsDataGridColumnsOrder;

export const selectUsersDataGridColumnsOrder = (state: {
  dataGridOrderReducer: { usersDataGridColumnsOrder: string[] };
}) => state.dataGridOrderReducer.usersDataGridColumnsOrder;

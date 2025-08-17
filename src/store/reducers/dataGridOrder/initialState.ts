export const initialDataGridOrderState = {
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

export type DataGridOrderState = typeof initialDataGridOrderState;

import { TFunction } from 'i18next';

import { GridColDef } from '@mui/x-data-grid';

function getPrintStatus(status: string, t: TFunction): string {
  if (status === 'in progress') status = 'in_progress';
  else if (status === 'ask client') status = 'ask_client';
  return t(`statuses.${status}`);
}

export const getTicketColumns = (t: TFunction): Record<string, GridColDef> => ({
  created: {
    field: 'created',
    headerName: t('ticketsColumns.created'),
    width: 150,
    valueGetter: (_v, row) => new Date(row.created).toLocaleDateString(),
  },
  status: {
    field: 'status',
    headerName: t('ticketsColumns.status'),
    width: 150,
    renderCell: (params) => (
      <div data-grid-status={params.row.status}>
        {getPrintStatus(params.row.status, t)}
      </div>
    ),
  },
  priority: {
    field: 'priority',
    headerName: t('ticketsColumns.priority'),
    width: 150,
    valueGetter: (_v, row) => t(`priorities.${row.priority}`),
    renderCell: (params) => {
      const value = t(`priorities.${params.row.priority}`);
      return <div data-grid-priority={`${params.row.priority}`}>{value}</div>;
    },
  },
  assigned_at: {
    field: 'assigned_at',
    width: 150,
    headerName: t('ticketsColumns.assigned_at'),
    valueGetter: (_v, row) => row.user_name || row.user_email || 'None',
  },
  device_sn: {
    field: 'device_sn',
    headerName: t('ticketsColumns.device_sn'),
    width: 170,
  },
  name: {
    field: 'name',
    headerName: t('ticketsColumns.name'),
    width: 150,
  },
  client_phone: {
    field: 'client_phone',
    headerName: t('ticketsColumns.client_phone'),
    width: 150,
  },
  client_first_name: {
    field: 'client_first_name',
    headerName: t('ticketsColumns.client'),
    width: 100,
    valueGetter: (_v, row) => row.client_name || '',
  },
  paid: {
    field: 'paid',
    headerName: t('ticketsColumns.paid'),
    width: 100,
    type: 'number',
    valueGetter: (_v, row) =>
      parseInt(row.paid) + parseInt(row.last_part_payment),
  },
});

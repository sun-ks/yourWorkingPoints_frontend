import {GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import i18n from '../i18n'

export const columns: GridColDef[] = [
  {
    field: 'created',
    headerName: i18n.t('ticketsColumns.created'),
    width: 150,
    editable: true,
    valueGetter: (params: GridValueGetterParams) =>
      `${ new Date(params.row.created).toLocaleDateString()}`,
  },
  {
    field: 'status',
    headerName:i18n.t('ticketsColumns.status'),
    width: 150,
    editable: true,
  },
  {
    field: 'priority',
    headerName: i18n.t('ticketsColumns.priority'),
    width: 150,
    editable: true,
  },
  {
    field: 'device_sn',
    headerName:i18n.t('ticketsColumns.device_sn'),
    width: 170,
    editable: true,
  },
  {
    field: 'name',
    headerName:i18n.t('ticketsColumns.name'),
    width: 150,
    editable: true,
  },
  {
    field: 'client_phone',
    headerName:i18n.t('ticketsColumns.client_phone'),
    width: 150,
    editable: true,
  },
  {
    field: 'client_first_name',
    headerName:i18n.t('ticketsColumns.client'),
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.client_first_name || ''} ${params.row.client_lasrt_name || ''}`,
  },
  {
    field: 'parseInt(',
    headerName:i18n.t('ticketsColumns.paid'),
    type: 'number',
    width: 100,
    editable: true,
    valueGetter: (params: GridValueGetterParams) =>
    parseInt(params.row.paid) + parseInt(params.row.last_part_payment)
  },
];


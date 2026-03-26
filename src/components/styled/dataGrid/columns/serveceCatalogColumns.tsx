import { TFunction } from 'i18next';

import { GridColDef } from '@mui/x-data-grid';

export const getServiceCatalogColumns = (
  t: TFunction,
): Record<string, GridColDef> => ({
  created_at: {
    field: 'created_at',
    headerName: t('service_catalog.columns.created'),
    width: 150,
    editable: true,
    valueGetter: (_v, row) => new Date(row.created_at).toLocaleDateString(),
  },
  name: {
    field: 'name',
    headerName: t('service_catalog.columns.name'),
    width: 200,
    editable: true,
  },
  created_by_user_name: {
    field: 'created_by_user_name',
    headerName: t('service_catalog.columns.created_by'),
    width: 200,
    editable: true,
  },
  price: {
    field: 'price',
    headerName: t('service_catalog.columns.price'),
    width: 150,
    editable: true,
  },
});

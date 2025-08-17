import { TFunction } from 'i18next';

import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

type Point = {
  point_id: string;
  name: string;
};

export const getWarehouseColumns = (
  t: TFunction,
  points: Point[] | undefined,
): Record<string, GridColDef> => ({
  created: {
    field: 'created',
    headerName: t('warehouseColumns.created'),
    width: 150,
    editable: true,
    valueGetter: (params: GridValueGetterParams) =>
      new Date(params.row.created).toLocaleDateString(),
  },
  received_date: {
    field: 'received_date',
    headerName: t('warehouseColumns.recived_date'),
    width: 150,
    editable: true,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.received_date
        ? new Date(params.row.received_date).toLocaleDateString()
        : 'null',
  },
  point_id: {
    field: 'point_id',
    headerName: t('warehouseColumns.point'),
    width: 150,
    editable: true,
    valueGetter: (params: GridValueGetterParams) => {
      if (!points) return 'no points';
      const point = points.find((p) => p.point_id === params.row.point_id);
      return point?.name || 'no points';
    },
  },
  category_id: {
    field: 'category_id',
    headerName: t('warehouseColumns.category'),
    width: 150,
    editable: true,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.category_id ?? '/',
  },
  supplier_id: {
    field: 'supplier_id',
    headerName: t('warehouseColumns.supplier'),
    width: 150,
    editable: true,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.supplier_id ?? '/',
  },
  warranty: {
    field: 'warranty',
    headerName: t('warehouseColumns.warranty'),
    width: 150,
    editable: true,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.warranty ?? 'null',
  },
  name: {
    field: 'name',
    headerName: t('warehouseColumns.name'),
    width: 150,
    editable: true,
  },
  quantity: {
    field: 'quantity',
    headerName: t('warehouseColumns.quantity'),
    width: 200,
    editable: true,
  },
});

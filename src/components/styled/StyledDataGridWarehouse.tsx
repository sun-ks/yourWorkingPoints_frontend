import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { FC } from 'react';

import { Box, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid';

const StyledDataGridWarehouse: FC<any> = ({
  warehouse,
  points,
  error,
  isLoading,
}) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const columns: GridColDef[] = [
    {
      field: 'created',
      headerName: t('warehouseColumns.created'),
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        `${new Date(params.row.created).toLocaleDateString()}`,
    },
    {
      field: 'received_date',
      headerName: t('warehouseColumns.recived_date'),
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.received_date
          ? `${new Date(params.row.received_date).toLocaleDateString()}`
          : 'null',
    },
    {
      field: 'point_id',
      headerName: t('warehouseColumns.point'),
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) => {
        if (!points) {
          return 'no points';
        }
        const p = points.filter(
          (point: { point_id: string }) =>
            point.point_id === params.row.point_id,
        );

        if (p.length === 0) {
          return 'no points';
        }

        return p[0].name;
      },
    },
    {
      field: 'category_id',
      headerName: t('warehouseColumns.category'),
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.category_id === null ? '/' : params.row.category_id,
    },
    {
      field: 'supplier_id',
      headerName: t('warehouseColumns.supplier'),
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.supplier_id === null ? '/' : params.row.supplier_id,
    },
    {
      field: 'warranty',
      headerName: t('warehouseColumns.warranty'),
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.warranty ? params.row.warranty : 'null',
    },
    {
      field: 'name',
      headerName: t('warehouseColumns.name'),
      width: 150,
      editable: true,
    },
    {
      field: 'quantity',
      headerName: t('warehouseColumns.quantity'),
      width: 200,
      editable: true,
    },
  ];

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const id = params.row.id;
    navigate(`/inventoryItem/${id}`);
  };

  return (
    <>
      {error && (
        <Box sx={{ marginBottom: 3 }}>
          <Typography color="error">Data load Error</Typography>
        </Box>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : warehouse.data && warehouse.data.length > 0 ? (
        <>
          <Box
            sx={{
              width: '100%',
              overflow: 'auto',
            }}
          >
            <DataGrid
              scrollbarSize={53}
              rows={warehouse.data || []}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[50]}
              //checkboxSelection
              disableRowSelectionOnClick
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              onRowClick={handleRowClick}
            />
          </Box>
        </>
      ) : (
        'List is empty'
      )}
    </>
  );
};

export default StyledDataGridWarehouse;

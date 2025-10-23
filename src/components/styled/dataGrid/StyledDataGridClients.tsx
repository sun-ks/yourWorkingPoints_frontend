import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FC, useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import {
  GridColDef,
  GridEventListener,
  GridValueGetter,
} from '@mui/x-data-grid';

import { DataGridWithDraggableColumns } from '../../../hoc/dataGridWithDraggableColumns';
import { dataGridOrderSlice } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';
import { selectClientDataGridColumnsOrder } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';
import { CustomToolbar } from '../CustomToolbar';

const StyledDataGridClients: FC<any> = ({ clients, error, isLoading }) => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setColumnsOrderClients } = dataGridOrderSlice.actions;
  const columnOrderDefs = useSelector(selectClientDataGridColumnsOrder);
  const [columnOrder, setColumnOrder] = useState(columnOrderDefs);
  useEffect(() => {
    dispatch(setColumnsOrderClients(columnOrder));
  }, [columnOrder]);
  const columnDefs: Record<string, GridColDef> = {
    created: {
      field: 'created',
      headerName: t('usersColumns.created'),
      width: 150,
      editable: true,
      valueGetter: (_v, row) => `${new Date(row.created).toLocaleDateString()}`,
    },
    phone: {
      field: 'phone',
      headerName: t('usersColumns.status'),
      width: 150,
      editable: true,
    },
    name: {
      field: 'name',
      headerName: t('usersColumns.name'),
      width: 200,
      editable: true,
    },
    email: {
      field: 'email',
      headerName: t('usersColumns.email'),
      width: 200,
      editable: true,
    },
  };

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const client_id = params.row.client_id;
    navigate(`/clients/${client_id}`);
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
      ) : clients && clients.length > 0 ? (
        <>
          <Box
            sx={{
              width: '100%',
              overflow: 'auto',
            }}
          >
            <DataGridWithDraggableColumns
              scrollbarSize={53}
              rows={clients || []}
              getRowId={(row) => row.client_id}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              //pageSizeOptions={[50]}
              disableRowSelectionOnClick
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              onRowClick={handleRowClick}
              columnOrder={columnOrder}
              setColumnOrder={setColumnOrder}
              slots={{ toolbar: CustomToolbar }}
              columnDefs={columnDefs}
            />
          </Box>
        </>
      ) : (
        'Clients List is empty'
      )}
    </>
  );
};

export default StyledDataGridClients;

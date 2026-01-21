import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FC, useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { GridColDef, GridEventListener } from '@mui/x-data-grid';

import { DataGridWithDraggableColumns } from '../../../hoc/dataGridWithDraggableColumns';
import { dataGridColumnVisibilityModelSlice } from '../../../store/reducers/dataGridColumnVisibilityModel/dataGridColumnVisibilityModelSlice';
import { selectDataGridColumnVisibilityModeClients } from '../../../store/reducers/dataGridColumnVisibilityModel/dataGridColumnVisibilityModelSlice';
import { dataGridColumnWidthsSlice } from '../../../store/reducers/dataGridColumnWidths/dataGridColumnWidths';
import { selectDataGridColumnWidthsClients } from '../../../store/reducers/dataGridColumnWidths/dataGridColumnWidths';
import { dataGridOrderSlice } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';
import { selectClientDataGridColumnsOrder } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';

const StyledDataGridClients: FC<any> = ({ clients, error, isLoading }) => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setColumnsOrderClients } = dataGridOrderSlice.actions;
  const columnOrderDefs = useSelector(selectClientDataGridColumnsOrder);
  const columnVisibilityModelDefs = useSelector(
    selectDataGridColumnVisibilityModeClients,
  );
  const columnWidthsDefs = useSelector(selectDataGridColumnWidthsClients);

  const { setColumnsVisibilityModelClients } =
    dataGridColumnVisibilityModelSlice.actions;

  const { setdataGridColumnWidthsClients } = dataGridColumnWidthsSlice.actions;

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<{
    [key: string]: boolean;
  }>(columnVisibilityModelDefs);

  const [columnOrder, setColumnOrder] = useState(columnOrderDefs);

  const [columnWidths, setColumnWidths] =
    useState<Record<string, number>>(columnWidthsDefs);

  useEffect(() => {
    dispatch(setColumnsOrderClients(columnOrder));
  }, [columnOrder]);

  useEffect(() => {
    dispatch(setColumnsVisibilityModelClients(columnVisibilityModel));
  }, [columnVisibilityModel]);

  useEffect(() => {
    dispatch(setdataGridColumnWidthsClients(columnWidths));
  }, [columnWidths]);

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
              onRowClick={handleRowClick}
              columnOrder={columnOrder}
              setColumnOrder={setColumnOrder}
              showToolbar={true}
              columnDefs={columnDefs}
              columnVisibilityModel={columnVisibilityModel}
              setColumnVisibilityModel={setColumnVisibilityModel}
              columnWidths={columnWidths}
              setColumnWidths={setColumnWidths}
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

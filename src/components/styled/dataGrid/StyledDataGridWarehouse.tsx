import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { GridEventListener, GridToolbar } from '@mui/x-data-grid';

import { DataGridWithDraggableColumns } from '../../../hoc/dataGridWithDraggableColumns';
import { dataGridOrderSlice } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';
import { selectWarehouseDataGridColumnsOrder } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';
import { getWarehouseColumns } from './columns/warehouseColumns';

const StyledDataGridWarehouse: FC<any> = ({
  warehouse,
  points,
  error,
  isLoading,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const columnOrderDefs = useSelector(selectWarehouseDataGridColumnsOrder);
  const [columnOrder, setColumnOrder] = useState(columnOrderDefs);
  const { setColumnsOrderWarehouse } = dataGridOrderSlice.actions;
  useEffect(() => {
    dispatch(setColumnsOrderWarehouse(columnOrder));
  }, [columnOrder]);

  const columnDefs = getWarehouseColumns(t, points);

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
            <DataGridWithDraggableColumns
              columnDefs={columnDefs}
              scrollbarSize={53}
              rows={warehouse.data || []}
              getRowId={(row) => row.id}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[50]}
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
              columnOrder={columnOrder}
              setColumnOrder={setColumnOrder}
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

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { GridEventListener } from '@mui/x-data-grid';

import { DataGridWithDraggableColumns } from '../../../hoc/dataGridWithDraggableColumns';
import { selectDataGridColumnVisibilityModeWarehouse } from '../../../store/reducers/dataGridColumnVisibilityModel/dataGridColumnVisibilityModelSlice';
import { dataGridColumnVisibilityModelSlice } from '../../../store/reducers/dataGridColumnVisibilityModel/dataGridColumnVisibilityModelSlice';
import { selectDataGridColumnWidthsWarehouses } from '../../../store/reducers/dataGridColumnWidths/dataGridColumnWidths';
import { dataGridColumnWidthsSlice } from '../../../store/reducers/dataGridColumnWidths/dataGridColumnWidths';
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
  const columnWidthsDefs = useSelector(selectDataGridColumnWidthsWarehouses);
  const [columnOrder, setColumnOrder] = useState(columnOrderDefs);
  const { setColumnsOrderWarehouse } = dataGridOrderSlice.actions;
  const columnVisibilityModelDefs = useSelector(
    selectDataGridColumnVisibilityModeWarehouse,
  );
  const { setColumnsVisibilityModelWarehouse } =
    dataGridColumnVisibilityModelSlice.actions;

  const { setdataGridColumnWidthsWarehouses } =
    dataGridColumnWidthsSlice.actions;

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<{
    [key: string]: boolean;
  }>(columnVisibilityModelDefs);

  const [columnWidths, setColumnWidths] =
    useState<Record<string, number>>(columnWidthsDefs);

  useEffect(() => {
    dispatch(setColumnsOrderWarehouse(columnOrder));
  }, [columnOrder]);

  useEffect(() => {
    dispatch(setColumnsVisibilityModelWarehouse(columnVisibilityModel));
  }, [columnVisibilityModel]);

  useEffect(() => {
    dispatch(setdataGridColumnWidthsWarehouses(columnWidths));
  }, [columnWidths]);

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
              showToolbar={true}
              onRowClick={handleRowClick}
              columnOrder={columnOrder}
              setColumnOrder={setColumnOrder}
              columnVisibilityModel={columnVisibilityModel}
              setColumnVisibilityModel={setColumnVisibilityModel}
              columnWidths={columnWidths}
              setColumnWidths={setColumnWidths}
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

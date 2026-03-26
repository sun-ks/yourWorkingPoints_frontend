import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { GridEventListener } from '@mui/x-data-grid';

import { DataGridWithDraggableColumns } from '../../../hoc/dataGridWithDraggableColumns';
import { selectDataGridColumnVisibilityModeServiceCatalog } from '../../../store/reducers/dataGridColumnVisibilityModel/dataGridColumnVisibilityModelSlice';
import { dataGridColumnVisibilityModelSlice } from '../../../store/reducers/dataGridColumnVisibilityModel/dataGridColumnVisibilityModelSlice';
import { selectDataGridColumnWidthsServiceCatalog } from '../../../store/reducers/dataGridColumnWidths/dataGridColumnWidths';
import { dataGridColumnWidthsSlice } from '../../../store/reducers/dataGridColumnWidths/dataGridColumnWidths';
import { dataGridOrderSlice } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';
import { selectServiceCatalogDataGridColumnsOrder } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';
import { selectDataGridRowsForPageServiceCatalog } from '../../../store/reducers/dataGridRowsForPage/dataGridRowsForPage';
import { dataGridRowsForPageSlice } from '../../../store/reducers/dataGridRowsForPage/dataGridRowsForPage';
import { getServiceCatalogColumns } from './columns/serveceCatalogColumns';

const StyledDataGridServiceCatalog: FC<any> = ({ data, error, isLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const columnOrderDefs = useSelector(selectServiceCatalogDataGridColumnsOrder);
  const columnWidthsDefs = useSelector(
    selectDataGridColumnWidthsServiceCatalog,
  );
  const rowsForPageDef = useSelector(selectDataGridRowsForPageServiceCatalog);
  const [columnOrder, setColumnOrder] = useState(columnOrderDefs);

  const { setColumnsOrderServiceCatalog } = dataGridOrderSlice.actions;
  const columnVisibilityModelDefs = useSelector(
    selectDataGridColumnVisibilityModeServiceCatalog,
  );
  const { setColumnsVisibilityModelServiceCatalog } =
    dataGridColumnVisibilityModelSlice.actions;

  const { setdataGridRowsForPageServiceCatalog } =
    dataGridRowsForPageSlice.actions;

  const { setdataGridColumnWidthsServiceCatalog } =
    dataGridColumnWidthsSlice.actions;

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<{
    [key: string]: boolean;
  }>(columnVisibilityModelDefs);

  const [columnWidths, setColumnWidths] =
    useState<Record<string, number>>(columnWidthsDefs);

  const [rowsForPage, setRowsForPage] = useState<number>(rowsForPageDef);

  useEffect(() => {
    dispatch(setColumnsOrderServiceCatalog(columnOrder));
  }, [columnOrder]);

  useEffect(() => {
    dispatch(setColumnsVisibilityModelServiceCatalog(columnVisibilityModel));
  }, [columnVisibilityModel]);

  useEffect(() => {
    dispatch(setdataGridColumnWidthsServiceCatalog(columnWidths));
  }, [columnWidths]);

  useEffect(() => {
    dispatch(setdataGridRowsForPageServiceCatalog(rowsForPage));
  }, [rowsForPage]);

  const columnDefs = getServiceCatalogColumns(t);

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const id = params.row.id;
    navigate(`/edit-service/${id}`);
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
      ) : data.data && data.data.length > 0 ? (
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
              rows={data.data || []}
              getRowId={(row) => row.created_at}
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
              setRowsForPage={setRowsForPage}
              rowsForPage={rowsForPage}
            />
          </Box>
        </>
      ) : (
        'List is empty'
      )}
    </>
  );
};

export default StyledDataGridServiceCatalog;

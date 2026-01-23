import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FC, useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { GridColDef, GridEventListener } from '@mui/x-data-grid';

import { DataGridWithDraggableColumns } from '../../../hoc/dataGridWithDraggableColumns';
import { dataGridColumnVisibilityModelSlice } from '../../../store/reducers/dataGridColumnVisibilityModel/dataGridColumnVisibilityModelSlice';
import { selectDataGridColumnVisibilityModeUsers } from '../../../store/reducers/dataGridColumnVisibilityModel/dataGridColumnVisibilityModelSlice';
import { dataGridColumnWidthsSlice } from '../../../store/reducers/dataGridColumnWidths/dataGridColumnWidths';
import { selectDataGridColumnWidthsUsers } from '../../../store/reducers/dataGridColumnWidths/dataGridColumnWidths';
import { dataGridOrderSlice } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';
import { selectUsersDataGridColumnsOrder } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';
import { dataGridRowsForPageSlice } from '../../../store/reducers/dataGridRowsForPage/dataGridRowsForPage';
import { selectDataGridRowsForPageUsers } from '../../../store/reducers/dataGridRowsForPage/dataGridRowsForPage';

const StyledDataGridUsers: FC<any> = ({ users, error, isLoading, type }) => {
  const navigate = useNavigate();
  const { setColumnsOrderUsers } = dataGridOrderSlice.actions;
  const { setdataGridRowsForPageUsers } = dataGridRowsForPageSlice.actions;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setColumnsVisibilityModelUsers } =
    dataGridColumnVisibilityModelSlice.actions;

  const { setdataGridColumnWidthsClients } = dataGridColumnWidthsSlice.actions;

  const columnVisibilityModelDefs = useSelector(
    selectDataGridColumnVisibilityModeUsers,
  );

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<{
    [key: string]: boolean;
  }>(columnVisibilityModelDefs);

  const columnDefs: Record<string, GridColDef> = {
    created: {
      field: 'created',
      headerName: t('usersColumns.created'),
      width: 150,
      editable: true,
      valueGetter: (_v, row) => `${new Date(row.created).toLocaleDateString()}`,
    },
    is_active: {
      field: 'is_active',
      headerName: t('usersColumns.status'),
      width: 150,
      editable: true,
      valueGetter: (_v, row) => t(`usersColumns.is_active_${row.is_active}`),
    },
    role: {
      field: 'role',
      headerName: t('usersColumns.role'),
      width: 150,
      editable: true,
    },
    name: {
      field: 'name',
      headerName: t('usersColumns.name'),
      width: 200,
      editable: true,
    },
    phone: {
      field: 'phone',
      headerName: t('usersColumns.phone'),
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
  const columnWidthsDefs = useSelector(selectDataGridColumnWidthsUsers);
  const columnOrderDefs = useSelector(selectUsersDataGridColumnsOrder);
  const rowsForPageDef = useSelector(selectDataGridRowsForPageUsers);

  const [columnOrder, setColumnOrder] = useState(columnOrderDefs);
  const [columnWidths, setColumnWidths] =
    useState<Record<string, number>>(columnWidthsDefs);

  const [rowsForPage, setRowsForPage] = useState<number>(rowsForPageDef);

  useEffect(() => {
    dispatch(setColumnsOrderUsers(columnOrder));
  }, [columnOrder]);

  useEffect(() => {
    dispatch(setColumnsVisibilityModelUsers(columnVisibilityModel));
  }, [columnVisibilityModel]);

  useEffect(() => {
    dispatch(setdataGridColumnWidthsClients(columnWidths));
  }, [columnWidths]);

  useEffect(() => {
    dispatch(setdataGridRowsForPageUsers(rowsForPage));
  }, [rowsForPage]);

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const user_id = params.row.user_id;
    navigate(`/${type}/${user_id}`);
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
      ) : users && users.length > 0 ? (
        <>
          <Box
            sx={{
              width: '100%',
              overflow: 'auto',
            }}
          >
            <DataGridWithDraggableColumns
              scrollbarSize={53}
              rows={users || []}
              getRowId={(row) => row.user_id}
              onRowClick={handleRowClick}
              columnDefs={columnDefs}
              columnOrder={columnOrder}
              setColumnOrder={setColumnOrder}
              showToolbar={true}
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
        'Workers List is empty'
      )}
    </>
  );
};

export default StyledDataGridUsers;

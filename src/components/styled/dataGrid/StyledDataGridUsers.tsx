import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FC, useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridValueGetter,
} from '@mui/x-data-grid';

import { DataGridWithDraggableColumns } from '../../../hoc/dataGridWithDraggableColumns';
import { dataGridOrderSlice } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';
import { selectUsersDataGridColumnsOrder } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';
import { CustomToolbar } from '../CustomToolbar';

const StyledHeaderAskClient = styled('span')(({ theme }) => ({
  color: theme.palette.error.light,
  textAlign: 'left',
  display: 'block',
  fontSize: 14,
  marginBottom: 8,
}));

const StyledDataGridUsers: FC<any> = ({ users, error, isLoading, type }) => {
  const navigate = useNavigate();
  const { setColumnsOrderUsers } = dataGridOrderSlice.actions;
  const { t } = useTranslation();
  const dispatch = useDispatch();
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

  const columnOrderDefs = useSelector(selectUsersDataGridColumnsOrder);
  const [columnOrder, setColumnOrder] = useState(columnOrderDefs);
  useEffect(() => {
    dispatch(setColumnsOrderUsers(columnOrder));
  }, [columnOrder]);
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
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              //pageSizeOptions={[50]}
              //checkboxSelection
              disableRowSelectionOnClick
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              slots={{ toolbar: CustomToolbar }}
              onRowClick={handleRowClick}
              columnDefs={columnDefs}
              columnOrder={columnOrder}
              setColumnOrder={setColumnOrder}
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

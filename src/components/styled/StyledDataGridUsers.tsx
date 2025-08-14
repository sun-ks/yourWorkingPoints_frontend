import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridToolbarExport,
  GridValueGetterParams,
} from '@mui/x-data-grid';

import { CustomToolbar } from './CustomToolbar';

const StyledHeaderAskClient = styled('span')(({ theme }) => ({
  color: theme.palette.error.light,
  textAlign: 'left',
  display: 'block',
  fontSize: 14,
  marginBottom: 8,
}));

const StyledDataGridUsers: FC<any> = ({ users, error, isLoading, type }) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const columns: GridColDef[] = [
    {
      field: 'created',
      headerName: t('usersColumns.created'),
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        `${new Date(params.row.created).toLocaleDateString()}`,
    },
    {
      field: 'is_active',
      headerName: t('usersColumns.status'),
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        t(`usersColumns.is_active_${params.row.is_active}`),
    },
    {
      field: 'role',
      headerName: t('usersColumns.role'),
      width: 150,
      editable: true,
    },
    {
      field: 'name',
      headerName: t('usersColumns.name'),
      width: 200,
      editable: true,
    },
    {
      field: 'phone',
      headerName: t('usersColumns.phone'),
      width: 200,
      editable: true,
    },
    {
      field: 'email',
      headerName: t('usersColumns.email'),
      width: 200,
      editable: true,
    },
  ];

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
            <DataGrid
              scrollbarSize={53}
              rows={users || []}
              columns={columns}
              getRowId={(row) => row.user_id}
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
              slots={{ toolbar: CustomToolbar }}
              onRowClick={handleRowClick}
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

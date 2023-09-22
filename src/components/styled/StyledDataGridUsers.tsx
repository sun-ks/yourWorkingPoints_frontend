import { FC } from "react";
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import {GridToolbar, DataGrid, GridColDef, GridValueGetterParams, GridEventListener } from '@mui/x-data-grid';
import { useTranslation } from "react-i18next";
import {isEmpty} from "lodash";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';


const StyledHeaderAskClient = styled('span')(({ theme }) => ({
  color: theme.palette.error.light,
  textAlign: 'left',
  display: 'block',
  fontSize: 14,
  marginBottom: 8,
}));

const StyledDataGridUsers: FC<any> = ({users, error, isLoading, type}) => {

  const navigate = useNavigate();

  const {t} = useTranslation();

  const columns: GridColDef[] = [
    {
      field: 'created',
      headerName: t('usersColumns.created'),
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        `${ new Date(params.row.created).toLocaleDateString()}`,
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

  return <>
    {error && <Box sx={{ marginBottom: 3 }}>
      <Typography color="error">Data load Error</Typography>
    </Box>}
    
    {isLoading ? (
  <p>Loading...</p>
) : users && users.length > 0 ? (
<>
  <Box sx={{ 
    width: '100%', 
    overflow: 'auto'
  }}>
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
  'Workers List is empty'
)}
  </>
};

export default StyledDataGridUsers;
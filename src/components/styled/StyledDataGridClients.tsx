import { FC } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Typography} from '@mui/material';
import { GridToolbar,
  DataGrid, 
  GridColDef, 
  GridValueGetterParams, 
  GridEventListener} from '@mui/x-data-grid';
import { useTranslation } from "react-i18next";

  const StyledDataGridClients: FC<any> = ({clients, error, isLoading, type}) => {

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
      field: 'phone',
      headerName: t('usersColumns.status'),
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
      field: 'email',
      headerName: t('usersColumns.email'),
      width: 200,
      editable: true,
    },
  ];

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const client_id = params.row.client_id;
    navigate(`/clients/${client_id}`);
  };

  return <>
    {error && <Box sx={{ marginBottom: 3 }}>
      <Typography color="error">Data load Error</Typography>
    </Box>}
    
    {isLoading ? (
  <p>Loading...</p>
) : clients && clients.length > 0 ? (
<>
  <Box sx={{ 
    width: '100%', 
    overflow: 'auto'
  }}>
    <DataGrid
      scrollbarSize={53}
      rows={clients || []}
      columns={columns}
      getRowId={(row) => row.client_id}
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
  'Clients List is empty'
)}
  </>
};

export default StyledDataGridClients;
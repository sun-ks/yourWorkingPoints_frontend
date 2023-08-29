import { FC } from "react";
import { useNavigate } from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import {GridToolbar, DataGrid, GridColDef, GridValueGetterParams, GridEventListener } from '@mui/x-data-grid';
import { useTranslation } from "react-i18next";

const StyledDataGrid: FC<any> = ({tickets, error, isLoading}) => {

  const navigate = useNavigate();

  const {t} = useTranslation();

  const columns: GridColDef[] = [
    {
      field: 'created',
      headerName: t('ticketsColumns.created'),
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        `${ new Date(params.row.created).toLocaleDateString()}`,
    },
    {
      field: 'status',
      headerName: t('ticketsColumns.status'),
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) => { 
        let status = params.row.status; 
        if (status === 'in progress') status = 'in_progress'
        return t(`statuses.${status}`)
      }
    },
    {
      field: 'priority',
      headerName: t('ticketsColumns.priority'),
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) => t(`priorities.${params.row.priority}`)
    },
    {
      field: 'device_sn',
      headerName: t('ticketsColumns.device_sn'),
      width: 170,
      editable: true,
    },
    {
      field: 'name',
      headerName: t('ticketsColumns.name'),
      width: 150,
      editable: true,
    },
    {
      field: 'client_phone',
      headerName: t('ticketsColumns.client_phone'),
      width: 150,
      editable: true,
    },
    {
      field: 'client_first_name',
      headerName: t('ticketsColumns.client'),
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.client_first_name || ''} ${params.row.client_lasrt_name || ''}`,
    },
    {
      field: 'parseInt(',
      headerName: t('ticketsColumns.paid'),
      type: 'number',
      width: 100,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
      parseInt(params.row.paid) + parseInt(params.row.last_part_payment)
    },
  ];

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const pintId = params.row.point_id;
    navigate(`/items/${params.id}/${pintId}`)
  };

  return <>
    {error && <Box sx={{ marginBottom: 3 }}>
      <Typography color="error">Data load Error</Typography>
    </Box>}
    
    {isLoading ? (
  <p>Loading...</p>
) : tickets && tickets.length > 0 ? (
 
  <Box sx={{  width: '100%', overflow: 'auto'}}>
    <DataGrid
      scrollbarSize={53}
      rows={tickets || []}
      columns={columns}
      getRowId={(row) => row.ticket_id}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[10]}
      //checkboxSelection
      disableRowSelectionOnClick
      //disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      //slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      onRowClick={handleRowClick}
    />
  </Box>
) : (
  'This point does not have Tickets yet'
)}
  </>
};

export default StyledDataGrid;
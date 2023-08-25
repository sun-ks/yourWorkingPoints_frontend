import { FC } from "react";
import {itemAPI} from "../../../services/ItemService";
import { useNavigate } from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import {GridToolbar, DataGrid, GridColDef, GridValueGetterParams, GridEventListener } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
const columns: GridColDef[] = [
  {
    field: 'created',
    headerName: 'Сreated',
    width: 150,
    editable: true,
    valueGetter: (params: GridValueGetterParams) =>
      `${ new Date(params.row.created).toLocaleDateString()}`,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    editable: true,
  },
  {
    field: 'priority',
    headerName: 'Priority',
    width: 150,
    editable: true,
  },
  {
    field: 'device_sn',
    headerName: 'Device S/N',
    width: 170,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Device Name',
    width: 150,
    editable: true,
  },
  {
    field: 'client_phone',
    headerName: 'Client Phone',
    width: 150,
    editable: true,
  },
  {
    field: 'client_first_name',
    headerName: 'Client',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 130,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.client_first_name || ''} ${params.row.client_lasrt_name || ''}`,
  },
  {
    field: 'parseInt(',
    headerName: 'Paid',
    type: 'number',
    width: 150,
    editable: true,
    valueGetter: (params: GridValueGetterParams) =>
    parseInt(params.row.paid) + parseInt(params.row.last_part_payment)
  },
  
];

const Content: FC<{point_id: string | undefined}> = ({point_id}) => {

  const {data: items, error, isLoading} = itemAPI.useGetItemsQuery({point_id});

  const navigate = useNavigate();

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    navigate(`/items/${params.id}`)
  };

  return <>
    {error && <Box sx={{ marginBottom: 3 }}>
      <Typography color="error">Data load Error</Typography>
    </Box>}
    
    {isLoading ? (
  <p>Loading...</p>
) : items && items.length > 0 ? (
  <Box sx={{  width: '100%', overflow: 'auto'}}>
    <DataGrid
      autoHeight
      autoPageSize
      scrollbarSize={53}
      rows={items || []}
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
) : (
  'This point does not have Tickets yet'
)}
  </>
};

export default Content;
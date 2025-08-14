import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { FC } from 'react';

import { Box, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid';

const StyledHeaderAskClient = styled('span')(({ theme }) => ({
  color: theme.palette.error.light,
  textAlign: 'left',
  display: 'block',
  fontSize: 14,
  marginBottom: 8,
}));

function getPrintStatus(status: string, t: any): string {
  if (status === 'in progress') status = 'in_progress';
  else if (status === 'ask client') status = 'ask_client';
  return t(`statuses.${status}`);
}

const StyledDataGridTckets: FC<any> = ({ tickets, error, isLoading }) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const columns: GridColDef[] = [
    {
      field: 'created',
      headerName: t('ticketsColumns.created'),
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        `${new Date(params.row.created).toLocaleDateString()}`,
    },
    {
      field: 'status',
      headerName: t('ticketsColumns.status'),
      width: 150,
      editable: true,
      renderCell: (params) => {
        const value = getPrintStatus(params.row.status, t);
        return <div data-grid-status={`${params.row.status}`}>{value}</div>;
      },
    },
    {
      field: 'priority',
      headerName: t('ticketsColumns.priority'),
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        t(`priorities.${params.row.priority}`),
      renderCell: (params) => {
        const value = t(`priorities.${params.row.priority}`);
        return <div data-grid-priority={`${params.row.priority}`}>{value}</div>;
      },
    },
    {
      field: 'assigned_at',
      headerName: t('ticketsColumns.assigned_at'),
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.user_name || params.row.user_email || 'None'}`,
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
        `${params.row.client_name || ''}`,
    },
    {
      field: 'parseInt(',
      headerName: t('ticketsColumns.paid'),
      type: 'number',
      width: 100,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        parseInt(params.row.paid) + parseInt(params.row.last_part_payment),
    },
  ];

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const pintId = params.row.point_id;
    navigate(`/items/${params.id}/${pintId}`);
  };

  const askClientTickets =
    tickets && tickets.filter((item: any) => item.status === 'ask client');

  return (
    <>
      {error && (
        <Box sx={{ marginBottom: 3 }}>
          <Typography color="error">Data load Error</Typography>
        </Box>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : tickets && tickets.length > 0 ? (
        <>
          {!isEmpty(askClientTickets) && (
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                marginBottom: 3,
                '& ul': { padding: 0 },
              }}
            >
              <StyledHeaderAskClient>
                {t('tickets.client_approval')}
              </StyledHeaderAskClient>
              {askClientTickets.map((item: any, i: number) => (
                <div onClick={() => {}} key={`section-${i}`}>
                  <ul>
                    <ListItem
                      sx={{ marginTop: 0, padding: '0' }}
                      key={`item-${i}`}
                    >
                      <span
                        onClick={() => {
                          navigate(`/items/${item.ticket_id}/${item.point_id}`);
                        }}
                        style={{
                          cursor: 'pointer',
                          fontSize: 14,
                        }}
                      >
                        {`${new Date(item.created).toLocaleDateString()}, 
                ${t(`priorities.${item.priority}`)}, 
                ${item.name}${item.client_first_name ? ', ' + item.client_first_name : ''}`}
                      </span>
                    </ListItem>
                  </ul>
                </div>
              ))}
            </List>
          )}

          <Box
            sx={{
              width: '100%',
              overflow: 'auto',
            }}
          >
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
              pageSizeOptions={[50]}
              //checkboxSelection
              disableRowSelectionOnClick
              //disableColumnFilter
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
        'This point does not have Tickets yet'
      )}
    </>
  );
};

export default StyledDataGridTckets;

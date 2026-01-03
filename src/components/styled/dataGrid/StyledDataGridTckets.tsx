import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import { FC } from 'react';

import { Box, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import { GridEventListener, GridToolbar } from '@mui/x-data-grid';

import { DataGridWithDraggableColumns } from '../../../hoc/dataGridWithDraggableColumns';
import { dataGridOrderSlice } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';
import { selectTicketsDataGridColumnsOrder } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';
import { IItem } from '../../../types/IItem';
import { getTicketColumns } from './columns/ticketsColumns';

const StyledHeaderAskClient = styled('span')(({ theme }) => ({
  color: theme.palette.error.light,
  textAlign: 'left',
  display: 'block',
  fontSize: 14,
  marginBottom: 8,
}));

const StyledDataGridTckets: FC<{
  isLoading: boolean;
  error?: SerializedError | FetchBaseQueryError | string;
  tickets?: IItem[];
}> = ({ tickets, error, isLoading }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setColumnsOrderTickets } = dataGridOrderSlice.actions;
  const columnOrderDefs = useSelector(selectTicketsDataGridColumnsOrder);

  const [columnOrder, setColumnOrder] = useState(columnOrderDefs);

  useEffect(() => {
    dispatch(setColumnsOrderTickets(columnOrder));
  }, [columnOrder]);

  const columnDefs = getTicketColumns(t);

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const pintId = params.row.point_id;
    navigate(`/items/${params.id}/${pintId}`);
  };

  const askClientTickets =
    tickets && tickets.filter((item) => item.status === 'ask client');

  return (
    <>
      {error && (
        <Box sx={{ mb: 3 }}>
          <Typography color="error">Data load Error</Typography>
        </Box>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : tickets && tickets.length > 0 ? (
        <>
          {askClientTickets && !isEmpty(askClientTickets) && (
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                mb: 3,
                '& ul': { p: 0 },
              }}
            >
              <StyledHeaderAskClient>
                {t('tickets.client_approval')}
              </StyledHeaderAskClient>
              {askClientTickets.map((item, i: number) => (
                <div key={`section-${i}`}>
                  <ul>
                    <ListItem sx={{ mt: 0, p: 0 }} key={`item-${i}`}>
                      <span
                        onClick={() =>
                          navigate(`/items/${item.ticket_id}/${item.point_id}`)
                        }
                        style={{ cursor: 'pointer', fontSize: 14 }}
                      >
                        {`${new Date(item.created).toLocaleDateString()}, ${t(`priorities.${item.priority}`)}, ${item.name}${item.client_first_name ? ', ' + item.client_first_name : ''}`}
                      </span>
                    </ListItem>
                  </ul>
                </div>
              ))}
            </List>
          )}

          <DataGridWithDraggableColumns
            columnDefs={columnDefs}
            scrollbarSize={53}
            rows={tickets || []}
            getRowId={(row: IItem) => row.ticket_id}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            //pageSizeOptions={[10, 25, 50, 100]}
            //disableRowSelectionOnClick
            //disableColumnSelector
            //disableDensitySelector
            /*slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}*/
            showToolbar={true}
            onRowClick={handleRowClick}
            columnOrder={columnOrder}
            setColumnOrder={setColumnOrder}
          />
        </>
      ) : (
        'This point does not have Tickets yet'
      )}
    </>
  );
};

export default StyledDataGridTckets;

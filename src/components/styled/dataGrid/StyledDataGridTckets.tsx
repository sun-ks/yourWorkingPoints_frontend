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
import { GridEventListener } from '@mui/x-data-grid';

import { DataGridWithDraggableColumns } from '../../../hoc/dataGridWithDraggableColumns';
import { dataGridColumnVisibilityModelSlice } from '../../../store/reducers/dataGridColumnVisibilityModel/dataGridColumnVisibilityModelSlice';
import { selectDataGridColumnVisibilityModeTickets } from '../../../store/reducers/dataGridColumnVisibilityModel/dataGridColumnVisibilityModelSlice';
import { dataGridColumnWidthsSlice } from '../../../store/reducers/dataGridColumnWidths/dataGridColumnWidths';
import { selectDataGridColumnWidthsTickets } from '../../../store/reducers/dataGridColumnWidths/dataGridColumnWidths';
import { dataGridOrderSlice } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';
import { selectTicketsDataGridColumnsOrder } from '../../../store/reducers/dataGridOrder/DataGridOrderSlice';
import { dataGridRowsForPageSlice } from '../../../store/reducers/dataGridRowsForPage/dataGridRowsForPage';
import { selectDataGridRowsForPageTickets } from '../../../store/reducers/dataGridRowsForPage/dataGridRowsForPage';
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

  const { setColumnsVisibilityModelTickets } =
    dataGridColumnVisibilityModelSlice.actions;

  const { setdataGridColumnWidthsTickets } = dataGridColumnWidthsSlice.actions;

  const { setdataGridRowsForPageTickets } = dataGridRowsForPageSlice.actions;

  const columnOrderDefs = useSelector(selectTicketsDataGridColumnsOrder);

  const rowsForPageDef = useSelector(selectDataGridRowsForPageTickets);

  const columnVisibilityModelDefs = useSelector(
    selectDataGridColumnVisibilityModeTickets,
  );

  const columnWidthsDefs = useSelector(selectDataGridColumnWidthsTickets);

  const [columnOrder, setColumnOrder] = useState(columnOrderDefs);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<{
    [key: string]: boolean;
  }>(columnVisibilityModelDefs);

  const [columnWidths, setColumnWidths] =
    useState<Record<string, number>>(columnWidthsDefs);

  const [rowsForPage, setRowsForPage] = useState<number>(rowsForPageDef);

  useEffect(() => {
    dispatch(setColumnsOrderTickets(columnOrder));
  }, [columnOrder]);

  useEffect(() => {
    dispatch(setColumnsVisibilityModelTickets(columnVisibilityModel));
  }, [columnVisibilityModel]);

  useEffect(() => {
    dispatch(setdataGridColumnWidthsTickets(columnWidths));
  }, [columnWidths]);

  useEffect(() => {
    dispatch(setdataGridRowsForPageTickets(rowsForPage));
  }, [rowsForPage]);

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
        </>
      ) : (
        'This point does not have Tickets yet'
      )}
    </>
  );
};

export default StyledDataGridTckets;

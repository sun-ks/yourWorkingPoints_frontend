import React, { useState, useMemo, FC } from 'react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const StyledHeaderAskClient = styled('span')(({ theme }) => ({
  color: theme.palette.error.light,
  textAlign: 'left',
  display: 'block',
  fontSize: 14,
  marginBottom: 8,
}));

const SortableHeader = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    background: "#f0f0f0",
    padding: "4px",
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

function getPrintStatus(status: string, t: any): string {
  if (status === 'in progress') status = 'in_progress';
  else if (status === 'ask client') status = 'ask_client';
  return t(`statuses.${status}`);
}

const StyledDataGridTckets: FC<any> = ({ tickets, error, isLoading }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [columnOrder, setColumnOrder] = useState([
    "created",
    "status",
    "priority",
    "assigned_at",
    "device_sn",
    "name",
    "client_phone",
    "client_first_name",
    "paid",
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setColumnOrder((order) => {
      const oldIndex = order.indexOf(active.id);
      const newIndex = order.indexOf(over.id);
      const newOrder = [...order];
      newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, active.id);
      return newOrder;
    });
  };

  const columnDefs: Record<string, GridColDef> = {
    created: {
      field: "created",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.created).toLocaleDateString(),
    },
    status: {
      field: "status",
      width: 150,
      renderCell: (params) => <div data-grid-status={params.row.status}>{getPrintStatus(params.row.status, t)}</div>,
    },
    priority: {
      field: "priority",
      width: 150,
      valueGetter: (params) => t(`priorities.${params.row.priority}`),
    },
    assigned_at: {
      field: "assigned_at",
      width: 150,
      valueGetter: (params) =>
        params.row.user_name || params.row.user_email || "None",
    },
    device_sn: { field: "device_sn", width: 170 },
    name: { field: "name", width: 150 },
    client_phone: { field: "client_phone", width: 150 },
    client_first_name: {
      field: "client_first_name",
      width: 100,
      valueGetter: (params) => params.row.client_name || "",
    },
    paid: {
      field: "paid",
      width: 100,
      type: "number",
      valueGetter: (params) =>
        parseInt(params.row.paid) + parseInt(params.row.last_part_payment),
    },
  };

  // Формируем колонки с учетом порядка и drag header
  const columns = useMemo(
    () =>
      columnOrder.map((key) => ({
        ...columnDefs[key],
        renderHeader: (params) => <SortableHeader id={key}>{t(`ticketsColumns.${key}`)}</SortableHeader>,
      })),
    [columnOrder, columnDefs, t, i18n.language]
  );

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const pintId = params.row.point_id;
    navigate(`/items/${params.id}/${pintId}`);
  };

  const askClientTickets =
    tickets && tickets.filter((item: any) => item.status === 'ask client');

  return (
    <>
      {error && <Box sx={{ mb: 3 }}><Typography color="error">Data load Error</Typography></Box>}

      {isLoading ? <p>Loading...</p> : tickets && tickets.length > 0 ? (
        <>
          {!isEmpty(askClientTickets) && (
            <List sx={{ width: '100%', bgcolor: 'background.paper', position: 'relative', overflow: 'auto', maxHeight: 300, mb: 3, '& ul': { p: 0 } }}>
              <StyledHeaderAskClient>{t('tickets.client_approval')}</StyledHeaderAskClient>
              {askClientTickets.map((item: any, i: number) => (
                <div key={`section-${i}`}>
                  <ul>
                    <ListItem sx={{ mt: 0, p: 0 }} key={`item-${i}`}>
                      <span
                        onClick={() => navigate(`/items/${item.ticket_id}/${item.point_id}`)}
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

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
              <Box sx={{ width: '100%', overflow: 'auto' }}>
                <DataGrid
                  scrollbarSize={53}
                  rows={tickets || []}
                  columns={columns}
                  getRowId={(row) => row.ticket_id}
                  initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                  pageSizeOptions={[50]}
                  disableRowSelectionOnClick
                  disableColumnSelector
                  disableDensitySelector
                  slots={{ toolbar: GridToolbar }}
                  slotProps={{ toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 500 } } }}
                  onRowClick={handleRowClick}
                />
              </Box>
            </SortableContext>
          </DndContext>
        </>
      ) : (
        'This point does not have Tickets yet'
      )}
    </>
  );
};

export default StyledDataGridTckets;

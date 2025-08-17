import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTranslation } from 'react-i18next';

import React, { Dispatch, SetStateAction, useMemo } from 'react';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';

const SortableHeader = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    color: isDragging ? ' #030393ff' : 'inherit',
    padding: '0',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

function draggableDataGrid(
  DataGridComponent: React.ComponentType<DataGridProps>,
) {
  const StyledDataGrid = styled(DataGridComponent)({
    '& .MuiDataGrid-columnHeaderTitleContainerContent, & .MuiDataGrid-columnHeaderTitleContainer, & .css-1iyq7zh-MuiDataGrid-columnHeaders, & .css-204u17-MuiDataGrid-main':
      {
        overflow: 'visible',
      },
  });
  return function DraggableColumnsWrapper({
    columnDefs,
    columnOrder,
    setColumnOrder,
    ...props
  }: {
    columnDefs: Record<string, GridColDef>;
    columnOrder: string[];
    setColumnOrder: Dispatch<SetStateAction<string[]>>;
  } & Omit<DataGridProps, 'columns'>) {
    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      setColumnOrder((order) => {
        const oldIndex = order.indexOf(String(active.id));
        const newIndex = order.indexOf(String(over.id));
        const newOrder = [...order];
        newOrder.splice(oldIndex, 1);
        newOrder.splice(newIndex, 0, String(active.id));
        return newOrder;
      });
    };

    const columns = useMemo(
      () =>
        columnOrder.map((key: string) => {
          const def = columnDefs[key];

          return {
            ...def,
            renderHeader: () => (
              <SortableHeader id={key}>{def.headerName}</SortableHeader>
            ),
          };
        }),
      [columnOrder, columnDefs],
    );

    return (
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={columnOrder}
          strategy={horizontalListSortingStrategy}
        >
          <Box sx={{ width: '100%' }}>
            <StyledDataGrid {...props} columns={columns} />
          </Box>
        </SortableContext>
      </DndContext>
    );
  };
}

export const DataGridWithDraggableColumns = draggableDataGrid(DataGrid);

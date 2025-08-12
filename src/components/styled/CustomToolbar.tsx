import { useSelector } from 'react-redux';

import React, { FC } from 'react';

import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { isOwner } from '../../store/reducers/AuthSlice';

export const CustomToolbar: FC = () => {
  const isOwnerVal = useSelector(isOwner);

  return (
    <GridToolbarContainer
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <GridToolbarQuickFilter debounceMs={500} />

      {isOwnerVal && <GridToolbarExport />}
    </GridToolbarContainer>
  );
};

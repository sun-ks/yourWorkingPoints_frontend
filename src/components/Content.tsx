import * as React from 'react';
import Paper from '@mui/material/Paper';

import { Link, Outlet } from 'react-router-dom';

export default function Content() {
  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <Outlet />
    </Paper>
  );
}

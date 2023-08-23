import * as React from 'react';
import Paper from '@mui/material/Paper';

import { Link, Outlet } from 'react-router-dom';

export default function Content() {
  return (
    <Paper sx={{   margin: 'auto 10px auto 10px', overflow: 'hidden' }}>
      <Outlet />
    </Paper>
  );
}

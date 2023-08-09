import * as React from 'react';
import Paper from '@mui/material/Paper';

import { Link, Outlet } from 'react-router-dom';

export default function Content() {
  return (
    <Paper sx={{  margin: 'auto 30px auto 30px', overflow: 'hidden' }}>
      <Outlet />
    </Paper>
  );
}

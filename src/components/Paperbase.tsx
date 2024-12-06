import * as React from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';

import { DRAWER_WIDTH } from '../constants/common';
import Content from './Content';
import Header from './Header';
import Navigator from './Navigator';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'© Your Working Points. Made in Ukraine'}
    </Typography>
  );
}

const useStyles = makeStyles((theme: any) => ({
  noPrint: {
    '@media print': {
      display: 'none',
    },
  },
}));

export default function Paperbase() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const classes = useStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }} data-testid="footer">
      <CssBaseline />
      <Box
        className={classes.noPrint}
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        {isSmUp ? null : (
          <Navigator
            PaperProps={{ style: { width: DRAWER_WIDTH } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onClick={() => {
              handleDrawerToggle();
            }}
          />
        )}
        <Navigator
          PaperProps={{ style: { width: DRAWER_WIDTH } }}
          sx={{ display: { sm: 'block', xs: 'none' } }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
        }}
      >
        <div className={classes.noPrint}>
          <Header onDrawerToggle={handleDrawerToggle} />
        </div>
        <Box component="main" sx={{ flex: 1, py: 6, bgcolor: '#eaeff1' }}>
          <Content />
        </Box>
        <div className={classes.noPrint}>
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </div>
      </Box>
    </Box>
  );
}

import React, { FC } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import {Tooltip, Container, Box} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  useNavigate,
} from 'react-router-dom';

import Content from '../Content';

const CreateNewTiket: FC = () => {
  const navigate = useNavigate();

  return (
    <HelmetProvider>
      <Helmet>
        <title>{'YWP | Create Ticket'}</title>
      </Helmet>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Tooltip title="Back">
                <IconButton onClick={() => navigate(-1)}>
                  <KeyboardBackspaceIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
        <Container maxWidth="sm">
          <Box 
            sx={{
              padding: 1
            }}>
            <Content/>
          </Box>
        </Container>
    </HelmetProvider>
  )
}

export default CreateNewTiket;
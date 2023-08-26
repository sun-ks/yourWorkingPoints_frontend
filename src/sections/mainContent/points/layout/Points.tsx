import React, { FC, useState, useEffect } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AppBar from '@mui/material/AppBar';
import {Toolbar, Container, Box, Grid, Button, Tooltip} from '@mui/material';
import { Link } from 'react-router-dom';
import Content from '../Content';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  useNavigate,
} from 'react-router-dom';

const Points: FC = () => {
  const navigate = useNavigate();

  return (
    <>
    <HelmetProvider>
      <Helmet>
        <title>{'YWP | Create Point'}</title>
      </Helmet>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item>
              Choice Point:
            </Grid>
            <Grid item>
              <Button component={Link} to="/createNewPoint" variant="contained" sx={{ mr: 1 }}>
                Create Point
              </Button>
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
    </>
  )
}

export default Points;
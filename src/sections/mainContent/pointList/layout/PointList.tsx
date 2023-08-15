import React, { FC, useState, useEffect } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AppBar from '@mui/material/AppBar';
import {Toolbar, Container, Box, Grid, Button} from '@mui/material';
import { Link } from 'react-router-dom';
import Content from '../Content';

const PointList: FC = () => {
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
            <Grid container spacing={2} alignItems="center">
              <Grid item xs></Grid>
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
                padding: 4
              }}>
              <Content/>
            </Box>
          </Container>
        </HelmetProvider>
      </>
    )
}

export default PointList;
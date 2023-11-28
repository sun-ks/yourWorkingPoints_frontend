import React, { FC, useState, useEffect } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AppBar from '@mui/material/AppBar';
import {Toolbar, Container, Box, Grid, Button} from '@mui/material';
import { Link } from 'react-router-dom';
import Content from '../Content';
import { useTranslation } from "react-i18next";

const Points: FC = () => {
  
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`YWP | ${t('points')}`}</title>
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
              {t('choise_point')}
            </Grid>
            <Grid item>
              <Button component={Link} to="/createNewPoint" variant="contained" sx={{ mr: 1 }}>
                {t('create_point')}
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
            TEST-1234
          <Content/>
        </Box>
      </Container>
    </HelmetProvider>
  )
}

export default Points;
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import React, { FC } from 'react';

import { Box, Button, Container, Grid, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';

import { isOwner } from '../../../../store/reducers/AuthSlice';
import Content from '../Content';

const Clients: FC = () => {
  const { t } = useTranslation();
  const isOwnerVal = useSelector(isOwner);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`YWP | ${t('clients.clients_title_seo')}`}</title>
      </Helmet>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item></Grid>
            <Grid item>
              <Button
                component={Link}
                to={`/addClient`}
                variant="contained"
                sx={{ mr: 1 }}
                disabled={!isOwnerVal}
              >
                {t('clients.add_client')}
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container>
        <Box
          sx={{
            padding: 1,
          }}
        >
          <Content />
        </Box>
      </Container>
    </HelmetProvider>
  );
};

export default Clients;

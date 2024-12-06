import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import React, { FC } from 'react';

import { Box, Button, Container, Grid, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';

import StyledRouterLink from '../../../../components/styled/RouterLink';
import Content from '../Content';

const Tickets: FC = () => {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`YWP | ${t('all_tickets')}`}</title>
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
            <Grid item>
              <StyledRouterLink to={`/`}>{t('points')}</StyledRouterLink> /{' '}
              {t('all_tickets')}
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to={`/createTicket`}
                variant="contained"
                sx={{ mr: 1 }}
              >
                {t('tickets.create_ticket')}
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

export default Tickets;

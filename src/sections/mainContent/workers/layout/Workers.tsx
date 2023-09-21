import React, { FC } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AppBar from '@mui/material/AppBar';
import {Toolbar, Container, Box, Grid, Button} from '@mui/material';
import { Link } from 'react-router-dom';
import Content from '../Content';
import StyledRouterLink from '../../../../components/styled/RouterLink';

import { useTranslation } from "react-i18next";

const Workers: FC = () => {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`YWP | ${t('worker.workers_title_seo')}`}</title>
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
              <StyledRouterLink to={`/`}>{t('points')}</StyledRouterLink> / {t('all_tickets')}
            </Grid>
            <Grid item>
              <Button component={Link} to={`/addNewWorker`} variant="contained" sx={{ mr: 1 }}>
                {t('worker.add_worker')}
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container >
        <Box 
          sx={{
            padding: 1
          }}>
          <Content />
        </Box>
      </Container>
    </HelmetProvider>
  )
}

export default Workers;
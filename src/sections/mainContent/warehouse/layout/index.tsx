import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { FC } from 'react';

import { Box, Button, Container, Grid, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';

import Content from '../Content';

const Warehouse: FC = () => {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`YWP | ${t('warehouse.title_seo')}`}</title>
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
            sx={{ width: '100%' }}
          >
            <Grid></Grid>
            <Grid>
              <Button
                component={Link}
                to={`/addInventoryItem`}
                variant="contained"
                sx={{ mr: 1 }}
              >
                {t('warehouse.add_inventory_item')}
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

export default Warehouse;

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import React, { FC } from 'react';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, Container, Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import Content from '../Content';

const AddNewWorker: FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`YWP | ${t('worker.add_worker')}`}</title>
      </Helmet>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid>
              <Tooltip title={`${t('back')}`}>
                <IconButton onClick={() => navigate(-1)}>
                  <KeyboardBackspaceIcon
                    color="inherit"
                    sx={{ display: 'block' }}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
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

export default AddNewWorker;

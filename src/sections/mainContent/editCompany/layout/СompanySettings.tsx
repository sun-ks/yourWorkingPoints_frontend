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
import { useTranslation } from "react-i18next";

import Content from '../Content';

const СompanySettings: FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

    return (
      <HelmetProvider>
        <Helmet>
          <title>{`YWP | ${t('createPoint.create_point')}`}</title>
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
                <Tooltip title={`${t('back')}`}>
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

export default СompanySettings;
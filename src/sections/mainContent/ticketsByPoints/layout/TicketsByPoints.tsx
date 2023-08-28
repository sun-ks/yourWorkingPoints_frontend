import React, { FC, useState, useEffect } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AppBar from '@mui/material/AppBar';
import {Toolbar, Container, Box, Grid, Button, Tooltip, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { pointAPI } from "../../../../services/PointService";
import Content from '../Content';
import StyledRouterLink from '../../../../components/styled/RouterLink';
import {
  useNavigate,
} from 'react-router-dom';
import { useTranslation } from "react-i18next";

const TicketsByPoints: FC = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const { point_id } = useParams<{point_id: string }>();
  const {data: currentPoint} = pointAPI.useGetPointByPointIdQuery(point_id);
  return (
    <>
    <HelmetProvider>
      <Helmet>
        <title>{'YWP | Tickets'}</title>
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
              <StyledRouterLink to={`/`}>Points</StyledRouterLink> / {currentPoint?.name}
            </Grid>
            <Grid item>
              <Button component={Link} to={`/createTicket/${point_id}`} variant="contained" sx={{ mr: 1 }}>
                {t('tickets.create_ticket')}
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
            <Content point_id={point_id}/>
          </Box>
        </Container>
      </HelmetProvider>
    </>
  )
}

export default TicketsByPoints;
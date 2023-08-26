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

const Tickets: FC = () => {
  const navigate = useNavigate();

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
              <StyledRouterLink to={`/`}>Points</StyledRouterLink> / All Tickets:
            </Grid>
            <Grid item>
              <Button component={Link} to={`/createTicket`} variant="contained" sx={{ mr: 1 }}>
                Create Ticket
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
    </>
  )
}

export default Tickets;
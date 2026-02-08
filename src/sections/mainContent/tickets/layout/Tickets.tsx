import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import React, { FC, useEffect, useState } from 'react';
import { useContext } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Container, Grid, Toolbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';

import StyledRouterLink from '../../../../components/styled/RouterLink';
import { WebSocketContext } from '../../../../context/WebSocketContext';
import Content from '../Content';
import { TNewTicketsCreatedByOtherUser } from '../types';

const Tickets: FC = () => {
  const { t } = useTranslation();

  const wsContext = useContext(WebSocketContext);

  const ws = wsContext?.ws;

  const [newTicketsCreatedByOtherUser, setNewTicketsCreatedByOtherUser] =
    useState<TNewTicketsCreatedByOtherUser[]>([]);

  useEffect(() => {
    if (!ws) return;
    const handleMessage = (e: MessageEvent) => {
      const info = JSON.parse(e?.data);
      if (info?.type === 'TICKET_CREATED') {
        setNewTicketsCreatedByOtherUser((prev) => [
          ...prev,
          { ...info.payload },
        ]);
      }
    };

    ws.addEventListener('message', handleMessage);

    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, [ws]);

  useEffect(() => {
    console.log('NewTicketsCreatedByOtherUser', newTicketsCreatedByOtherUser);
  }, [newTicketsCreatedByOtherUser]);

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
            sx={{ width: '100%' }}
          >
            <Grid>
              <StyledRouterLink to={`/`}>{t('points')}</StyledRouterLink> /{' '}
              {t('all_tickets')}
            </Grid>
            <Grid>
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
        {newTicketsCreatedByOtherUser.length > 0 && (
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setNewTicketsCreatedByOtherUser([]);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{
              backgroundColor: 'white',
              marginTop: 2,
              position: 'sticky',
              top: 0,
              zIndex: 9999,
            }}
            variant="outlined"
            severity="info"
          >
            {t('tickets.new_ticket_created_by_other_user_alert')}
            {newTicketsCreatedByOtherUser.map((ticket) => (
              <Box
                key={ticket.ticketId}
                sx={{ textAlign: 'left', marginTop: 1 }}
              >
                <StyledRouterLink to={`/items/${ticket.ticketId}`}>
                  {ticket.ticketName}, {ticket.ticketPriority}
                </StyledRouterLink>
              </Box>
            ))}
          </Alert>
        )}
        <Box
          sx={{
            padding: 1,
          }}
        >
          <Content
            newTicketsCreatedByOtherUser={newTicketsCreatedByOtherUser}
          />
        </Box>
      </Container>
    </HelmetProvider>
  );
};

export default Tickets;

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import React, { FC, useEffect, useState } from 'react';
import { useContext } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Container, Grid, Toolbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';

import StyledRouterLink from '../../../../components/styled/RouterLink';
import { WebSocketContext } from '../../../../context/WebSocketContext';
import { pointAPI } from '../../../../services/PointService';
import Content from '../Content';

const TicketsByPoints: FC = () => {
  const { t } = useTranslation();
  const { point_id } = useParams<{ point_id: string }>();
  const { data: currentPoint } = pointAPI.useGetPointByPointIdQuery(point_id);

  const wsContext = useContext(WebSocketContext);

  const ws = wsContext?.ws;

  const [isNewTicketAlertOpen, setIsNewTicketAlertOpen] = useState(false);

  useEffect(() => {
    if (!ws) return;
    const handleMessage = (e: MessageEvent) => {
      const info = JSON.parse(e?.data);
      if (info?.type === 'TICKET_CREATED') {
        setIsNewTicketAlertOpen(true);
      }
    };

    ws.addEventListener('message', handleMessage);

    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, [ws]);

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
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: '100%' }}
            >
              <Grid>
                <StyledRouterLink to={`/`}>{t('points')}</StyledRouterLink> /{' '}
                {currentPoint?.name}
              </Grid>
              <Grid>
                <Button
                  component={Link}
                  to={`/createTicket/${point_id}`}
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
          {isNewTicketAlertOpen && (
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setIsNewTicketAlertOpen(false);
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
            </Alert>
          )}
          <Box
            sx={{
              padding: 1,
            }}
          >
            <Content point_id={point_id} />
          </Box>
        </Container>
      </HelmetProvider>
    </>
  );
};

export default TicketsByPoints;

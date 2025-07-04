import { title } from 'process';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import { useNavigate, useParams } from 'react-router-dom';

import React, { FC, useEffect, useState } from 'react';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { companyAPI } from '../../../../services/CompanyService';
import { pointAPI } from '../../../../services/PointService';
import { ticketAPI } from '../../../../services/TicketService';
import { warehouseAPI } from '../../../../services/WarehouseService';
import Content from '../Content';

const siteUrl = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme: any) => ({
  noPrint: {
    '@media print': {
      display: 'none',
    },
  },
  print: {
    display: 'none',
    textAlign: 'left',
    '@media print': {
      display: 'block',
      backgroundColor: 'lightgray',
    },
  },
}));

const Ticket: FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { ticket_id, point_id } = useParams();

  const { data: ticket } = ticketAPI.useGetTicketQuery(ticket_id);

  const {
    data: inventoryData,
    refetch: refetchSavedInventoryItemsForCurrentTicket,
  } = warehouseAPI.useGetInventoryItemsByCompanyIdAndTicketIdQuery(ticket_id!, {
    skip: !ticket_id,
  });

  const savedInventoryItemsForCurrentTicket = inventoryData?.data;

  const [status, setStatus] = useState<string>();

  const [printType, setPrintType] = useState<'qr' | 'order' | false>(false);

  const { data: company, error, isLoading } = companyAPI.useGetCompanyQuery('');

  const { data: point } = pointAPI.useGetPointByPointIdQuery(point_id);

  const classes = useStyles();

  function printDocument() {
    return new Promise((resolve) => {
      window.print();
      setTimeout(resolve, 1000);
    });
  }

  useEffect(() => {
    if (printType) {
      printDocument().then(() => {
        setPrintType(false);
      });
    }
  }, [printType]);

  const QRForService = () => (
    <QRCode size={150} value={`${siteUrl}items/${ticket_id}`} />
  );

  const printRows = [
    { name: t('printTicket.device'), value: `${ticket?.name}` },
    {
      name: t('printTicket.client'),
      value: `${ticket?.client_phone}  
      ${ticket?.client_first_name ? ticket?.client_first_name.toUpperCase() : ''}  
      ${ticket?.client_last_name ? ticket?.client_last_name.toUpperCase() : ''}
    `,
    },
    { name: t('editTicket.sn'), value: `${ticket?.device_sn}` },
    { name: t('editTicket.description'), value: `${ticket?.description}` },
    { name: t('printTicket.ticket_qr_code'), value: <QRForService /> },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`YWP | ${ticket?.name}`}</title>
      </Helmet>
      <div className={classes.noPrint}>
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
                <Tooltip title={t('back')}>
                  <IconButton onClick={() => navigate(`/${ticket?.point_id}`)}>
                    <KeyboardBackspaceIcon
                      color="inherit"
                      sx={{ display: 'block' }}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>

              <Grid item display="flex" alignItems="center">
                <Box sx={{ marginRight: 1 }}>
                  <Tooltip title={t('editTicket.print_qr_for_service')}>
                    <IconButton
                      disabled={!!printType}
                      onClick={() => {
                        setPrintType('qr');
                      }}
                    >
                      <QrCode2Icon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box>
                  <Tooltip
                    enterDelay={2000}
                    title={t('editTicket.set_status_paid')}
                  >
                    <Button
                      disabled={!!printType}
                      onClick={() => {
                        setPrintType('order');
                      }}
                      variant="contained"
                    >
                      {status === 'paid'
                        ? t('editTicket.print_guarantee')
                        : t('editTicket.print_repair_order')}
                    </Button>
                  </Tooltip>
                </Box>
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
            <Content
              ticket={ticket}
              setStatus={setStatus}
              refetchSavedInventoryItemsForCurrentTicket={
                refetchSavedInventoryItemsForCurrentTicket
              }
              savedInventoryItemsForCurrentTicket={
                savedInventoryItemsForCurrentTicket
              }
            />
          </Box>
        </Container>
      </div>
      <div className={classes.print}>
        {printType === 'order' ? (
          <div style={{ marginBottom: '20px' }}>
            <Typography
              fontSize={16}
              sx={{ padding: '20px 0 30px', textAlign: 'center' }}
            >
              {status === 'paid'
                ? t('printTicket.title_guarantee')
                : t('printTicket.title_order')}
            </Typography>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>
                  {company?.company_name}
                  <br />
                  {t('printTicket.PhoneNumber')}: {point?.phone_number}
                </caption>
                <TableBody>
                  {printRows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography fontSize={12} padding={2} sx={{}}>
              {t('printTicket.rule01')}
            </Typography>
          </div>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableBody>
              <TableRow key={'qr01'}>
                <TableCell component="th" scope="row">
                  {ticket?.ticket_id} <br />
                  <br />
                  {t('editTicket.description')}:<br />
                  {ticket?.description}
                </TableCell>
                <TableCell align="right">
                  <QRForService />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </div>
    </HelmetProvider>
  );
};

export default Ticket;

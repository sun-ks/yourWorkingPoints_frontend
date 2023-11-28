import React, { FC, useState, useEffect } from "react";
import { companyAPI } from "../../../../services/CompanyService";
import { ticketAPI } from "../../../../services/TicketService";
import { pointAPI } from "../../../../services/PointService"
import { makeStyles } from '@mui/styles';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Tooltip, 
  Container, 
  Box, 
  Button, 
  Typography, 
  Table,
  TableBody,
  TableCell,
  TableContainer, 
  TableRow,
  IconButton, 
  Grid, 
  Toolbar, 
  AppBar
} from '@mui/material';
  import QrCode2Icon from '@mui/icons-material/QrCode2';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import QRCode from 'react-qr-code';
import { useTranslation } from "react-i18next";

import Content from '../Content';
import { title } from "process";

const siteUrl = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme:any) => ({
  noPrint: {
    '@media print': {
      display: 'none',
    }
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

  const {t} = useTranslation();

  const { ticket_id, point_id }  = useParams();

  const {data: ticket } = ticketAPI.useGetTicketQuery(ticket_id);

  const [status, setStatus] = useState();

  const [printType, setPrintType] = useState<'qr' | 'order' | false>(false);

  const {data: company, error, isLoading} = companyAPI.useGetCompanyQuery('')
  
  const {data: point} = pointAPI.useGetPointByPointIdQuery(point_id)

  const classes = useStyles();

  useEffect(()=>{
    if (printType) {
      window.print();
      
      //It provide printType !== false when print dialog will be open in mobile Chrome
      setTimeout(() => {
        setPrintType(false)
      },2000)
    }
  }, [printType]);

  const QRForService = () => <QRCode size={150} value={`${siteUrl}items/${ticket_id}`} />

  const printRows = [
    {name: t('printTicket.device'), value:`${ticket?.name}`},
    {name: t('printTicket.client'), 
      value:`${ticket?.client_phone}  
      ${ticket?.client_first_name ? ticket?.client_first_name.toUpperCase() : ''}  
      ${ticket?.client_last_name ? ticket?.client_last_name.toUpperCase() : ''}
    `},
    {name: t('editTicket.sn'), value:`${ticket?.device_sn}`},
    {name: t('editTicket.description'), value:`${ticket?.description}`},
    {name: t('printTicket.ticket_qr_code'), value: <QRForService/>}
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
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item>
              <Tooltip title={t('back')}>
                <IconButton onClick={() => navigate(`/${ticket?.point_id}`)}>
                  <KeyboardBackspaceIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
            </Grid>
      
            <Grid item display="flex" alignItems="center"> 
              <Box sx={{marginRight: 1}}>
                <Tooltip title={t('editTicket.print_qr_for_service')}>
                  <IconButton onClick={() => {
                    setPrintType('qr');
                  }}>
                    <QrCode2Icon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip enterDelay={2000} title={t('editTicket.set_status_paid')}>
                  <Button onClick={()=>{ 
                    setPrintType('order');
                  }} 
                  variant="contained">
                    {(status === 'paid') ? t('editTicket.print_guarantee') : t('editTicket.print_repair_order')}
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
              padding: 1
            }}>
            <Content ticket={ticket} setStatus={setStatus} />
          </Box>
        </Container>
      </div>
      <div className={classes.print}>
        {printType === 'order' ? (
          <div style={{ marginBottom: '20px' }}>
            <Typography fontSize={16} sx={{ padding: '20px 0 30px', textAlign: 'center' }}>
              {(status === 'paid') ? t('printTicket.title_guarantee') : t('printTicket.title_order')}
            </Typography>
            <TableContainer >
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>
                  {company.company_name}<br/>
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
            
          </div>) : (
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableBody>
              <TableRow key={'qr01'}>
                <TableCell component="th" scope="row">
                  {ticket?.ticket_id} <br/><br/>
                  {t('editTicket.description')}:<br/>
                  {ticket?.description}
                </TableCell>
                <TableCell align="right"><QRForService/></TableCell>
              </TableRow>
            </TableBody>
          </Table>)}
      </div>
    </HelmetProvider>
  )
}

export default Ticket;




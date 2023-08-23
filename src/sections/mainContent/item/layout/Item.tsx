import React, { FC, useState, useEffect } from "react";
import { itemAPI } from "../../../../services/ItemService";
import { makeStyles } from '@mui/styles';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {Tooltip, 
  Container, 
  Box, 
  Button, 
  Typography, 
  Table,
  TableBody,
  TableCell,
  TableContainer, 
  TableRow, 
  Paper, 
  IconButton, 
  Grid, 
  Toolbar, 
  AppBar} from '@mui/material';
  import QrCode2Icon from '@mui/icons-material/QrCode2';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import QRCode from 'react-qr-code';

import Content from '../Content';

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

const Item: FC = () => {
  const navigate = useNavigate();

  const { point_id, ticket_id }  = useParams();

  const {data: ticket } = itemAPI.useGetItemQuery(ticket_id);

  const [status, setStatus] = useState();

  const [printType, setPrintType] = useState<'qr' | 'order' | false>(false);

  const classes = useStyles();

  useEffect(()=>{
    if (printType) {
      setPrintType(false)
      window.print();
    }
  },[printType]);

  const QRForService = () => <QRCode size={150} value={`${siteUrl}items/${point_id}/${ticket_id}`} />

  const rows = [
    {name: 'Ticket ID', value:`${ticket?.ticket_id}`},
    {name: 'Client', 
      value:`${ticket?.client_phone}  
      ${ticket?.client_first_name ? ticket?.client_first_name.toUpperCase() : ''}  
      ${ticket?.client_last_name ? ticket?.client_last_name.toUpperCase() : ''}
    `},
    {name: 'Device S/N', value:`${ticket?.device_sn}`},
    {name: 'Description', value:`${ticket?.description}`},
    {name: 'Ticket QR Code', value: <QRForService/>}
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
              <Tooltip title="Back">
                <IconButton onClick={() => navigate(-1)}>
                  <KeyboardBackspaceIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
            </Grid>
      
            <Grid item display="flex"> 
              <Box sx={{marginRight: 1}}>
                <Tooltip title="Print QR For Service">
                  <IconButton onClick={() => {
                    setPrintType('qr');
                  }}>
                    <QrCode2Icon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip enterDelay={2000} title="Set status 'paid' for printing guarantee">
                  <Button onClick={()=>{ 
                    setPrintType('order');
                  }} 
                  variant="contained">
                  {(status === 'paid') ? 'Print Guarantee' : 'Print Repair Order'}
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
              padding: 4
            }}>
            <Content point_id={point_id} ticket={ticket} ticket_id={ticket_id} setStatus={setStatus} />
          </Box>
        </Container>
      </div>
      <div className={classes.print}>
        {printType === 'order' ? (
          <div style={{ marginBottom: '20px' }}>
            <Typography fontSize={16} sx={{ padding: '20px 0 30px', textAlign: 'center' }}>
              {(status === 'paid') ? 'Guarantee' : 'Repair Order'}
            </Typography>
            <TableContainer >
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>Service information:</caption>
                <TableBody>
                  {rows.map((row) => (
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
          </div>):(
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableBody>
                <TableRow key={'qr01'}>
                  <TableCell component="th" scope="row">
                    {ticket?.ticket_id} <br/><br/>
                    Description:<br/>
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

export default Item;




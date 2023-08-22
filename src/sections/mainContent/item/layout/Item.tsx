import React, { FC } from "react";
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import {Tooltip, Container, Box, Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  useNavigate,
  useParams
} from 'react-router-dom';

import Content from '../Content';

const Item: FC = () => {
  const navigate = useNavigate();

  const { point_id }  = useParams();

  return (
    <HelmetProvider>
      <Helmet>
        <title>{'YWP | Create Ticket'}</title>
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
              <Tooltip title="Back">
                <IconButton onClick={() => navigate(-1)}>
                  <KeyboardBackspaceIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
            </Grid>
      
            <Grid item>
              <Button onClick={()=>{ window.print();}} variant="contained" sx={{ mr: 1 }}>
                Print Receipt
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
        <Container maxWidth="sm">
          <Box 
            sx={{
              padding: 4
            }}>
            <Content point_id={point_id} />
          </Box>
        </Container>
    </HelmetProvider>
  )
}

export default Item;
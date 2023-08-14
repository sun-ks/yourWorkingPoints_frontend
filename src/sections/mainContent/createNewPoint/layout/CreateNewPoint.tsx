import React, { FC } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  useNavigate,
} from 'react-router-dom';

import Content from '../Content';

const CreateNewPoint: FC = () => {
  const navigate = useNavigate();

    return (
      <>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Tooltip title="Back">
                  <IconButton onClick={() => navigate(-1)}>
                    <KeyboardBackspaceIcon color="inherit" sx={{ display: 'block' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        
        <Content/>
      </>
    )
}

export default CreateNewPoint;
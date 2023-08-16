import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

 const AlertDialog: FC<{
  handleClose: any;
  handleClickOk: any;
  isOpen: boolean; 
  title?:string; 
  description?: string;
}> = ({
  handleClose,
  handleClickOk,
  isOpen, 
  title='Are you sure?', 
  description
}) => {
 

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cansel</Button>
          <Button variant="contained" onClick={()=>{handleClose(); handleClickOk()}} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AlertDialog;
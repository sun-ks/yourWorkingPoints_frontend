import React, { FC, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog: FC<{
  handleClose: () => void;
  handleClickOk: () => void;
  isOpen: boolean;
  title?: string;
  description?: string;
  showSubmitBtn?: boolean;
}> = ({
  handleClose,
  handleClickOk,
  isOpen,
  title = 'Are you sure?',
  description,
  showSubmitBtn = true,
}) => {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        data-testid="alert-dialog"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cansel</Button>
          {showSubmitBtn && (
            <Button
              data-testid="alert-dialog-btn-ok"
              variant="contained"
              onClick={() => {
                handleClose();
                handleClickOk();
              }}
              autoFocus
            >
              Ok
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlertDialog;

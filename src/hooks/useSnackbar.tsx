import React, { useCallback, useState } from 'react';

import { SnackbarCloseReason } from '@mui/material';

import CustomSnackbar from '../components/CustomSnackbar';

interface SnackbarConfig {
  open: boolean;
  message: string;
  isError: boolean;
}

interface UseSnackbarResult {
  showSnackbar: (message: string, isError?: boolean, open?: boolean) => void;
  SnackbarComponent: () => React.JSX.Element;
}

export const useSnackbar = (): UseSnackbarResult => {
  const [snackbarConfig, setSnackbarConfig] = useState<SnackbarConfig>({
    open: false,
    message: '',
    isError: false,
  });

  const showSnackbar = useCallback(
    (message: string, isError: boolean = false, open: boolean = true) => {
      setSnackbarConfig({ open, message, isError });
    },
    [],
  );

  const handleClose = useCallback(
    (
      event: React.SyntheticEvent<any> | Event,
      reason?: SnackbarCloseReason,
    ) => {
      if (reason === 'clickaway') return;
      setSnackbarConfig((prev) => ({ ...prev, open: false }));
    },
    [],
  );

  const SnackbarComponent = (): React.JSX.Element => {
    return (
      <CustomSnackbar
        open={snackbarConfig.open}
        handleClose={handleClose}
        isError={snackbarConfig.isError}
        message={snackbarConfig.message}
      />
    );
  };

  return { showSnackbar, SnackbarComponent };
};

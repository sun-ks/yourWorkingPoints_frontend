import React from 'react';

import { Alert, Slide, Snackbar, SnackbarCloseReason } from '@mui/material';

interface CustomSnackbarProps {
    open: boolean;
    handleClose: (
        event: React.SyntheticEvent<any> | Event,
        reason?: SnackbarCloseReason,
    ) => void;
    isError: boolean;
    message: string;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
    open,
    handleClose,
    isError,
    message,
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            TransitionComponent={(props) => (
                <Slide {...props} direction="up" appear={false} />
            )}
        >
            <Alert
                onClose={handleClose}
                severity={isError ? 'error' : 'success'}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;

// icons
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

import React, { FC } from 'react';
import { forwardRef } from 'react';

// @mui
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

// Define the prop types for Iconify
interface IconifyProps extends BoxProps {
    icon: string | number;
    width?: number | string;
    height?: number | string;
    color?: string;
}

const Iconify = forwardRef(
    ({ icon, width = 20, sx, ...other }: IconifyProps, ref) => (
        <Box
            ref={ref}
            component={Icon}
            icon={icon}
            sx={{ width, height: width, ...sx }}
            {...other}
        />
    ),
);

export default Iconify;

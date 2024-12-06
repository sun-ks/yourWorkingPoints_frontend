import { useTranslation } from 'react-i18next';

import React, { useEffect, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import UserMenu from './UserMenu';

const lightColor = 'rgba(255, 255, 255, 0.7)';

interface HeaderProps {
    onDrawerToggle?: () => void;
    isAuthPage?: boolean;
}

export default function Header(props: HeaderProps) {
    const { onDrawerToggle, isAuthPage = false } = props;

    const { i18n, t } = useTranslation();

    const handleLanguageChange = (evt: any) => {
        const lang = evt.target.value;
        // setLanguage(lang);
        i18n.changeLanguage(lang);
    };

    return (
        <React.Fragment>
            <AppBar
                color="primary"
                position="sticky"
                elevation={0}
                data-testid="header"
            >
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        {!isAuthPage && (
                            <Grid
                                sx={{ display: { sm: 'none', xs: 'block' } }}
                                item
                            >
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={onDrawerToggle}
                                    edge="start"
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        )}

                        {isAuthPage && (
                            <Grid item sx={{ fontSize: 18, color: '#fff' }}>
                                {t('company_name')}
                            </Grid>
                        )}
                        <Grid item xs />
                        <Grid item>
                            <Link
                                href="https://buymeacoffee.com/storozhukud"
                                target="_blank"
                                variant="body2"
                                sx={{
                                    textDecoration: 'none',
                                    color: lightColor,
                                    '&:hover': {
                                        color: 'common.white',
                                    },
                                }}
                                rel="noopener noreferrer"
                            >
                                Donate For Us
                            </Link>
                        </Grid>

                        <Grid item>
                            <select
                                value={i18n.language}
                                onChange={handleLanguageChange}
                            >
                                <option value="en">en</option>
                                <option value="ua">ua</option>
                            </select>
                        </Grid>

                        {!isAuthPage && (
                            <>
                                <Grid item>
                                    <Tooltip title="Alerts • No alerts">
                                        <IconButton color="inherit">
                                            <NotificationsIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <UserMenu />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

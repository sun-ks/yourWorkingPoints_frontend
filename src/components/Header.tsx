import { useTranslation } from 'react-i18next';

import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import UserMenu from './UserMenu';

const lightColor = 'rgba(255, 255, 255, 0.7)';

interface HeaderProps {
  onDrawerToggle?: () => void;
  isAuthPage?: boolean;
}

const useStyles = makeStyles(() => ({
  languageSwitch: { fontSize: 14, color: lightColor },
  languageSwitchItem: {
    cursor: 'pointer',
    padding: '0 2px',
    '&:hover': {
      color: 'white',
    },
  },
  active: {
    fontWeight: 'bold !important',
    color: 'white',
  },
}));

export default function Header(props: HeaderProps) {
  const { onDrawerToggle, isAuthPage = false } = props;
  const classes = useStyles();

  const { i18n, t } = useTranslation();

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
              <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
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
            <Grid item xs sx={{ textAlign: 'left' }}>
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
                {t('make_contribution')}
                
              </Link>
            </Grid>
            <Grid item></Grid>

            <Grid item className={classes.languageSwitch}>
              <Typography
                className={`${classes.languageSwitchItem} ${i18n.language === 'en' ? classes.active : ''}`}
                component="span"
                variant="inherit"
                onClick={() => {
                  i18n.changeLanguage('en');
                }}
              >
                En
              </Typography>
              /
              <Typography
                className={`${classes.languageSwitchItem} ${i18n.language === 'ua' ? classes.active : ''}`}
                component="span"
                variant="inherit"
                onClick={() => {
                  i18n.changeLanguage('ua');
                }}
              >
                Ua
              </Typography>
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

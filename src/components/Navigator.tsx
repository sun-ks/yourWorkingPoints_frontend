import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import * as React from 'react';

import AlbumIcon from '@mui/icons-material/Album';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { pointAPI } from '../services/PointService';

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const { point_id } = useParams<{ point_id: string }>();
  const isPhone = useMediaQuery('(max-width:760px)');

  const { data: point, isLoading: isLoading_point } =
    pointAPI.useGetPointByPointIdQuery(point_id);

  const { t } = useTranslation();
  const theme = useTheme();

  const categories = [
    {
      children: [
        {
          id: t('all_tickets'),
          icon: <ListAltIcon />,
          active: false,
          avaliable: true,
          linkTo: '/tickets',
        },
        {
          id: t('company.company_settings'),
          icon: <SettingsApplicationsIcon />,
          active: false,
          avaliable: true,
          linkTo: '/settings',
        },
        {
          id: t('workers'),
          icon: <PeopleIcon />,
          active: false,
          avaliable: true,
          linkTo: '/workers',
        },
        {
          id: t('clients.clients_menu_item'),
          active: false,
          avaliable: true,
          linkTo: '/clients',
          icon: <Diversity1Icon />,
        },
        {
          id: t('warehouse.clients_menu_item'),
          active: false,
          avaliable: true,
          linkTo: '/warehouse',
          icon: <WarehouseIcon />,
        },
      ],
    },
    {
      children: [
        {
          id: t('contact_us'),
          active: false,
          avaliable: true,
          linkTo: '/contact-us',
          icon: <ContactSupportIcon />,
        },
      ],
    },
  ];

  return (
    <Drawer variant="permanent" {...other} data-testid="navigator">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            ...item,
            ...itemCategory,
            fontSize: 16,
            color: '#fff',
            pt: { xs: 1, sm: 2 },
            pb: { xs: 1, sm: 2 },
            textAlign: 'center',
          }}
        >
          {isPhone ? t('company_name_short') : t('company_name')}
        </Box>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <ListItem
            sx={{
              ...item,
              ...itemCategory,
              textDecoration: 'none',
            }}
          >
            <ListItemIcon>
              <AlbumIcon
                sx={{
                  color: point ? theme.palette.primary.main : undefined,
                }}
              />
            </ListItemIcon>
            <ListItemText sx={{ textDecoration: 'none' }}>
              {point && !isLoading_point ? (
                <>{point.name}</>
              ) : (
                <>{t('choise_point')}</>
              )}
            </ListItemText>
          </ListItem>
        </NavLink>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            '& > :first-child': { pt: { xs: 2, sm: 3 } },
            '& > :last-child': {
              mt: 'auto',
              background: 'transparent',
              '& .MuiListItemButton-gutters': {
                '&:hover, &:focus, &:active': {
                  background: 'transparent',
                  color: theme.palette.info.light,
                },
              },
            },
          }}
        >
          {categories.map(({ children }, i) => (
            <Box key={`main-menu-item-${i}`} sx={{ bgcolor: '#101F33' }}>
              {children.map(
                ({ id: childId, icon, active, avaliable, linkTo }) => (
                  <NavLink
                    key={childId}
                    to={linkTo}
                    style={{
                      textDecoration: 'none',
                      marginBottom: 0,
                      display: 'block',
                    }}
                  >
                    <ListItem
                      disablePadding
                      key={childId}
                      sx={{
                        opacity: !avaliable ? 0.2 : undefined,
                      }}
                    >
                      <ListItemButton selected={active} sx={item}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText>{childId}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </NavLink>
                ),
              )}
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
}

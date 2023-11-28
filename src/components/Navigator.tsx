import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AlbumIcon from '@mui/icons-material/Album';
import PeopleIcon from '@mui/icons-material/People';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { useTranslation } from "react-i18next";
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { selectAccessToken } from "../store/reducers/AuthSlice";
import {pointAPI} from "../services/PointService";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useTheme } from '@mui/material/styles';

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
  const { point_id } = useParams<{point_id: string}>();
  const accessToken = useSelector(selectAccessToken);
  const {data: point, error, isLoading: isLoading_point} = pointAPI.useGetPointByPointIdQuery(point_id)

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
          linkTo: '/tickets'
        },
        {
          id: t('company.company_settings'),
          icon: <SettingsApplicationsIcon />,
          active: false,
          avaliable: true,
          linkTo: '/settings'
        },
        {
          id: t('workers'),
          icon: <PeopleIcon />,
          active: false,
          avaliable: true,
          linkTo: '/workers'
        },
        { 
          id: t('clients.clients_menu_item'), 
          active: false, 
          avaliable: true, 
          linkTo: '/clients', 
          icon: <Diversity1Icon /> },
      ],
    },
    {
      text: t('will_be_soon'),
      children: [
        { id: t('statistics'), active: false, avaliable: false, linkTo: '/', icon: <PermMediaOutlinedIcon /> }
      ],
    },
  ];

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 16, color: '#fff' }}>
          {t('company_name')}
        </ListItem>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <ListItem sx={{ ...item, ...itemCategory, textDecoration: 'none' }}>
            <ListItemIcon>
              <AlbumIcon sx={{ color: point? theme.palette.primary.main : undefined }} />
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
  
        {categories.map(({ children, text }, i) => (
          <Box key={`main-menu-item-${i}`} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{text}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, avaliable, linkTo }) => (
              <NavLink key={childId} to={linkTo} style={{ textDecoration: 'none', }}>
                <ListItem disablePadding key={childId} 
                  sx={{
                    opacity: !avaliable ? 0.2 : undefined,
                  }}>
                  <ListItemButton selected={active} sx={item}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

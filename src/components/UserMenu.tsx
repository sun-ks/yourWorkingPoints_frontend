import { FC, useState } from "react";
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import {authSlice} from '../store/reducers/AuthSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/reducers/AuthSlice";

const UserMenu: FC<any> = () => {
  const {t} = useTranslation();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const {logOut} = authSlice.actions;

  const avatarLetter = currentUser?.userInfo?.email[0].toUpperCase();
  
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return <>
    <IconButton
      onClick={handleClick}
      size="small"
      sx={{ ml: 2 }}
      aria-controls={open ? 'account-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}>
      <Avatar sx={{ width: 32, height: 32 }}>{avatarLetter}</Avatar>
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          '& .MuiListItemIcon-root': {
            minWidth: '0 !important',
            marginRight: 2,
          },
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={()=>{
        dispatch(logOut(''));
        handleClose();
      }}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        {t('account.logout')}
      </MenuItem>
    </Menu>
  </>
}

export default UserMenu;
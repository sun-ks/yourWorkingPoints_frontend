import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import React, { FC, useState } from 'react';

import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

import { authSlice } from '../store/reducers/AuthSlice';
import { selectCurrentUser } from '../store/reducers/AuthSlice';

const UserMenu: FC<any> = () => {
    const { t } = useTranslation();
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const { logOut } = authSlice.actions;

    let avatarLetters = '=)';
    const userRole = currentUser?.userInfo.role;

    if (currentUser && currentUser.userInfo) {
        const avatarName = currentUser.userInfo.name
            ? currentUser.userInfo.name
            : currentUser.userInfo.email;
        avatarLetters = avatarName.slice(0, 2).toString().toUpperCase();
    }

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const UserRoleBlock = styled('div')<{ userRole?: string }>(
        ({ theme, userRole }) => ({
            position: 'absolute',
            bottom: '0px',
            color: 'white',
            fontSize: 8,
            background: userRole === 'employee' ? '#9d00da' : '#07c21b',
            padding: '1px 2px',
            borderRadius: '6px',
            letterSpacing: '2px',
            '&::first-letter': {
                textTransform: 'uppercase',
            },
        }),
    );

    return (
        <>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ width: 32, height: 32, fontSize: 16 }}>
                    {avatarLetters}
                </Avatar>
                <UserRoleBlock userRole={userRole}>{userRole}</UserRoleBlock>
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
                <MenuItem
                    onClick={() => {
                        dispatch(logOut());
                        handleClose();
                    }}
                    sx={{ fontSize: 14 }}
                >
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    {t('account.logout')}
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;

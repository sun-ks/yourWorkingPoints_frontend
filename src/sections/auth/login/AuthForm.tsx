import React, { FC } from "react";
import { useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import { useTranslation } from "react-i18next";

const AuthForm: FC<{type: string}> = ({type}) => {
  
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  const { t } = useTranslation();

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {type === 'sign_in' && <Link variant="subtitle2" underline="hover">
          {t('forgot_password')}
        </Link>}
      </Stack>
      
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        {t(`${type}.btn_sign_in`)}
      </LoadingButton>
    </>
  );
}

export default AuthForm;
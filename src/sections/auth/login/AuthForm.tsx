import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import React, { FC, useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Collapse,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import Iconify from '../../../components/iconify';
import StyledRouterLink from '../../../components/styled/RouterLink';
import { userAPI } from '../../../services/UserService';
import { authSlice } from '../../../store/reducers/AuthSlice';
import { AuthPageType, IUser } from '../../../types/index';

interface IFormInputs {
  password: string;
  email: string;
  company_name: string;
}

const AuthForm: FC<{ typePage: AuthPageType; token?: string }> = ({
  typePage,
  token,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputs>();

  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsActiveUser(true);
  }, [location.pathname]);

  const [isActiveUser, setIsActiveUser] = useState<any>(true);

  const [signUp, { error: error_sign_up }] =
    userAPI.useSignUpMutation();

  const [addWorker, { error: error_add_worker }] =
    userAPI.useAddWorkerMutation();

  const [login, { error: error_sign_in }] =
    userAPI.useLoginMutation();

  const [forgot, {data: forgotData, error: error_forgot }] =
    userAPI.useForgotMutation();

  const [
    newPassword,
    {  error: error_new_password },
  ] = userAPI.useNewPasswordMutation();

  const apiErrs: any = {
    sign_up: error_sign_up,
    sign_in: error_sign_in,
    forgot: error_forgot,
    new_password: error_new_password,
    add_worker: error_add_worker,
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { setCredentials } = authSlice.actions;

  const onSubmit: SubmitHandler<IFormInputs> = async (args) => {
    const apiCall =
      typePage === 'sign_up'
        ? signUp
        : typePage === 'forgot'
          ? forgot
          : typePage === 'new_password'
            ? newPassword
            : typePage === 'add_worker'
              ? addWorker
              : login;

    const params: any = { ...args };

    if (token) {
      params.token = token;
    }

    const { data } = (await apiCall(params)) as { data: IUser };

    if (data) {
      dispatch(setCredentials(data));
      
      const isActive = data.userInfo?.is_active;

      setIsActiveUser(isActive);

      if (typePage !== "forgot" && isActive) {
        navigate("/createFirstPoint");
      }
    }
  };

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {typePage === 'sign_up' && (
          <Controller
            control={control}
            name="company_name"
            rules={{
              required: 'Company Name is required',
            }}
            render={({ field }) => {
              return (
                <TextField
                  label="Company Name *"
                  {...field}
                  error={!!errors.company_name}
                  helperText={
                    errors.company_name?.message ||
                    t('printTicket.will_in_print')
                  }
                />
              );
            }}
          />
        )}

        {typePage !== 'new_password' && typePage !== 'add_worker' && (
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => {
              return (
                <TextField
                  label="Email *"
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              );
            }}
          />
        )}

        {typePage !== 'forgot' && (
          <Controller
            control={control}
            name="password"
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: 'Password must be at least 3 characters long',
              },
            }}
            render={({ field }) => (
              <TextField
                label="Password *"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...field}
                error={!!errors.password} // Add error prop to show error message
                helperText={errors.password?.message} // Add helperText prop to display error message
              />
            )}
          />
        )}
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        {typePage === 'sign_in' && (
          <StyledRouterLink to={`/auth/forgot`}>
            <Typography variant="body2">{t('forgot_password')}</Typography>
          </StyledRouterLink>
        )}
      </Stack>

      <Collapse in={!!apiErrs[typePage]} timeout={200}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Typography color="error">
            {!!apiErrs[typePage] && apiErrs[typePage]?.data?.message}
          </Typography>
        </Stack>
      </Collapse>

      {forgotData?.ok && typePage === 'forgot' && (
        <Typography sx={{ my: 2, textAlign: 'left' }} color="green">
          {forgotData.message}
        </Typography>
      )}

      {!isActiveUser && typePage === 'sign_in' && (
        <Typography sx={{ my: 2, textAlign: 'left' }} color="red">
          {t('company.deactivated_user')}
        </Typography>
      )}

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        {t(`${typePage}.btn_submit`)}
      </LoadingButton>
    </form>
  );
};

export default AuthForm;

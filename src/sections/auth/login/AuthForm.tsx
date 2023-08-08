import React, { FC, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, InputAdornment, TextField, Collapse, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import { useTranslation } from "react-i18next";
import StyledRouterLink from '../../../components/styled/RouterLink';
import {IUser, AuthPageType} from '../../../types/index';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import {userAPI} from '../../../services/UserService';
import {authSlice} from '../../../store/reducers/AuthSlice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

interface IFormInputs {
  password: string;
  email: string;
}

const AuthForm: FC<{typePage: AuthPageType, ressetPassToken?: string}> = ({typePage, ressetPassToken}) => {
  const { handleSubmit, control, reset:resetForm, clearErrors, formState, formState: { errors, isValid } } = useForm<IFormInputs>();

  const [showPassword, setShowPassword] = useState(false);

  const [signUp, {isError:isError_sign_up, error: error_sign_up}] = userAPI.useSignUpMutation();
  
  const [login, {isError:isError_sign_in, error:error_sign_in}] = userAPI.useLoginMutation();

  const [forgot, {isError:isError_forgot, error:error_forgot}] = userAPI.useForgotMutation();

  const [newPassword, {isError:isError_new_password, error:error_new_password}] = userAPI.useNewPasswordMutation();

  const apiErrs: any = {
    sign_up: error_sign_up, 
    sign_in: error_sign_in,
    forgot: error_forgot,
    new_password: error_new_password
  };

  const location = useLocation();

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const {setCredentials} = authSlice.actions;

  const onSubmit: SubmitHandler<{ email: string; password: string; }> = async (args) => {
    
    let apiCall = typePage  === 'sign_up' ? signUp 
      : typePage === 'forgot' ? forgot
      : typePage === 'new_password' ? newPassword
      : login;

    const params:any = {...args, token: ressetPassToken};

    const { data } = await apiCall(params) as { data: IUser };
    
    dispatch(setCredentials(data));

    if(data && typePage !== 'forgot') navigate('/dashboard/points')
  };

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Collapse in={!!apiErrs[typePage]} timeout={200}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Typography color="error">{!!apiErrs[typePage] && apiErrs[typePage]?.data}</Typography>
        </Stack>
      </Collapse>

      <Stack spacing={3}>
        {typePage !== 'new_password' && (
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => {
              return <TextField label="Email" 
                  {...field} 
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              }
            }
          />)}

        {typePage !== 'forgot' && (
          <Controller
            control={control}
            name="password"
            rules={{ 
              required: true, 
              minLength: {
                value: 3,
                message: "Password must be at least 3 characters long",
              }, 
            }}
            render={({ field }) =>
            <TextField 
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
              {...field}
              error={!!errors.password} // Add error prop to show error message
              helperText={errors.password?.message} // Add helperText prop to display error message
              />}
          /> 
        )}
      </Stack>
      
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {typePage === 'sign_in' && <StyledRouterLink to={`/auth/forgot`}>
          <Typography variant="body2">{t('forgot_password')}</Typography>
        </StyledRouterLink>}
      </Stack>
      
      <LoadingButton fullWidth size="large" type="submit" variant="contained" >
        {t(`${typePage}.btn_sign_in`)}
      </LoadingButton>
    </form>
  );
}

export default AuthForm;
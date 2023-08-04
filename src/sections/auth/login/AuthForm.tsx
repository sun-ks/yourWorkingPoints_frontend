import React, { FC } from "react";
import { useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import { useTranslation } from "react-i18next";
import StyledRouterLink from '../../../components/styled/RouterLink';
import {ICredentials, AuthPageType} from '../../../types/index';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import {userAPI} from '../../../services/UserService';
import {authSlice} from '../../../store/reducers/AuthSlice';
import { useDispatch } from 'react-redux'


interface IFormInputs {
  password: string;
  email: string;
}


const AuthForm: FC<{typePage: AuthPageType}> = ({typePage}) => {
  const { handleSubmit, control, reset, formState, formState: { errors, isValid } } = useForm<IFormInputs>({});

  const [showPassword, setShowPassword] = useState(false);

  const [login, {}] = userAPI.useLoginMutation();

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const {setCredentials} = authSlice.actions;

  const onSubmit: SubmitHandler<{ email: string; password: string; }> = async (q) => {
    const {data}  =  await login(q) as {data: ICredentials}
    console.log('user', data.accessToken)
        
    dispatch(setCredentials(data))
  };

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div onClick={()=>{}}></div>
      <Stack spacing={3}>
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
          render={({ field }) =>
            <TextField label="Email" 
              {...field} 
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          }
        />

        {typePage !== 'forgot' && (
          <Controller
            control={control}
            name="password"
            rules={{ 
              required: true, 
              minLength: {
                value: 3,
                message: "Password must be at least 5 characters long",
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
          {t('forgot_password')}
        </StyledRouterLink>}
      </Stack>
      
      <LoadingButton fullWidth size="large" type="submit" variant="contained" >
        {t(`${typePage}.btn_sign_in`)}
      </LoadingButton>
    </form>
  );
}

export default AuthForm;
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import React, { FC, useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useSnackbar } from '../../../hooks/useSnackbar';
import { clientAPI } from '../../../services/ClientService';
import { isOwner } from '../../../store/reducers/AuthSlice';

interface IFormInputs {
  email: string;
  name: string;
  phone: string;
  description: string;
}

const Content: FC = () => {
  const { t } = useTranslation();
  const isOwnerVal = useSelector(isOwner);

  const { client_id } = useParams();

  const {
    data: client,
    error: user_Error,
    isLoading: user_isLoading,
  } = clientAPI.useGetClientByClientIdQuery(client_id);

  const [
    updateClient,
    {
      isError: isError_updateWorker,
      isLoading: isLoading_updateWorker,
      error: error_updateWorker,
    },
  ] = clientAPI.useUpdateClientMutation();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      description: '',
    },
  });

  const { showSnackbar, SnackbarComponent } = useSnackbar();

  useEffect(() => {
    if (client) {
      setValue('email', client.email);
      setValue('name', client.name);
      setValue('phone', client.phone);
      setValue('description', client.description);
    }
  }, [client]);

  const dataFromError: any =
    error_updateWorker && 'data' in error_updateWorker
      ? error_updateWorker?.data
      : undefined;

  const onSubmit: SubmitHandler<IFormInputs> = async (args) => {
    showSnackbar('', false, false);

    try {
      await updateClient({
        client_id: client.client_id,
        ...args,
      }).unwrap();

      showSnackbar(t('update_successful'), false);
    } catch (err: any) {
      const dataFromError = err?.data || 'An error occurred';
      showSnackbar(dataFromError, true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom margin={4}>
        {t('clients.edit_client')}
      </Typography>

      <Stack spacing={3}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => {
            return (
              <TextField
                label={`${t('clients.email')}`}
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="name"
          render={({ field }) => {
            return (
              <TextField
                label={`${t('clients.name')}`}
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="phone"
          rules={{
            required: 'Phone is required',
            minLength: {
              value: 9,
              message: 'Phone must have at least 9 digits',
            },
          }}
          render={({ field }) => {
            return (
              <TextField
                label={`${t('clients.phone')} *`}
                sx={{ mb: 5 }}
                {...field}
                type="number"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="description"
          render={({ field }) => {
            return (
              <TextField
                label={t('clients.description')}
                multiline
                variant="outlined"
                size="small"
                rows={4}
                {...field}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            );
          }}
        />

        <SnackbarComponent />

        <LoadingButton
          title={!isOwnerVal ? t('only_for_owner') : ''}
          disabled={!isOwnerVal}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {t('worker.save')}
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default Content;

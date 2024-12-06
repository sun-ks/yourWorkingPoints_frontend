import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import React, { FC, useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { userAPI } from '../../../services/UserService';
import { isOwner } from '../../../store/reducers/AuthSlice';

interface IFormInputs {
  is_active: any;
  email: string;
  name: string;
  phone: string;
  description: string;
}

const Content: FC = () => {
  const { t } = useTranslation();
  const isOwnerVal = useSelector(isOwner);

  const { user_id } = useParams();

  const { data: user } = userAPI.useGetUserByIdQuery(user_id);

  const [updateWorker, { error: error_updateWorker }] =
    userAPI.useUpdateWorkerMutation();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      is_active: true,
      email: '',
      name: '',
      phone: '',
      description: '',
    },
  });

  useEffect(() => {
    if (user) {
      setValue('is_active', user.is_active);
      setValue('email', user.email);
      setValue('name', user.name);
      setValue('phone', user.phone);
      setValue('description', user.description);
    }
  }, [user]);

  const dataFromError: any =
    error_updateWorker && 'data' in error_updateWorker
      ? error_updateWorker?.data
      : undefined;

  const [showSuccessesBlock, setshowSuccessesBlock] = useState(false);

  const onSubmit: SubmitHandler<IFormInputs> = async (args) => {
    const { data } = (await updateWorker({
      user_id: user.user_id,
      ...args,
      is_active: JSON.parse(args.is_active),
    })) as { data: any };

    if (data) {
      setshowSuccessesBlock(true);

      setTimeout(() => {
        setshowSuccessesBlock(false);
      }, 3000);
    }
  };

  const statuses = [
    {
      value: true,
      text: t('usersColumns.is_active_true'),
    },
    {
      value: false,
      text: t('usersColumns.is_active_false'),
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom margin={4}>
        {t('worker.edit_worker')} ({user?.role})
      </Typography>

      <Stack spacing={3}>
        {user && user.role !== 'owner' && (
          <Controller
            control={control}
            name="is_active"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  sx={{ width: '100%' }}
                  id="outlined-select-currency-native"
                  select
                  label={t('usersColumns.status')}
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                >
                  {statuses.map((option, i) => (
                    <option
                      key={`key-isactive-${i}`}
                      value={option.value.toString()}
                    >
                      {option.text}
                    </option>
                  ))}
                </TextField>
              );
            }}
          />
        )}

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
                label={`${t('worker.email')} *`}
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
          rules={{
            required: 'Name is required',
          }}
          render={({ field }) => {
            return (
              <TextField
                label={`${t('worker.name')} *`}
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
                label={`${t('worker.phone')} *`}
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
                label={t('worker.description')}
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

        {dataFromError && (
          <Typography color="error">{dataFromError}</Typography>
        )}

        {showSuccessesBlock && (
          <Typography color="green">{t('update_successful')}</Typography>
        )}

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

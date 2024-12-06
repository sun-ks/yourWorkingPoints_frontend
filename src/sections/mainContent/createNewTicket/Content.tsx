import { Autocomplete } from '@material-ui/lab';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import React, { FC, useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { clientAPI } from '../../../services/ClientService';
import { pointAPI } from '../../../services/PointService';
import { ticketAPI } from '../../../services/TicketService';
import { IItem } from '../../../types/IItem';

const Content: FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { data: points } = pointAPI.useGetPointsQuery('');

  const { data: clients } = clientAPI.useGetClientsByCompanyIdQuery('');

  const [
    createTicket,
    { isError, isLoading: isLoadingCreateTicket, error: errorCreatePoint },
  ] = ticketAPI.useCreateTicketMutation();

  const [createClient] = clientAPI.useCreateClientMutation();

  const dataFromError: any =
    errorCreatePoint && 'data' in errorCreatePoint
      ? errorCreatePoint?.data
      : undefined;

  const { point_id } = useParams();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IItem>({
    defaultValues: {
      point_id: point_id ? point_id : '',
    },
  });

  const onSubmit: SubmitHandler<IItem> = async (args) => {
    const {
      client_first_name,
      client_phone,
      email,
      name,
      description,
      device_sn,
      paid,
      point_id,
    } = args;

    let existingClient;
    let client_id;

    if (clients && clients.length > 0) {
      existingClient = clients.find((item: any) => {
        return item.phone === client_phone;
      });
    }

    if (existingClient) {
      client_id = existingClient.client_id;
    } else {
      const { data } = (await createClient({
        client_first_name,
        client_phone: client_phone,
        email,
        name: client_first_name,
      })) as { data: any };

      client_id = data.client_id;
    }

    const { data } = (await createTicket({
      description,
      device_sn,
      paid,
      point_id,
      client_id,
      name,
    })) as { data: any };

    navigate(`/items/${data.ticket_id}`);
  };

  const clientPhone = watch('client_phone');

  useEffect(() => {
    if (!point_id && points) {
      setValue('point_id', points[0].point_id);
    }
  }, [points]);

  const [clientsPhones, setClientsPhones] = useState<string[]>([]);

  useEffect(() => {
    if (clients && clients.length > 0) {
      const clientsPhones = clients.map((item: any) => item.phone);

      setClientsPhones(clientsPhones);
    }
  }, [clients]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom margin={4}>
        {t('createTicket.head_line')}
      </Typography>

      <Stack spacing={3} sx={{ textAlign: 'left' }}>
        <Controller
          control={control}
          name="point_id"
          render={({ field }) => {
            return (
              <TextField
                {...field}
                id="outlined-select-currency-native2"
                select
                label={t('createTicket.select_point')}
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
              >
                {points && points.length > 0 ? (
                  points.map((point) => (
                    <option key={point.point_id} value={point.point_id}>
                      {point.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    {t('createTicket.no_points_available')}
                  </option>
                )}
              </TextField>
            );
          }}
        />

        <Controller
          control={control}
          name="name"
          rules={{
            required: 'Divice Name is required',
          }}
          render={({ field }) => {
            return (
              <TextField
                label={`${t('createTicket.device_name')} *`}
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="device_sn"
          rules={{
            required: 'Device S/N (imei) is required',
          }}
          render={({ field }) => {
            return (
              <TextField
                label={`${t('createTicket.device_sn')} *`}
                {...field}
                error={!!errors.device_sn}
                helperText={errors.device_sn?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="description"
          rules={{
            required: 'Description is required',
          }}
          render={({ field }) => {
            return (
              <TextField
                label={`${t('createTicket.description')} *`}
                multiline
                rows={4}
                {...field}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="paid"
          defaultValue={0}
          rules={{
            required: 'First payment is required',
            min: {
              value: 0,
              message: 'The value must be at least 0',
            },
          }}
          render={({ field }) => {
            return (
              <TextField
                label={`${t('createTicket.first_payment')} *`}
                {...field}
                inputProps={{ min: 0 }}
                type="number"
                error={!!errors.paid}
                helperText={errors.paid?.message}
              />
            );
          }}
        />

        <Controller
          name="client_phone"
          control={control}
          rules={{
            required: 'Client Phone is required',
            minLength: {
              value: 9,
              message: 'Client Phone must have at least 9 digits',
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Autocomplete
              freeSolo
              options={clientsPhones}
              getOptionLabel={(option) => option}
              value={field.value || ''}
              onChange={(e, value) => field.onChange(value)}
              onInputChange={(_, value) => field.onChange(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`${t('createTicket.client_phone')} *`}
                  placeholder="Your placeholder"
                  error={!!error}
                  helperText={
                    error?.message ||
                    (clientsPhones.includes(field.value)
                      ? t('createTicket.client_already_exist')
                      : '')
                  }
                />
              )}
            />
          )}
        />

        {!clientsPhones.includes(clientPhone) && (
          <>
            <Controller
              control={control}
              name="email"
              rules={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => {
                return (
                  <TextField
                    label={`${t('createTicket.client_email')}`}
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="client_first_name"
              render={({ field }) => {
                return (
                  <TextField
                    label={t('createTicket.client_name')}
                    {...field}
                    error={!!errors.client_first_name}
                    helperText={errors.client_first_name?.message}
                  />
                );
              }}
            />
          </>
        )}

        {isError && <Typography color="error">{dataFromError}</Typography>}

        <LoadingButton
          disabled={isLoadingCreateTicket}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {t('createTicket.btn_create')}
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default Content;

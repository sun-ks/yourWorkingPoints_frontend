import dayjs from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import React, { FC, useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import AlertDialog from '../../../components/AlertDialog/';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { pointAPI } from '../../../services/PointService';
import { ticketAPI } from '../../../services/TicketService';
import { userAPI } from '../../../services/UserService';
import { selectCurrentUser } from '../../../store/reducers/AuthSlice';
import { IItem } from '../../../types/IItem';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Content: FC<{
  ticket?: IItem;
  setStatus: any;
}> = ({ ticket, setStatus }) => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const currentUser = useSelector(selectCurrentUser);

  const isOwner = currentUser?.userInfo.role === 'owner';

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [openDeleteAlertDialog, setOpenDeleteAlertDialog] = useState(false);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const { data: points } = pointAPI.useGetPointsQuery('');

  const { data: workers } = userAPI.useGetAllUsersQuery('');

  const [updateTicket, { isError, error: errorUpdateTicket }] =
    ticketAPI.useUpdateTicketMutation();

  const [deleteTicket] = ticketAPI.useDeleteTicketMutation();

  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IItem>({
    defaultValues: {
      last_part_payment: 0,
      note: '',
      point_id: '',
      assigned_at: null,
      guarantee_till: null,
    },
  });

  const status = watch('status');

  setStatus(status);

  useEffect(() => {
    if (ticket) {
      setValue('status', ticket.status);
      setValue('priority', ticket.priority);
      setValue('note', ticket.note);
      setValue('last_part_payment', ticket.last_part_payment);
      setValue('point_id', ticket.point_id);
      setValue('assigned_at', ticket.assigned_at);
      setValue('guarantee_till', ticket.guarantee_till);
    }
  }, [ticket]);
  useEffect(() => {
    if (status !== 'paid') {
      setValue('guarantee_till', null);
    }
  }, [status]);

  const dataFromError: any =
    errorUpdateTicket && 'data' in errorUpdateTicket
      ? errorUpdateTicket?.data
      : undefined;

  const onSubmit: SubmitHandler<IItem> = async (args) => {
    showSnackbar('', false, false);

    if (args.assigned_at === 'None') args.assigned_at = null;

    try {
      await updateTicket({
        ...args,
        ticket_id: ticket?.ticket_id,
      }).unwrap();

      showSnackbar(t('update_successful'), false);
    } catch (err: any) {
      const dataFromError = err?.data || 'An error occurred';
      showSnackbar(dataFromError, true);
    }
  };

  let workersList = [
    {
      user_id: null,
      name: 'None',
    },
  ];

  if (workers) workersList = [...workersList, ...workers];

  const handleDeleteTicket = async () => {
    setOpenDeleteAlertDialog(false);
    await deleteTicket(ticket?.ticket_id).unwrap();
    navigate(`/tickets`);
  };

  const statuses = [
    {
      value: 'inbox',
      text: t('statuses.inbox'),
    },
    {
      value: 'in progress',
      text: t('statuses.in_progress'),
    },
    {
      value: 'ask client',
      text: t('statuses.ask_client'),
    },
    {
      value: 'done',
      text: t('statuses.done'),
    },
    {
      value: 'paid',
      text: t('statuses.paid'),
    },
    {
      value: 'cancelled',
      text: t('statuses.cancelled'),
    },
    {
      value: 'hold',
      text: t('statuses.hold'),
    },
  ];

  const priorities = [
    {
      value: 'low',
      text: t('priorities.low'),
    },
    {
      value: 'high',
      text: t('priorities.high'),
    },
    {
      value: 'medium',
      text: t('priorities.medium'),
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom margin={4}>
        {t('editTicket.title')}
      </Typography>

      <Stack spacing={3} sx={{ textAlign: 'left' }}>
        <Grid container spacing={0}>
          <Grid xs={12} sm={7}>
            <Item sx={{ textAlign: 'left', boxShadow: 0 }}>
              {ticket && (
                <Typography fontSize={13}>
                  {t('editTicket.ticket_created')}:{' '}
                  {new Date(ticket.created).toLocaleDateString()}
                  <br />
                  {t('editTicket.client_phone')}: {ticket.client_phone}
                  <br />
                  {t('editTicket.device_name')}: {ticket.name}
                  <br />
                  <br />
                  {t('editTicket.sn')}: {ticket.device_sn}
                  <br />
                  {t('editTicket.client_email')}: {ticket?.client_email}
                  <br />
                  {t('editTicket.client_name')} : {ticket?.client_name}
                  <br />
                  <br />
                  {t('editTicket.first_payment')}: {ticket.paid}
                  <br />
                  {t('editTicket.description')}: {ticket.description}
                  <br />
                </Typography>
              )}
            </Item>
          </Grid>
          <Grid xs={12} sm={5}>
            <Item sx={{ textAlign: 'left', boxShadow: 0 }}>
              <Box sx={{ marginBottom: 2 }}>
                <Controller
                  control={control}
                  name="point_id"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        sx={{ width: '100%' }}
                        id="outlined-select-currency-native2"
                        select
                        label={t('editTicket.current_point')}
                        variant="outlined"
                        size="small"
                        SelectProps={{
                          native: true,
                        }}
                      >
                        {points &&
                          points.map((point) => (
                            <option key={point.point_id} value={point.point_id}>
                              {point.name}
                            </option>
                          ))}
                      </TextField>
                    );
                  }}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        sx={{ width: '100%' }}
                        id="outlined-select-currency-native"
                        select
                        label={t('editTicket.ticket_status')}
                        variant="outlined"
                        size="small"
                        SelectProps={{
                          native: true,
                        }}
                      >
                        {statuses.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </TextField>
                    );
                  }}
                />
              </Box>

              {status === 'paid' && (
                <Box sx={{ marginBottom: 2 }}>
                  <Controller
                    name="guarantee_till"
                    control={control}
                    defaultValue={null} // Set the default value here in the format "YYYY-MM-DD"
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="pt-br"
                      >
                        <DatePicker
                          label={t('editTicket.guarantee_till')}
                          format="DD-MM-YYYY"
                          value={dayjs(value || null)} // Use the value here to bind the field's value
                          onChange={(event) => onChange(event)}
                          slotProps={{
                            textField: {
                              size: 'small',
                              error: !!error,
                              helperText: error?.message,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Box>
              )}

              <Box sx={{ marginBottom: 2 }}>
                <Controller
                  control={control}
                  name="priority"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        sx={{ width: '100%' }}
                        id="outlined-select-currency-native2"
                        select
                        label={t('editTicket.ticket_priority')}
                        variant="outlined"
                        size="small"
                        SelectProps={{
                          native: true,
                        }}
                      >
                        {priorities.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </TextField>
                    );
                  }}
                />
              </Box>

              <Box sx={{ marginBottom: 2 }}>
                <Controller
                  control={control}
                  name="assigned_at"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        sx={{ width: '100%' }}
                        id="outlined-select-currency-native2"
                        select
                        label={t('editTicket.assigned_at')}
                        variant="outlined"
                        size="small"
                        SelectProps={{
                          native: true,
                        }}
                      >
                        {workersList.map((option: any) => (
                          <option key={option.user_id} value={option.user_id}>
                            {option.name ? option.name : option.email}
                          </option>
                        ))}
                      </TextField>
                    );
                  }}
                />
              </Box>
            </Item>
          </Grid>
        </Grid>

        <Controller
          control={control}
          name="note"
          render={({ field }) => {
            return (
              <TextField
                label={t('editTicket.note')}
                multiline
                variant="outlined"
                size="small"
                rows={4}
                {...field}
                error={!!errors.note}
                helperText={errors.note?.message}
              />
            );
          }}
        />
        <Box>
          <Controller
            control={control}
            name="last_part_payment"
            render={({ field }) => {
              return (
                <TextField
                  label={t('editTicket.finish_payment')}
                  {...field}
                  type="number"
                  variant="outlined"
                  size="small"
                  error={!!errors.last_part_payment}
                  helperText={errors.last_part_payment?.message}
                />
              );
            }}
          />
        </Box>

        {isError && <Typography color="error">{dataFromError}</Typography>}

        <SnackbarComponent />

        {isOwner && (
          <>
            <Button
              color="error"
              size="small"
              variant="text"
              onClick={() => {
                setOpenDeleteAlertDialog(true);
              }}
            >
              {t('editTicket.delete_ticket')}
            </Button>
            <AlertDialog
              handleClose={() => setOpenDeleteAlertDialog(false)}
              handleClickOk={handleDeleteTicket}
              isOpen={openDeleteAlertDialog}
              title={t('editTicket.alert_delete_title')}
            />
          </>
        )}

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          {t('editTicket.update_ticket')}
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default Content;

import {
    Box,
    Grid,
    TextField,
    Typography,
  } from '@mui/material';
  import { IItem } from '../../../types/IItem';
  import { IPoint } from '../../../types/IPoint';
import {
  Control,
  Controller,
} from 'react-hook-form';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import dayjs from 'dayjs';
  import React, { FC } from 'react';
  export const TopFields:FC<{
    t: (key: string) => string;
    control: Control<IItem>;
    ticket?: IItem,
    status: string;
    ticketStatuses: { value: string; text: string }[];
    ticketPriorities: { value: string; text: string }[];
    points?: IPoint[];
    workersList: { user_id: string|null; name?: string }[];
    Item: any
  }> = ({
    t,
    control,
    ticket,
    status,
    ticketStatuses,
    ticketPriorities,
    points,
    workersList,
    Item,
  }) => {
    return (
      <Grid container spacing={0}>
        <Grid xs={12} sm={7}>
          <Item sx={{ textAlign: 'left', boxShadow: 0 }}>
            {ticket && (
              <Typography fontSize={13}>
                {t('editTicket.ticket_created')}: {new Date(ticket.created).toLocaleDateString()}
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
                {t('editTicket.client_name')}: {ticket?.client_name}
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
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    select
                    label={t('editTicket.current_point')}
                    variant="outlined"
                    size="small"
                    SelectProps={{ native: true }}
                  >
                    {points?.map((point) => (
                      <option key={point.point_id} value={point.point_id}>
                        {point.name}
                      </option>
                    ))}
                  </TextField>
                )}
              />
            </Box>
  
            <Box sx={{ marginBottom: 2 }}>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    select
                    label={t('editTicket.ticket_status')}
                    variant="outlined"
                    size="small"
                    SelectProps={{ native: true }}
                  >
                    {ticketStatuses.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </TextField>
                )}
              />
            </Box>
  
            {status === 'paid' && (
              <Box sx={{ marginBottom: 2 }}>
                <Controller
                  name="guarantee_till"
                  control={control}
                  defaultValue={null}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                      <DatePicker
                        label={t('editTicket.guarantee_till')}
                        format="DD-MM-YYYY"
                        value={dayjs(value || null)}
                        onChange={onChange}
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
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    select
                    label={t('editTicket.ticket_priority')}
                    variant="outlined"
                    size="small"
                    SelectProps={{ native: true }}
                  >
                    {ticketPriorities.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </TextField>
                )}
              />
            </Box>
  
            <Box sx={{ marginBottom: 2 }}>
              <Controller
                control={control}
                name="assigned_at"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    select
                    label={t('editTicket.assigned_at')}
                    variant="outlined"
                    size="small"
                    SelectProps={{ native: true }}
                  >
                    {workersList.map((option: any) => (
                      <option key={option.user_id} value={option.user_id}>
                        {option.name || option.email}
                      </option>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Item>
        </Grid>
      </Grid>
    );
  };
  
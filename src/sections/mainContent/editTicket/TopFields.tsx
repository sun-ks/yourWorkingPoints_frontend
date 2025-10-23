import dayjs from 'dayjs';
import { Control, Controller } from 'react-hook-form';

import React, { FC } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { IItem } from '../../../types/IItem';
import { IPoint } from '../../../types/IPoint';
import { ChangesTable } from './ChangesTable';

export const TopFields: FC<{
  t: (key: string) => string;
  control: Control<IItem>;
  ticket?: IItem;
  status: string;
  ticketStatuses: { value: string; text: string }[];
  ticketPriorities: { value: string; text: string }[];
  points?: IPoint[];
  workersList: { user_id: string | null; name?: string }[];
  Item: any;
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
    <>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, sm: 7 }}>
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
        <Grid size={{ xs: 12, sm: 5 }}>
          <Item sx={{ textAlign: 'left', boxShadow: 0, padding: 0 }}>
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
        <>
          {ticket && ticket.ticket_changes && ticket.ticket_changes.length && (
            <Item
              sx={{
                textAlign: 'left',
                boxShadow: 0,
                width: '100%',
                paddingTop: '0 !important',
                paddingBottom: '0 !important',
              }}
            >
              <Accordion
                sx={{
                  marginBottom: 0,
                  borderRadius: '0 !important',
                  boxShadow: 0,
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ padding: '0 3px 0 0 !important' }}
                >
                  <Typography
                    fontSize={14}
                    sx={{
                      textAlign: 'right !important',
                      width: '100%',
                    }}
                  >
                    <Button variant="text">
                      {t('editTicket.ticket_changes_title')}
                    </Button>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '0' }}>
                  {[...ticket.ticket_changes].reverse().map((change, index) => {
                    if (
                      change.assigned_at === null &&
                      change.status === null &&
                      change.priority === null
                    )
                      return null;

                    return (
                      <ChangesTable
                        change={change}
                        t={t}
                        key={`${index}_ticket_change`}
                        ticketStatuses={ticketStatuses}
                        ticketPriorities={ticketPriorities}
                        isLast={
                          index === (ticket.ticket_changes?.length ?? 0) - 1
                        }
                      />
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </Item>
          )}
        </>
      </Grid>
    </>
  );
};

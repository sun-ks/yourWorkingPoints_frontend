import { Control, Controller, FieldErrors } from 'react-hook-form';

import { FC } from 'react';

import { Box, Grid, TextField } from '@mui/material';

import { IItem } from '../../../types/IItem';

type Props = {
  control: Control<IItem>;
  errors: FieldErrors<IItem>;
  t: (key: string) => string;
};

export const TicketNoteAndPaymentFields: FC<Props> = ({
  control,
  errors,
  t,
}) => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <TextField
                fullWidth
                label={t('editTicket.note')}
                multiline
                variant="outlined"
                size="small"
                rows={4}
                {...field}
                error={!!errors.note}
                helperText={errors.note?.message}
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={4} sm={4}>
          <Box>
            <Controller
              control={control}
              name="last_part_payment"
              render={({ field }) => (
                <TextField
                  label={t('editTicket.finish_payment')}
                  {...field}
                  type="number"
                  variant="outlined"
                  size="small"
                  error={!!errors.last_part_payment}
                  helperText={errors.last_part_payment?.message}
                  inputProps={{ min: 0 }}
                />
              )}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

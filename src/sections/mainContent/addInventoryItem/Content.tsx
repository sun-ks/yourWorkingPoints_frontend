import dayjs from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import React, { FC, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useSnackbar } from '../../../hooks/useSnackbar';
import { pointAPI } from '../../../services/PointService';
import { warehouseAPI } from '../../../services/WarehouseService';
import { IWarehouseItem } from '../../../types/IWarehouse';

const Content: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: points } = pointAPI.useGetPointsQuery('');

  const [warehouseItem, { isLoading }] =
    warehouseAPI.useCreateWarehouseItemMutation();

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<IWarehouseItem>();

  const { showSnackbar, SnackbarComponent } = useSnackbar();

  useEffect(() => {
    if (points && points.length > 0) {
      setValue('point_id', points[0].point_id);
      console.log('points', points);
    }
  }, [points]);

  const onSubmit: SubmitHandler<IWarehouseItem> = async (args) => {
    showSnackbar('', false, false);

    try {
      await warehouseItem(args).unwrap();

      showSnackbar(t('form.added_successfully'), false);
      navigate(`/warehouse`);
    } catch (err: any) {
      const dataFromError = err?.data || 'An error occurred';
      showSnackbar(dataFromError, true);
    }
  };

  const categories = [{ id: undefined, name: `${t('form.default_label')}` }];
  const suppliers = [{ id: undefined, name: `${t('form.default_label')}` }];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom margin={4}>
        {t('warehouse.title')}
      </Typography>

      <Stack spacing={3}>
        <Controller
          control={control}
          name="name"
          rules={{
            required: `${t('form.required')}`,
          }}
          render={({ field }) => {
            return (
              <TextField
                label={`${t('warehouse.field_name')} *`}
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="point_id"
          defaultValue={undefined}
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
                  <option value={undefined}>
                    {t('createTicket.no_points_available')}
                  </option>
                )}
              </TextField>
            );
          }}
        />
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="supplier_id"
              defaultValue={suppliers[0].id}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    sx={{ paddingRight: 1, display: 'flex' }}
                    id="outlined-select-currency-native2"
                    select
                    label={t('warehouse.supplier')}
                    variant="outlined"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {suppliers &&
                      suppliers.map((item) => (
                        <option key={item.id + 's'} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </TextField>
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="category_id"
              defaultValue={categories[0].id}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    sx={{ paddingLeft: 1, display: 'flex' }}
                    id="outlined-select-currency-native2"
                    select
                    label={t('warehouse.category')}
                    variant="outlined"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {categories &&
                      categories.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </TextField>
                );
              }}
            />
          </Grid>
        </Grid>
        <Controller
          control={control}
          name="serial_number"
          rules={{
            required: `${t('form.required')}`,
          }}
          render={({ field }) => {
            return (
              <TextField
                label={`${t('warehouse.fild_serial_number')} *`}
                {...field}
                error={!!errors.serial_number}
                helperText={errors.serial_number?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field }) => {
            return (
              <TextField
                label={`${t('warehouse.phone')} `}
                {...field}
                error={!!errors.serial_number}
                helperText={errors.serial_number?.message}
              />
            );
          }}
        />

        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="warranty"
              render={({ field }) => {
                return (
                  <TextField
                    sx={{ paddingRight: 1, display: 'flex' }}
                    type="number"
                    inputProps={{ min: 0 }}
                    label={`${t('warehouse.field_warranty')} `}
                    {...field}
                    error={!!errors.warranty}
                    helperText={errors.warranty?.message}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="received_date"
              control={control}
              defaultValue={undefined}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <DatePicker
                    label={t('warehouse.received_date')}
                    sx={{ paddingLeft: 1, display: 'flex' }}
                    format="DD-MM-YYYY"
                    value={dayjs(value || null)}
                    onChange={(event) => onChange(event)}
                    slotProps={{
                      textField: {
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
        </Grid>

        <Controller
          control={control}
          name="quantity"
          rules={{
            required: `${t('form.required')}`,
          }}
          render={({ field }) => {
            return (
              <TextField
                type="number"
                label={`${t('warehouse.field_quantity')} *`}
                {...field}
                inputProps={{ min: 1 }}
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
              />
            );
          }}
        />

        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="purchase_price"
              rules={{
                required: `${t('form.required')}`,
              }}
              render={({ field }) => {
                return (
                  <TextField
                    sx={{ paddingRight: 1, display: 'flex' }}
                    inputProps={{ min: 0 }}
                    type="number"
                    label={`${t('warehouse.fild_purchase_price')} *`}
                    {...field}
                    error={!!errors.purchase_price}
                    helperText={errors.purchase_price?.message}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="retail_price"
              render={({ field }) => {
                return (
                  <TextField
                    sx={{ paddingLeft: 1, display: 'flex' }}
                    inputProps={{ min: 0 }}
                    type="number"
                    label={`${t('warehouse.field_retail_price')} `}
                    {...field}
                    error={!!errors.retail_price}
                    helperText={errors.retail_price?.message}
                  />
                );
              }}
            />
          </Grid>
        </Grid>

        <Controller
          control={control}
          name="description"
          render={({ field }) => {
            return (
              <TextField
                label={t('warehouse.description')}
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
          disabled={isLoading}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {t('warehouse.btn_add')}
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default Content;

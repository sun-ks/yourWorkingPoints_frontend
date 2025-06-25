import dayjs from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import React, { FC, useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import AlertDialog from '../../../components/AlertDialog/';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { pointAPI } from '../../../services/PointService';
import { warehouseAPI } from '../../../services/WarehouseService';
import { selectCurrentUser } from '../../../store/reducers/AuthSlice';
import { IWarehouseItem } from '../../../types/IWarehouse';

interface ContentProps {
  data: IWarehouseItem;
}

const Content: FC<ContentProps> = ({ data }) => {
  const currentUser = useSelector(selectCurrentUser);

  const isOwner = currentUser?.userInfo.role === 'owner';
  const REDIRECT_TIMEOUT = 2000;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: points } = pointAPI.useGetPointsQuery('');

  const [blockSubmitBtn, setBlockSubmitBtn] = useState(false);
  const [openDeleteAlertDialog, setOpenDeleteAlertDialog] = useState(false);

  const [warehouseItem, { isLoading }] =
    warehouseAPI.useEditWarehouseItemMutation();

  const [deleteWarehouseItem] = warehouseAPI.useDeleteWarehouseItemMutation();

  const {
    reset,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<IWarehouseItem>({
    defaultValues: {
      name: undefined,
      serial_number: undefined,
      description: undefined,
      phone: undefined,
      purchase_price: undefined,
      quantity: undefined,
      retail_price: undefined,
      warranty: null,
      received_date: undefined,
    },
  });

  const { showSnackbar, SnackbarComponent } = useSnackbar();

  useEffect(() => {
    if (points && points.length > 0 && data) {
      setValue('point_id', data.point_id);
    }
  }, [points]);

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        serial_number: data.serial_number,
        description: data.description,
        phone: data.phone,
        purchase_price: data.purchase_price,
        quantity: data.quantity,
        retail_price: data.retail_price,
        warranty: data.warranty,
        received_date: data.received_date,
      });
    }
  }, [data]);

  if (!data) return null;

  const onSubmit: SubmitHandler<IWarehouseItem> = async (args) => {
    showSnackbar('', false, false);

    try {
      await warehouseItem({ ...args, id: data.id }).unwrap();

      showSnackbar(t('form.added_successfully'), false);

      setBlockSubmitBtn(true);

      setTimeout(() => {
        setBlockSubmitBtn(false);
      }, REDIRECT_TIMEOUT);
    } catch (err: any) {
      const dataFromError = err?.data.error || 'An error occurred';
      showSnackbar(dataFromError, true);
    }
  };

  const categories = [{ id: undefined, name: `${t('form.default_label')}` }];
  const suppliers = [{ id: undefined, name: `${t('form.default_label')}` }];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom margin={4}>
        {t('warehouse.title_edit')}
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
                error={!!errors.phone}
                helperText={errors.phone?.message}
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
                    value={value ? dayjs(value) : null}
                    onChange={(date) => onChange(date)}
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
                inputProps={{ min: data.quantity_used }}
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
                    inputProps={{ min: 0, step: '0.01' }}
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
                    inputProps={{ min: 0, step: '0.01' }}
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
                defaultValue={field.value || 'Default description'}
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
              {t('warehouse.delete_warehouse_item')}
            </Button>
            <AlertDialog
              handleClose={() => setOpenDeleteAlertDialog(false)}
              handleClickOk={async () => {
                try {
                  await deleteWarehouseItem({ id: data.id }).unwrap();

                  showSnackbar(t('Deleted'), false);
                  setBlockSubmitBtn(true);

                  setTimeout(() => {
                    navigate(`/warehouse`);
                  }, REDIRECT_TIMEOUT);
                } catch (error: any) {
                  showSnackbar(error?.data?.error, true);
                }
              }}
              isOpen={openDeleteAlertDialog}
              title={t('warehouse.alert_delete_title')}
            />
          </>
        )}

        <LoadingButton
          disabled={isLoading || blockSubmitBtn}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {t('warehouse.btn_edit')}
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default Content;

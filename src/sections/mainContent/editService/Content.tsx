import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { FC, useCallback, useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import AlertDialog from '../../../components/AlertDialog/';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { serviceCatalogAPI } from '../../../services/ServiceCatalogService';
import { isOwner as isOvnerSelector } from '../../../store/reducers/AuthSlice';
import { IServiceItem } from '../../../types/IServiceItem';

const Content: FC = () => {
  const REDIRECT_TIMEOUT = 2000;
  const { t } = useTranslation();
  const isOwner = useSelector(isOvnerSelector);

  const { id } = useParams();
  const [blockSubmitBtn, setBlockSubmitBtn] = useState(false);

  const [updateService, { isLoading }] =
    serviceCatalogAPI.useUpdateServiceMutation();

  const [deleteService] = serviceCatalogAPI.useDeleteServiceByIdMutation();

  const { data: service } = serviceCatalogAPI.useGetServiceByIdQuery(id!, {
    skip: !id,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IServiceItem>();
  const navigate = useNavigate();

  useEffect(() => {
    if (service?.data) {
      reset({
        name: service?.data.name,
        price: service?.data.price,
        description: service?.data.description,
      });
    }
  }, [service?.data]);

  const [openDeleteAlertDialog, setOpenDeleteAlertDialog] = useState(false);

  const handleDelete = useCallback(async () => {
    setOpenDeleteAlertDialog(false);

    if (service?.data) {
      try {
        await deleteService(service?.data.id).unwrap();
        navigate(`/service-catalog`);
      } catch (error: any) {
        showSnackbar(error?.data?.error, true);
      }
    }
  }, [navigate, service]);

  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const onSubmit: SubmitHandler<IServiceItem> = async (args) => {
    showSnackbar('', false, false);

    if (!service?.data?.id) {
      showSnackbar(t('service_catalog.errors.service_not_found'), true);
      return;
    }

    try {
      await updateService({ ...args, id: service.data.id }).unwrap();
      showSnackbar(t('form.updated_successfully'), false);

      setBlockSubmitBtn(true);

      setTimeout(() => {
        navigate(`/service-catalog`);
      }, REDIRECT_TIMEOUT);
    } catch (err: any) {
      console.log('err', err);
      const msg = err?.message || 'An error occurred';
      showSnackbar(msg, true);
    }
  };

  const categories = [{ id: undefined, name: `${t('form.default_label')}` }];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom margin={4}>
        {t('edit_service.title')}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          textAlign: 'right',
          justifyContent: 'end',
          marginBottom: 1,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ paddingRight: 1 }}
        >
          {t('form.created_by')}: {service?.data?.created_by_user_name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          •{' '}
          {service?.data &&
            new Date(service.data.created_at).toLocaleDateString()}
        </Typography>
      </Box>

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
                label={`${t('service_catalog.columns.name')} *`}
                {...field}
                value={field.value ?? ''}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="price"
          rules={{
            required: `${t('form.required')}`,
          }}
          render={({ field }) => {
            return (
              <TextField
                label={`${t('service_catalog.columns.price')} *`}
                {...field}
                slotProps={{
                  htmlInput: {
                    min: 0,
                  },
                }}
                value={field.value ?? ''}
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="category_id"
          defaultValue={categories[0].id}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                value={field.value ?? ''}
                id="outlined-select-currency-native2"
                select
                label={t('service_catalog.columns.category')}
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

        <Controller
          control={control}
          name="description"
          render={({ field }) => {
            return (
              <TextField
                label={t('service_catalog.columns.description')}
                multiline
                variant="outlined"
                size="small"
                rows={4}
                {...field}
                value={field.value ?? ''}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            );
          }}
        />

        <SnackbarComponent />

        <Box
          sx={{
            marginTop: '40px !important',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
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
                {t('form.delete')}
              </Button>
              <AlertDialog
                handleClose={() => setOpenDeleteAlertDialog(false)}
                handleClickOk={handleDelete}
                isOpen={openDeleteAlertDialog}
                showSubmitBtn={true}
                title={t('service_catalog.alert_delete_title')}
              />
            </>
          )}

          <LoadingButton
            disabled={isLoading || blockSubmitBtn}
            size="large"
            type="submit"
            variant="contained"
          >
            {t('form.btn_save')}
          </LoadingButton>
        </Box>
      </Stack>
    </form>
  );
};

export default Content;

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { FC, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useSnackbar } from '../../../hooks/useSnackbar';
import { serviceCatalogAPI } from '../../../services/ServiceCatalogService';
import { IServiceItem } from '../../../types/IServiceItem';

const Content: FC = () => {
  const REDIRECT_TIMEOUT = 2000;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [blockSubmitBtn, setBlockSubmitBtn] = useState(false);

  const [serviceCatalogItem, { isLoading }] =
    serviceCatalogAPI.useCreateServiceMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IServiceItem>();

  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const onSubmit: SubmitHandler<IServiceItem> = async (args) => {
    showSnackbar('', false, false);

    try {
      await serviceCatalogItem(args).unwrap();
      showSnackbar(t('form.added_successfully'), false);

      setBlockSubmitBtn(true);

      setTimeout(() => {
        navigate(`/service-catalog`);
      }, REDIRECT_TIMEOUT);
    } catch (err: any) {
      const dataFromError = err?.data || 'An error occurred';
      showSnackbar(dataFromError, true);
    }
  };

  const categories = [{ id: undefined, name: `${t('form.default_label')}` }];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom margin={4}>
        {t('add_service.title')}
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
                label={`${t('service_catalog.columns.name')} *`}
                {...field}
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
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            );
          }}
        />

        <SnackbarComponent />

        <LoadingButton
          disabled={isLoading || blockSubmitBtn}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {t('form.btn_save')}
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default Content;

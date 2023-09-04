import React, { FC, useState, useEffect } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {pointAPI} from "../../../services/PointService";
import getAuthorizationHeaders from "../../../utils/api/getAuthorizationHeaders";
import { selectAccessToken } from "../../../store/reducers/AuthSlice";
import { useSelector } from "react-redux";
import {IPoint} from "../../../types/IPoint";
import { useTranslation } from "react-i18next";
interface IFormInputs {
  name: string;
  description: string;
};

const Content: FC = () => {
  const { t } = useTranslation();

  const [createPoint, {isError, isLoading: isLoadingCreatePoint, error:errorCreatePoint}] = pointAPI.useCreatePointMutation();

  const { handleSubmit, control,  formState: { errors } } = useForm<IFormInputs>();

  const dataFromError:any = (errorCreatePoint && 'data' in errorCreatePoint) ? errorCreatePoint?.data : undefined;

  const [point, setPoint] = useState<{point:IPoint}>();

  const onSubmit: SubmitHandler<IFormInputs> = async (args) => {
    const {data} = await createPoint({body: {name: args.name, description: args.description}}) as {data: any};

    setPoint(data);
  };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom margin={4}>
          {t('point.create_new_point')}
        </Typography>

        <Stack spacing={3}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Name is required",
            }}
            render={({ field }) => {
              return <TextField 
                  label={t('point.name')}
                  {...field} 
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              }
            }
          />

          <Controller
            control={control}
            name="description"
            render={({ field }) => {
              return <TextField 
                  label={t('point.description')}
                  multiline
                  rows={4}
                  {...field} 
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              }
            }
          />
          
          {isError && <Typography color="error">{dataFromError}</Typography>}

          {point?.point.name && <Typography color="green">Point "{point?.point.name}" Point created!</Typography>}

          <LoadingButton 
            disabled={isLoadingCreatePoint}
            fullWidth size="large" type="submit" variant="contained" >
            {t('point.btn_create')}
          </LoadingButton>
        </Stack>
      </form>
    )
}

export default Content;
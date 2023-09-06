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
import { useParams } from 'react-router-dom';
interface IFormInputs {
  name: string;
  description: string;
  phone_number: string;
};

const Content: FC = () => {
  const { t } = useTranslation();

  const {point_id} = useParams();

  const {data: point, error, isLoading: isLoading_point} = pointAPI.useGetPointByPointIdQuery(point_id);

  const [updatePoint, {isError, error:errorupdatePoint}] = pointAPI.useUpdatePointMutation();

  const { handleSubmit, control, setValue, formState: { errors } } = useForm<IFormInputs>({
    defaultValues:{
      name: '',
      phone_number: '',
      description: ''
  }});

  useEffect(() => {
    if(point) {
      setValue('name', point.name);
      setValue('phone_number', point.phone_number);
      setValue('description', point.description);
    }
  }, [point]);

  const dataFromError:any = (errorupdatePoint && 'data' in errorupdatePoint) ? errorupdatePoint?.data : undefined;

  const [showSuccessesBlock, setshowSuccessesBlock] = useState(false);

  const onSubmit: SubmitHandler<IFormInputs> = async (args) => {
    const {data} = await updatePoint({...args, point_id}) as {data: any};

    if(data) {
      setshowSuccessesBlock(true)

      setTimeout(() => {
        setshowSuccessesBlock(false);
      }, 3000); 
    }
  };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom margin={4}>
          {t('point.edit_point')}
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
                  label={t('point.name') + '*'}
                  {...field} 
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              }
            }
          />

          <Controller
            control={control}
            name="phone_number"
            render={({ field }) => {
              return <TextField 
                  label={t('point.phone_number')}
                  {...field} 
                  error={!!errors.name}
                  helperText={errors.name?.message || t('printTicket.will_in_print')}
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

          {showSuccessesBlock && <Typography color="green">{t('point.successes_block')}</Typography>}

          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            {t('point.btn_edit')}
          </LoadingButton>
        </Stack>
      </form>
    )
}

export default Content;
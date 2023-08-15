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

interface IFormInputs {
  name: string;
  description: string;
};

const Content: FC = () => {
  const accessToken = useSelector(selectAccessToken);
  const [createPoint, {isError, error:errorCreatePoint}] = pointAPI.useCreatePointMutation();

  const { handleSubmit, control,  formState: { errors } } = useForm<IFormInputs>();

  const dataFromError:any = (errorCreatePoint && 'data' in errorCreatePoint) ? errorCreatePoint?.data : undefined;

  const [point, setPoint] = useState<{point:IPoint}>();

  const onSubmit: SubmitHandler<IFormInputs> = async (args) => {
    const {data} = await createPoint({headers: getAuthorizationHeaders(accessToken), body: {name: args.name, description: args.description}}) as {data: any};

    setPoint(data);
  };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Typography variant="h6" gutterBottom>
            Create New Point
          </Typography>

          {isError && <Typography color="error">{dataFromError}</Typography>}

          {point?.point.name && <Typography color="green">Point "{point?.point.name}" has been created!</Typography>}

          <Controller
            control={control}
            name="name"
            rules={{
              required: "Name is required",
            }}
            render={({ field }) => {
              return <TextField label="Name" 
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
              return <TextField label="Description"
                  multiline
                  rows={4}
                  {...field} 
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              }
            }
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" >
            Create Point
          </LoadingButton>
        </Stack>
      </form>
    )
}

export default Content;
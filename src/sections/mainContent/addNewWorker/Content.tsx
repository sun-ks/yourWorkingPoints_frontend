import React, { FC, useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {userAPI} from "../../../services/UserService";
import {IPoint} from "../../../types/IPoint";
import { useTranslation } from "react-i18next";
interface IFormInputs {
  email: string;
  name: string;
  phone: string;
  description: string;
};

const Content: FC = () => {
  const { t } = useTranslation();

  const [inviteUser, {isError, isLoading: isLoadingCreatePoint, error:errorCreatePoint}] = userAPI.useInviteWorkerMutation();

  const { handleSubmit, control,  formState: { errors } } = useForm<IFormInputs>();

  const dataFromError:any = (errorCreatePoint && 'data' in errorCreatePoint) ? errorCreatePoint?.data : undefined;

  const [worker, setWorker] = useState<any>();

  const onSubmit: SubmitHandler<IFormInputs> = async (args) => {
    const {data} = await inviteUser(args) as {data: any};

    console.log(data)
    setWorker(data);
  };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom margin={4}>
          {t('worker.add_worker')}
        </Typography>

        <Stack spacing={3}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => {
              return <TextField 
                  label={`${t('worker.email')} *`}
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message }
                />
              }
            }
          />

          <Controller
            control={control}
            name="name"
            rules={{
              required: "Name is required",
            }}
            render={({ field }) => {
              return <TextField 
                  label={`${t('worker.name')} *`}
                  {...field}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              }
            }
          />

          <Controller
            control={control}
            name="phone"
            rules={{
              required: "Phone is required",
              minLength: {
                value: 9,
                message: "Phone must have at least 9 digits",
              },
            }}
            render={({ field }) => {
              return <TextField 
                label={`${t('worker.phone')} *`}
                sx={{ mb: 5 }}
                {...field} 
                type="number"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                />
              }
            }
          />

          <Controller
            control={control}
            name="description"
            render={({ field }) => {
              return <TextField 
                  label={t('worker.description')}
                  multiline
                  variant="outlined"
                  size="small"
                  rows={4}
                  {...field} 
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              }
            }
          />
          
          {isError && <Typography color="error">{dataFromError}</Typography>}

          {worker?.email && <Typography color="green">Invitation sent to "{worker?.email}" successfully!</Typography>}

          <LoadingButton
            disabled={isLoadingCreatePoint}
            fullWidth size="large" type="submit" variant="contained" >
            {t('worker.invite')}
          </LoadingButton>
        </Stack>
      </form>
    )
}

export default Content;
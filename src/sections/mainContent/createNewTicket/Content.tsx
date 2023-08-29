import React, { FC, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ticketAPI } from "../../../services/ITicketService";
import { pointAPI } from "../../../services/PointService";
import { IItem } from "../../../types/IItem";
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Content: FC = () => {
  const navigate = useNavigate();

  const {t} = useTranslation();

  const {data: points} = pointAPI.useGetPointsQuery('');

  const [createTicket, {isError, error:errorCreatePoint}] = ticketAPI.useCreateTicketMutation();

  const dataFromError:any = (errorCreatePoint && 'data' in errorCreatePoint) ? errorCreatePoint?.data : undefined;

  const { point_id }  = useParams();

  const { handleSubmit, control, setValue, formState: { errors } } = useForm<IItem>({defaultValues: {
    point_id: (point_id ? point_id : ''), 
  }});

  const onSubmit: SubmitHandler<IItem> = async (args) => {

    const {data} = await createTicket({...args}) as {data: any};

    navigate(`/items/${data.ticket_id}`);
  };

  useEffect(() => {
    if (!point_id && points) {
      setValue('point_id', points[0].point_id);
    }
  }, [points]);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom margin={4}>
          {t('createTicket.head_line')}
        </Typography>

        <Stack spacing={3} sx={{textAlign:'left'}}>
          <Controller
            control={control}
            name="point_id"
            render={({ field }) => {
              return <TextField 
                  {...field}
                  id="outlined-select-currency-native2"
                  select
                  label={t('createTicket.select_point')}
                  variant="outlined" 
                  SelectProps={{
                    native: true,
                  }}
                    >
                  {points && points.map((point) => (
                    <option key={point.point_id} value={point.point_id}>
                      {point.name}
                    </option>
                  ))}
                </TextField>
              }
            }
          />
          
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Divice Name is required",
            }}
            render={({ field }) => {
              return <TextField 
                  label={`${t('createTicket.device_name')} *`} 
                  {...field} 
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              }
            }
          />

          <Controller
            control={control}
            name="device_sn"
            rules={{
              required: "Device S/N (imei) is required",
            }}
            render={({ field }) => {
              return <TextField 
                  label={`${t('createTicket.device_sn')} *`} 
                  {...field} 
                  error={!!errors.device_sn}
                  helperText={errors.device_sn?.message}
                />
              }
            }
          />

          <Controller
            control={control}
            name="description"
            rules={{
              required: "Description is required",
            }}
            render={({ field }) => {
              return <TextField label={`${t('createTicket.description')} *`}
                  multiline
                  rows={4}
                  {...field} 
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              }
            }
          />

          <Controller
            control={control}
            name="client_phone"
            rules={{
              required: "Client Phone is required",
              minLength: {
                value: 9,
                message: "Client Phone must have at least 9 digits",
              },
            }}
            render={({ field }) => {
              return <TextField 
                label={`${t('createTicket.client_phone')} *`}
                {...field} 
                type="number"
                error={!!errors.client_phone}
                helperText={errors.client_phone?.message}
              />
              }
            }
          />

          <Controller
            control={control}
            name="email"
            rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => {
              return <TextField 
                label={`${t('createTicket.client_email')} *`}
                {...field} 
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              }
            }
          />

          <Controller
            control={control}
            name="client_first_name"
            render={({ field }) => {
              return <TextField 
                label={t('createTicket.client_name')}
                {...field} 
                error={!!errors.client_first_name}
                helperText={errors.client_first_name?.message}
                />
              }
            }
          />

          <Controller
            control={control}
            name="paid"
            rules={{
              required: "First payment is required",
            }}
            render={({ field }) => {
              return <TextField 
                label={`${t('createTicket.first_payment')} *`}
                {...field} 
                type="number"
                error={!!errors.paid}
                helperText={errors.paid?.message}
              />
              }
            }
          />

          {isError && <Typography color="error">{dataFromError}</Typography>}

          <LoadingButton fullWidth size="large" type="submit" variant="contained" >
            {t('createTicket.btn_create')}
          </LoadingButton>
        </Stack>
      </form>
    )
}

export default Content;
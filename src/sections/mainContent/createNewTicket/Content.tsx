import React, { FC, useState, useEffect } from "react";

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { itemAPI } from "../../../services/ItemService";
import { IPoint } from "../../../types/IPoint";
import {IItem} from "../../../types/IItem";
import { useParams } from 'react-router-dom';

const Content: FC = () => {
  const [createItem, {isError, error:errorCreatePoint}] = itemAPI.useCreateItemMutation();

  const { handleSubmit, control,  formState: { errors } } = useForm<IItem>({defaultValues:{deposit:0}});

  const dataFromError:any = (errorCreatePoint && 'data' in errorCreatePoint) ? errorCreatePoint?.data : undefined;

  const [item, setItem] = useState<{point:IItem}>();

  const { point_id }  = useParams();

  const onSubmit: SubmitHandler<IItem> = async (args) => {
    const {data} = await createItem({...args, point_id}) as {data: any};

    setItem(data)
  };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom>
          Create New Ticket
        </Typography>

        <Stack spacing={3} sx={{textAlign:'left'}}>
          {isError && <Typography color="error">{dataFromError}</Typography>}

          {item && <Typography color="green">Ticket has been created!</Typography>}
          
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Divice Name is required",
            }}
            render={({ field }) => {
              return <TextField label="Divice Name *" 
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
              return <TextField label="Device S/N (imei) *" 
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
              return <TextField label="Description *"
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
            }}
            render={({ field }) => {
              return <TextField label="Client Phone *" 
                  {...field} 
                  error={!!errors.client_phone}
                  helperText={errors.client_phone?.message}
                />
              }
            }
          />

          <Controller
            control={control}
            name="deposit"
            rules={{
              required: "Client Already Paid is required",
            }}
            render={({ field }) => {
              return <TextField label="Client Already Paid *" 
                  {...field} 
                  type="number"
                  error={!!errors.deposit}
                  helperText={errors.deposit?.message}
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
              return <TextField label="Client Email"
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
              return <TextField label="Client First Name" 
                  {...field} 
                  error={!!errors.client_first_name}
                  helperText={errors.client_first_name?.message}
                />
              }
            }
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" >
            Create Ticket
          </LoadingButton>
        </Stack>
      </form>
    )
}

export default Content;
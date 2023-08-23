import React, { FC, useState, useEffect } from "react";

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Stack, Grid, Paper, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { itemAPI } from "../../../services/ItemService";
import { pointAPI } from "../../../services/PointService";
import {IItem} from "../../../types/IItem";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Content: FC<{
  point_id?: string, 
  ticket?: IItem, 
  ticket_id?: string,
  setStatus: any
}> = ({point_id, 
  ticket, 
  ticket_id,
  setStatus}) => {

  const {data: currentPoint} = pointAPI.useGetPointByPointIdQuery(point_id);

  const [updateTicket, {isError, error:errorUpdateTicket}] = itemAPI.useUpdateItemMutation();

  const { handleSubmit, control, register, watch, setValue, formState: { errors } } = useForm<IItem>({
    defaultValues: {
      'last_part_payment': 0, 
      note: ''
    }
  });

  const status = watch('status');
  setStatus(status)

  useEffect(() => {
    if (ticket) {
      setValue('status', ticket.status);
      setValue('priority', ticket.priority);
      setValue('note', ticket.note);
      setValue('last_part_payment', ticket.last_part_payment);
    }
  }, [ticket]);

  const [showSuccessesBlock, setshowSuccessesBlock] = useState(false);

  const dataFromError:any = (errorUpdateTicket && 'data' in errorUpdateTicket) ? errorUpdateTicket?.data : undefined;

  const onSubmit: SubmitHandler<IItem> = async (args) => {
    const {data} = await updateTicket({...args, ticket_id}) as {data: any};
    
    if(data) {
      setshowSuccessesBlock(true)

      setTimeout(() => {
        setshowSuccessesBlock(false);
      }, 3000); 
    }
  };

  const statuses = [{
      value: 'inbox',
    },
    {
      value: 'in progress',
    },
    {
      value: 'done',
    },
    {
      value: 'paid',
    },
    {
      value: 'cancelled',
    },
    {
      value: 'hold'
    }
  ];

  const priorities = [{
      value: 'low',
    },
    {
      value: 'high',
    },
    {
      value: 'medium',
    }
  ];
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} >
        <Stack spacing={3} sx={{textAlign:'left'}}>
          <Grid container spacing={0} >
            <Grid xs={12}  sm={7}>
              <Item sx={{textAlign:'left', boxShadow: 0}}>
              {ticket &&  (
                <Typography fontSize={13}>
                  Ticket Created: { new Date(ticket.created).toLocaleDateString()}<br/>
                  Client Phone: {ticket.client_phone}<br/>
                  Divice Name: {ticket.name}<br/><br/>

                  Device S/N (imei): {ticket.device_sn}<br/>
                  Client Email: {ticket?.email}<br/>
                  Client Name: {ticket?.client_first_name} {ticket?.client_last_name}<br/><br/>
                
                  First payment: {ticket.paid}<br/>
                  Description: {ticket.description}<br/>
                </Typography>)}
              </Item>
            </Grid>
            <Grid xs={12} sm={5}>
              <Item sx={{textAlign:'left', boxShadow: 0}}>
                <Typography fontSize={13}>
                  Current Point:  {currentPoint?.name}<br/>
                </Typography>
                <br/>
                <Box sx={{marginBottom: 2}}>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => {
                      return <TextField 
                          {...field}
                          id="outlined-select-currency-native"
                          select
                          label="Ticket Status"
                          variant="outlined"
                          size="small" 
                          SelectProps={{
                            native: true,
                          }}
                          >
                          {statuses.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </TextField>
                      }
                    }
                  />
                </Box>

                <Box sx={{marginBottom: 2}}>
                  <Controller
                    control={control}
                    name="priority"
                    render={({ field }) => {
                      return <TextField 
                          {...field}
                          id="outlined-select-currency-native2"
                          select
                          label="Ticket Priority"
                          variant="outlined"
                          size="small" 
                          SelectProps={{
                            native: true,
                          }}
                            >
                          {priorities.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </TextField>
                      }
                    }
                  />
                </Box>
              </Item>
            </Grid>
          </Grid>
          
          <Controller
            control={control}
            name="note"
            render={({ field }) => {
              return <TextField label="Note"
                  multiline
                  variant="outlined"
                  size="small"
                  rows={4}
                  {...field} 
                  error={!!errors.note}
                  helperText={errors.note?.message}
                />
              }
            }
          />
          <Box>
            <Controller
              control={control}
              name="last_part_payment"
              render={({ field }) => {
                return <TextField label="Finish Payment" 
                    {...field}
                    type="number"
                    variant="outlined"
                    size="small" 
                    error={!!errors.last_part_payment}
                    helperText={errors.last_part_payment?.message}
                  />
                }
              }
            />
          </Box>

          {isError && <Typography color="error">{dataFromError}</Typography>}

          {showSuccessesBlock && <Typography color="green">Updated Successful!</Typography>}

          <LoadingButton fullWidth size="large" type="submit" variant="contained" >
            Update Ticket
          </LoadingButton>
        </Stack>
      </form>
    
)}

export default Content;
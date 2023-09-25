import React, { FC, useState, useEffect } from "react";

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Stack, Grid, Paper, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ticketAPI } from "../../../services/TicketService";
import { userAPI } from "../../../services/UserService";
import { pointAPI } from "../../../services/PointService";
import { IItem } from "../../../types/IItem";
import { styled } from '@mui/material/styles';
import { useTranslation } from "react-i18next";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Content: FC<{
  ticket?: IItem, 
  setStatus: any
}> = ({
  ticket,
  setStatus}) => {

  const {t} = useTranslation();

  const {data: points} = pointAPI.useGetPointsQuery('');

  const {data: workers} = userAPI.useGetAllUsersQuery('');

  const [updateTicket, {isError, error:errorUpdateTicket}] = ticketAPI.useUpdateTicketMutation();

  const { handleSubmit, control, watch, setValue, formState: { errors } } = useForm<IItem>({
    defaultValues: {
      last_part_payment: 0,
      note: '',
      point_id: '',
      assigned_at: null,
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
      setValue('point_id', ticket.point_id);
      setValue('assigned_at', ticket.assigned_at);
    }
  }, [ticket]);

  const [showSuccessesBlock, setshowSuccessesBlock] = useState(false);

  const dataFromError:any = (errorUpdateTicket && 'data' in errorUpdateTicket) ? errorUpdateTicket?.data : undefined;

  const onSubmit: SubmitHandler<IItem> = async (args) => {
    const {data} = await updateTicket({...args, ticket_id: ticket?.ticket_id}) as {data: any};
    
    if(data) {
      setshowSuccessesBlock(true)

      setTimeout(() => {
        setshowSuccessesBlock(false);
      }, 3000); 
    }
  };

  let workersList = [
    {
      user_id: null,
      name: 'None'
    },
  ];

  if (workers) workersList = [...workersList, ...workers] 

  const statuses = [{
      value: 'inbox',
      text: t('statuses.inbox')
    },
    {
      value: 'in progress',
      text: t('statuses.in_progress')
    },
    {
      value: 'ask client',
      text: t('statuses.ask_client')
    },
    {
      value: 'done',
      text: t('statuses.done')
    },
    {
      value: 'paid',
      text: t('statuses.paid')
    },
    {
      value: 'cancelled',
      text: t('statuses.cancelled')
    },
    {
      value: 'hold',
      text: t('statuses.hold')
    }
  ];

  const priorities = [{
      value: 'low',
      text: t('priorities.low')
    },
    {
      value: 'high',
      text: t('priorities.high')
    },
    {
      value: 'medium',
      text: t('priorities.medium')
    }
  ];
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} >
        <Typography variant="h6" gutterBottom margin={4}>
          {t('editTicket.title')}
        </Typography>

        <Stack spacing={3} sx={{textAlign:'left'}}>
          <Grid container spacing={0} >
            <Grid xs={12}  sm={7}>
              <Item sx={{textAlign:'left', boxShadow: 0}}>
              {ticket &&  (
                <Typography fontSize={13}>
                  {t('editTicket.ticket_created')}: { new Date(ticket.created).toLocaleDateString()}<br/>
                  {t('editTicket.client_phone')}: {ticket.client_phone}<br/>
                  {t('editTicket.device_name')}: {ticket.name}<br/><br/>

                  {t('editTicket.sn')}: {ticket.device_sn}<br/>
                  {t('editTicket.client_email')}: {ticket?.email}<br/>
                  {t('editTicket.client_name')} : {ticket?.client_first_name} {ticket?.client_last_name}<br/><br/>
                
                  {t('editTicket.first_payment')}: {ticket.paid}<br/>
                  {t('editTicket.description')}: {ticket.description}<br/>
                </Typography>)}
              </Item>
            </Grid>
            <Grid xs={12} sm={5}>
              <Item sx={{textAlign:'left', boxShadow: 0}}>
                <Box sx={{marginBottom: 2}}>
                  <Controller
                    control={control}
                    name="point_id"
                    render={({ field }) => {
                    return <TextField 
                      {...field}
                      sx={{width: "100%"}}
                      id="outlined-select-currency-native2"
                      select
                      label={t('editTicket.current_point')}
                      variant="outlined"
                      size="small"
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
                </Box>
                <Box sx={{marginBottom: 2}}>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => {
                      return <TextField 
                          {...field}
                          sx={{width: "100%"}}
                          id="outlined-select-currency-native"
                          select
                          label={t('editTicket.ticket_status')}
                          variant="outlined"
                          size="small" 
                          SelectProps={{
                            native: true,
                          }}
                          >
                          {statuses.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.text}
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
                          sx={{width: "100%"}}
                          id="outlined-select-currency-native2"
                          select
                          label={t('editTicket.ticket_priority')}
                          variant="outlined"
                          size="small" 
                          SelectProps={{
                            native: true,
                          }}
                            >
                          {priorities.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.text}
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
                    name="assigned_at"
                    render={({ field }) => {
                      return <TextField
                          {...field}
                          sx={{width: "100%"}}
                          id="outlined-select-currency-native2"
                          select
                          label={t('editTicket.assigned_at')}
                          variant="outlined"
                          size="small" 
                          SelectProps={{
                            native: true,
                          }}
                          >
                          {workersList.map((option:any) => (
                            <option key={option.user_id} value={option.user_id}>
                              {option.name ? option.name : option.email}
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
              return <TextField 
                  label={t('editTicket.note')}
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
                return <TextField 
                  label={t('editTicket.finish_payment')}
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
            {t('editTicket.update_ticket')}
          </LoadingButton>
        </Stack>
      </form>
    
)}

export default Content;
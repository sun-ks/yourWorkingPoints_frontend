import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Paper, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import AlertDialog from '../../../components/AlertDialog/';
import {
  getTicketPriorities,
  getTicketStatuses,
} from '../../../constants/ticket';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { pointAPI } from '../../../services/PointService';
import { ticketAPI } from '../../../services/TicketService';
import { userAPI } from '../../../services/UserService';
import { warehouseAPI } from '../../../services/WarehouseService';
import { selectCurrentUser } from '../../../store/reducers/AuthSlice';
import { IItem } from '../../../types/IItem';
import { IWarehouseItem } from '../../../types/IWarehouse';
import { PartsList } from './PartsList';
import { TicketNoteAndPaymentFields } from './TicketNoteAndPaymentFields';
import { TopFields } from './TopFields';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Content: FC<{
  ticket?: IItem;
  setStatus: (val: string) => void;
  savedInventoryItemsForCurrentTicket?: IWarehouseItem[];
  refetchSavedInventoryItemsForCurrentTicket: () => void;
}> = ({
  ticket,
  setStatus,
  savedInventoryItemsForCurrentTicket,
  refetchSavedInventoryItemsForCurrentTicket,
}) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const ticketStatuses = useMemo(() => getTicketStatuses(t), [t]);

  const ticketPriorities = useMemo(() => getTicketPriorities(t), [t]);

  const currentUser = useSelector(selectCurrentUser);

  const isOwner = currentUser?.userInfo.role === 'owner';

  const [
    delayedRequestGetWarehouseItemsByCompanyId,
    setDelayedRequestGetWarehouseItemsByCompanyId,
  ] = useState(false);

  useEffect(() => {
    if (savedInventoryItemsForCurrentTicket) {
      setDelayedRequestGetWarehouseItemsByCompanyId(false);
    }
  }, [savedInventoryItemsForCurrentTicket]);

  const {
    data: availableInventoryItemsForCurrentTicket,
    refetch: refetchAvailableInventoryItemsForCurrentTicket,
  } = warehouseAPI.useGetWarehouseItemsByCompanyIdQuery(undefined, {
    skip: delayedRequestGetWarehouseItemsByCompanyId,
  });

  const [partsFields, setPartsFields] = useState<string[]>([]);

  useEffect(() => {
    if (savedInventoryItemsForCurrentTicket) {
      setPartsFields([]);

      savedInventoryItemsForCurrentTicket.forEach((item, index) => {
        setValue(`parts.${index}.id`, item.id);

        setValue(
          `parts.${index}.used_count_this_ticket`,
          item.used_count_this_ticket,
        );

        setPartsFields((prev) => [...prev, uuidv4()]);
      });
    }
  }, [savedInventoryItemsForCurrentTicket]);

  const [openDeleteAlertDialog, setOpenDeleteAlertDialog] = useState(false);

  const { data: points } = pointAPI.useGetPointsQuery('');

  const { data: workers } = userAPI.useGetAllUsersQuery('');

  const [updateTicket, { isError, error: errorUpdateTicket }] =
    ticketAPI.useUpdateTicketMutation();

  const [deleteTicket] = ticketAPI.useDeleteTicketMutation();

  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    resetField,
    formState: { errors },
  } = useForm<IItem>({
    defaultValues: {
      last_part_payment: 0,
      note: '',
      point_id: '',
      assigned_at: null,
      guarantee_till: null,
    },
  });

  const { remove: removeField } = useFieldArray({
    control,
    name: 'parts',
  });

  const status = watch('status');

  useEffect(() => {
    setStatus(status);
  }, [status]);

  useEffect(() => {
    if (ticket) {
      setValue('status', ticket.status);
      setValue('priority', ticket.priority);
      setValue('note', ticket.note);
      setValue('last_part_payment', ticket.last_part_payment);
      setValue('point_id', ticket.point_id);
      setValue('assigned_at', ticket.assigned_at);
      setValue('guarantee_till', ticket.guarantee_till);
    }
  }, [ticket]);
  useEffect(() => {
    if (status !== 'paid') {
      setValue('guarantee_till', null);
    }
  }, [status]);

  const hasSavedInventoryItemsForCurrentTicket = useMemo(() => {
    return (
      savedInventoryItemsForCurrentTicket &&
      savedInventoryItemsForCurrentTicket.length > 0
    );
  }, [savedInventoryItemsForCurrentTicket]);

  const watchedParts = useWatch({ control, name: 'parts' });

  const warehouseDataFiltered = useMemo(() => {
    if (!availableInventoryItemsForCurrentTicket?.data) return [];

    return availableInventoryItemsForCurrentTicket.data.filter((item) => {
      return !watchedParts?.some((part) => part?.id === item.id);
    });
  }, [watchedParts, availableInventoryItemsForCurrentTicket]);

  const dataFromError: any =
    errorUpdateTicket && 'data' in errorUpdateTicket
      ? errorUpdateTicket?.data
      : undefined;

  const onSubmit: SubmitHandler<IItem> = async (args) => {
    showSnackbar('', false, false);

    if (args.assigned_at === 'None') args.assigned_at = null;

    try {
      await updateTicket({
        ...args,
        ticket_id: ticket?.ticket_id,
      }).unwrap();

      await refetchAvailableInventoryItemsForCurrentTicket();

      await refetchSavedInventoryItemsForCurrentTicket();

      showSnackbar(t('update_successful'), false);
    } catch (err: any) {
      const dataFromError = err?.data || 'An error occurred';
      showSnackbar(dataFromError, true);
    }
  };

  const workersList = useMemo(() => {
    return [
      {
        user_id: null,
        name: 'None',
      },
      ...(workers ?? []),
    ];
  }, [workers]);

  const handleDeleteTicket = useCallback(async () => {
    setOpenDeleteAlertDialog(false);

    try {
      await deleteTicket(ticket?.ticket_id).unwrap();
      navigate(`/tickets`);
    } catch (error: any) {
      showSnackbar(error?.data?.error, true);
    }
  }, [ticket?.ticket_id, deleteTicket, navigate]);

  const canAddMoreParts = useMemo(() => {
    return (
      !availableInventoryItemsForCurrentTicket?.data ||
      availableInventoryItemsForCurrentTicket.data.length > partsFields.length
    );
  }, [availableInventoryItemsForCurrentTicket, partsFields]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom margin={4}>
        {t('editTicket.title')}
      </Typography>

      <Stack spacing={3} sx={{ textAlign: 'left', marginBottom: 4 }}>
        <TopFields
          t={t}
          control={control}
          ticket={ticket}
          status={status}
          ticketStatuses={ticketStatuses}
          ticketPriorities={ticketPriorities}
          points={points}
          workersList={workersList}
          Item={Item}
        />
        <div></div>

        <PartsList
          savedInventoryItemsForCurrentTicket={
            savedInventoryItemsForCurrentTicket
          }
          availableInventoryItemsForCurrentTicket={
            availableInventoryItemsForCurrentTicket
          }
          partsFields={partsFields}
          getValues={getValues}
          control={control}
          setValue={setValue}
          resetField={resetField}
          errors={errors}
          removeField={removeField}
          setPartsFields={setPartsFields}
          t={t}
          warehouseDataFiltered={warehouseDataFiltered}
          canAddMoreParts={canAddMoreParts}
          setDelayedRequestGetWarehouseItemsByCompanyId={
            setDelayedRequestGetWarehouseItemsByCompanyId
          }
        />

        <TicketNoteAndPaymentFields control={control} errors={errors} t={t} />

        {isError && <Typography color="error">{dataFromError}</Typography>}

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
                {t('editTicket.delete_ticket')}
              </Button>
              <AlertDialog
                handleClose={() => setOpenDeleteAlertDialog(false)}
                handleClickOk={handleDeleteTicket}
                isOpen={openDeleteAlertDialog}
                showSubmitBtn={!hasSavedInventoryItemsForCurrentTicket}
                title={
                  !hasSavedInventoryItemsForCurrentTicket
                    ? t('editTicket.alert_delete_title')
                    : t('editTicket.alert_delete_title_with_parts')
                }
              />
            </>
          )}

          <LoadingButton size="large" type="submit" variant="contained">
            {t('editTicket.update_ticket')}
          </LoadingButton>
        </Box>
      </Stack>
    </form>
  );
};

export default Content;

import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormResetField,
  UseFormSetValue,
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import React, { FC } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { IApiResponse } from '../../../types/IApiResponse';
import { IItem } from '../../../types/IItem';
import { IWarehouseItem } from '../../../types/IWarehouse';

type TWarehouseResponse = IApiResponse<IWarehouseItem[]>;

export const PartsList: FC<{
  savedInventoryItemsForCurrentTicket?: IWarehouseItem[];
  availableInventoryItemsForCurrentTicket?: TWarehouseResponse;
  canAddMoreParts: boolean;
  setDelayedRequestGetWarehouseItemsByCompanyId: (val: boolean) => void;
  setValue: UseFormSetValue<IItem>;
  removeField: (val: number) => void;
  partsFields: string[];
  getValues: UseFormGetValues<IItem>;
  control: Control<IItem>;
  resetField: UseFormResetField<IItem>;
  errors: FieldErrors<IItem>;
  setPartsFields: React.Dispatch<React.SetStateAction<string[]>>;
  t: (key: string) => string;
  warehouseDataFiltered: IWarehouseItem[] | undefined;
}> = ({
  savedInventoryItemsForCurrentTicket,
  availableInventoryItemsForCurrentTicket,
  partsFields,
  getValues,
  control,
  setValue,
  resetField,
  errors,
  removeField,
  setPartsFields,
  t,
  warehouseDataFiltered,
  canAddMoreParts,
  setDelayedRequestGetWarehouseItemsByCompanyId,
}) => {
  const getUsedInventoryCountForTicket = (
    warehouseItem?: IWarehouseItem,
    savedItems: IWarehouseItem[] = [],
  ): number => {
    if (!warehouseItem) return 0;

    const matchedItem = savedItems.find((item) => item.id === warehouseItem.id);
    return matchedItem?.used_count_this_ticket ?? 0;
  };

  return (
    <>
      {availableInventoryItemsForCurrentTicket &&
        availableInventoryItemsForCurrentTicket.data &&
        partsFields.map((fieldId, index) => {
          const currentWarehouseData =
            availableInventoryItemsForCurrentTicket.data?.find(
              (item) => item.id === getValues(`parts.${index}.id`),
            );

          const used_count_this_ticket = getUsedInventoryCountForTicket(
            currentWarehouseData,
            savedInventoryItemsForCurrentTicket,
          );

          const quantityUsed = currentWarehouseData?.quantity_used ?? 0;

          const quantity = currentWarehouseData?.quantity ?? 0;

          const quantityMax =
            quantity - (quantityUsed - used_count_this_ticket);

          return (
            <Grid
              container
              spacing={1}
              sx={{
                marginTop: '0 !important',
                marginBottom: '16px !important',
              }}
              key={fieldId}
            >
              <Grid
                size={
                  currentWarehouseData ? { xs: 7, sm: 7 } : { xs: 12, sm: 12 }
                }
              >
                <Controller
                  control={control}
                  name={`parts.${index}.id`}
                  rules={{
                    required: t('form.required'),
                  }}
                  render={({ field: controllerField }) => (
                    <Autocomplete
                      value={currentWarehouseData || null}
                      size="small"
                      freeSolo={false}
                      options={warehouseDataFiltered || []}
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => {
                        const quantityMax =
                          option.quantity -
                          (option.quantity_used -
                            getUsedInventoryCountForTicket(
                              option,
                              savedInventoryItemsForCurrentTicket,
                            ));

                        if (option.quantity < 1) {
                          return null;
                        }
                        return (
                          <li {...props}>
                            {option.name}
                            <Typography
                              component="span"
                              sx={{ pl: 1 }}
                              variant="caption"
                            >
                              ({quantityMax} {t('form.available').toLowerCase()}
                              )
                            </Typography>
                          </li>
                        );
                      }}
                      onChange={(_, newValue) => {
                        controllerField.onChange(newValue?.id);

                        const currentCount = getValues(
                          `parts.${index}.used_count_this_ticket`,
                        );

                        setValue(
                          `parts.${index}.price_at_use`,
                          newValue?.retail_price,
                        );

                        if (currentCount) {
                          resetField(`parts.${index}.used_count_this_ticket`, {
                            defaultValue: 1,
                          });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          value={params.inputProps.value ?? ''}
                          label={t('editTicket.select_part')}
                          error={!!errors?.parts?.[index]?.id}
                          helperText={errors?.parts?.[index]?.id?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              {currentWarehouseData && (
                <>
                  <Grid size={{ xs: 2, sm: 2 }}>
                    <Controller
                      control={control}
                      name={`parts.${index}.used_count_this_ticket`}
                      defaultValue={1}
                      rules={{
                        required: `${t('form.required')}`,
                      }}
                      render={({ field: controllerField }) => (
                        <TextField
                          size="small"
                          {...controllerField}
                          type="number"
                          label={t('editTicket.count')}
                          fullWidth
                          error={
                            !!errors?.parts &&
                            !!errors?.parts[index]?.used_count_this_ticket
                          }
                          helperText={
                            errors?.parts?.[index]?.used_count_this_ticket
                              ?.message
                          }
                          slotProps={{
                            htmlInput: {
                              min: 1,
                              max: quantityMax,
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 2, sm: 2 }}>
                    <Controller
                      control={control}
                      defaultValue={currentWarehouseData?.retail_price}
                      name={`parts.${index}.price_at_use`}
                      render={({ field }) => (
                        <TextField
                          label={
                            <Box>
                              {t('form.price')}
                              <Tooltip
                                title={
                                  <>
                                    {t('warehouse.field_retail_price')}:{' '}
                                    {currentWarehouseData?.retail_price} <br />
                                    {t('warehouse.fild_purchase_price')}:{' '}
                                    {currentWarehouseData?.purchase_price}
                                  </>
                                }
                              >
                                <IconButton color="inherit">
                                  <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          }
                          variant="outlined"
                          size="small"
                          rows={4}
                          {...field}
                          value={field.value ?? ''}
                          error={
                            !!errors?.parts &&
                            !!errors?.parts[index]?.price_at_use
                          }
                          helperText={
                            !!errors?.parts &&
                            !!errors?.parts[index]?.price_at_use
                              ? errors?.parts?.[index]?.price_at_use?.message
                              : ''
                          }
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 1, sm: 1 }}>
                    <IconButton
                      onClick={() => {
                        setPartsFields((prev) =>
                          prev.filter((item) => item !== fieldId),
                        );
                        removeField(index);
                      }}
                      sx={{
                        '&:hover': {
                          color: 'error.main',
                        },
                      }}
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </>
              )}
            </Grid>
          );
        })}

      {canAddMoreParts && (
        <Box
          sx={{
            marginBottom: 4,
            marginTop: '0 !important',
            textAlign: 'right',
          }}
        >
          <Button
            variant="text"
            endIcon={<AddIcon />}
            onClick={() => {
              setDelayedRequestGetWarehouseItemsByCompanyId(false);
              setPartsFields((prev) => [...prev, uuidv4()]);
            }}
          >
            {t('editTicket.choose_part')}
          </Button>
        </Box>
      )}
    </>
  );
};

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import React, { FC, useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { pointAPI } from '../../../services/PointService';
import { IPoint } from '../../../types/IPoint';

interface IFormInputs {
    name: string;
    phone_number: number;
    description: string;
}

const Content: FC = () => {
    const { t } = useTranslation();

    const [
        createPoint,
        { isError, isLoading: isLoadingCreatePoint, error: errorCreatePoint },
    ] = pointAPI.useCreatePointMutation();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormInputs>();

    const dataFromError: any =
        errorCreatePoint && 'data' in errorCreatePoint
            ? errorCreatePoint?.data
            : undefined;

    const [point, setPoint] = useState<{ point: IPoint }>();

    const onSubmit: SubmitHandler<IFormInputs> = async (args) => {
        const { data } = (await createPoint({
            name: args.name,
            description: args.description,
        })) as { data: any };

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
                        required: 'Name is required',
                    }}
                    render={({ field }) => {
                        return (
                            <TextField
                                label={t('point.name')}
                                {...field}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        );
                    }}
                />

                <Controller
                    control={control}
                    name="phone_number"
                    rules={{
                        required: 'Phone is required',
                    }}
                    render={({ field }) => {
                        return (
                            <TextField
                                label={t('point.phone_number')}
                                {...field}
                                error={!!errors.phone_number}
                                helperText={errors.phone_number?.message}
                            />
                        );
                    }}
                />

                <Controller
                    control={control}
                    name="description"
                    render={({ field }) => {
                        return (
                            <TextField
                                label={t('point.description')}
                                multiline
                                rows={4}
                                {...field}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        );
                    }}
                />

                {isError && (
                    <Typography color="error">{dataFromError}</Typography>
                )}

                {point?.point.name && (
                    <Typography color="green">
                        Point "{point?.point.name}" Point created!
                    </Typography>
                )}

                <LoadingButton
                    disabled={isLoadingCreatePoint}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    {t('point.btn_create')}
                </LoadingButton>
            </Stack>
        </form>
    );
};

export default Content;

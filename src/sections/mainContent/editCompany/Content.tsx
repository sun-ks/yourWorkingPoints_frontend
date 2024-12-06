import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import React, { FC, useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { companyAPI } from '../../../services/CompanyService';
import { selectAccessToken } from '../../../store/reducers/AuthSlice';
import { IPoint } from '../../../types/IPoint';
import getAuthorizationHeaders from '../../../utils/api/getAuthorizationHeaders';

interface IFormInputs {
    company_name: string;
}

const Content: FC = () => {
    const { t } = useTranslation();

    const {
        data: company,
        error,
        isLoading: isLoading_point,
    } = companyAPI.useGetCompanyQuery('');

    const [updateCompany, { isError, error: errorupdatePoint }] =
        companyAPI.useUpdateCompanyMutation();

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<IFormInputs>({
        defaultValues: {
            company_name: '',
        },
    });

    useEffect(() => {
        if (company) {
            setValue('company_name', company.company_name);
        }
    }, [company]);

    const dataFromError: any =
        errorupdatePoint && 'data' in errorupdatePoint
            ? errorupdatePoint?.data
            : undefined;

    const [showSuccessesBlock, setshowSuccessesBlock] = useState(false);

    const onSubmit: SubmitHandler<IFormInputs> = async (args) => {
        const { data } = (await updateCompany(args)) as { data: any };

        if (data) {
            setshowSuccessesBlock(true);

            setTimeout(() => {
                setshowSuccessesBlock(false);
            }, 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" gutterBottom margin={4}>
                {t('company.company_settings')}
            </Typography>

            <Stack spacing={3}>
                <Controller
                    control={control}
                    name="company_name"
                    rules={{
                        required: 'Name is required',
                    }}
                    render={({ field }) => {
                        return (
                            <TextField
                                label={t('company.name') + '*'}
                                {...field}
                                error={!!errors.company_name}
                                helperText={
                                    errors.company_name?.message ||
                                    t('printTicket.will_in_print')
                                }
                            />
                        );
                    }}
                />

                {isError && (
                    <Typography color="error">{dataFromError}</Typography>
                )}

                {showSuccessesBlock && (
                    <Typography color="green">{t('updated')}</Typography>
                )}

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    {t('company.btn_edit')}
                </LoadingButton>
            </Stack>
        </form>
    );
};

export default Content;

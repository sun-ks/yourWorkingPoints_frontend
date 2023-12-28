import React, { FC, useState, useEffect } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {companyAPI} from "../../../services/CompanyService";
import getAuthorizationHeaders from "../../../utils/api/getAuthorizationHeaders";
import { selectAccessToken } from "../../../store/reducers/AuthSlice";
import { useSelector } from "react-redux";
import {IPoint} from "../../../types/IPoint";
import { useTranslation } from "react-i18next";

interface IFormInputs {
  company_name: string;
};

const Content: FC = () => {
  const { t } = useTranslation();

  const {data: company, error, isLoading: isLoading_point} = companyAPI.useGetCompanyQuery('')

  const [updateCompany, {isError, error:errorupdatePoint}] = companyAPI.useUpdateCompanyMutation();

  const { handleSubmit, control, setValue, formState: { errors } } = useForm<IFormInputs>({
    defaultValues:{
      company_name: ''
  }});

  useEffect(() => {
    if(company) {
      setValue('company_name', company.company_name);
    }
  }, [company]);

  const dataFromError:any = (errorupdatePoint && 'data' in errorupdatePoint) ? errorupdatePoint?.data : undefined;

  const [showSuccessesBlock, setshowSuccessesBlock] = useState(false);

  const onSubmit: SubmitHandler<IFormInputs> = async (args) => {
    const { data } = await updateCompany(args) as {data: any};

    if(data) {
      setshowSuccessesBlock(true)

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
              required: "Name is required",
            }}
            render={({ field }) => {
              return <TextField 
                label={t('company.name') + '*'}
                {...field} 
                error={!!errors.company_name}
                helperText={errors.company_name?.message || t('printTicket.will_in_print')}
              />
              }
            }
          />
          
          {isError && <Typography color="error">{dataFromError}</Typography>}

          {showSuccessesBlock && <Typography color="green">{t('updated')}</Typography>}

          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            {t('company.btn_edit')}
          </LoadingButton>
        </Stack>
      </form>
    )
}

export default Content;
import _ from 'lodash';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import React, { FC } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Collapse,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { pointAPI } from '../services/PointService';
import { selectAccessToken } from '../store/reducers/AuthSlice';
import getAuthorizationHeaders from '../utils/api/getAuthorizationHeaders';

const StyledHeader = styled('span')(({ theme }) => ({
  fontSize: '14px',
}));

const StyledHeaderFirst = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const NewPoint: FC = () => {
  const { t } = useTranslation();
  const accessToken = useSelector(selectAccessToken);

  const {
    data: points,
    error,
    isLoading,
  } = pointAPI.useGetPointsQuery(getAuthorizationHeaders(accessToken));

  const [createPoint, { isError, error: errorCreatePoint }] =
    pointAPI.useCreatePointMutation();

  const navigate = useNavigate();

  if (points && points?.length > 1) {
    navigate(`/`);
  } else if (points && points?.length === 1) {
    navigate(`/${points[0].point_id}`);
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{
    name: string;
    phone_number: string;
  }>();

  const onSubmit: SubmitHandler<any> = async (args) => {
    await createPoint(args);
  };

  return (
    <>
      {!isLoading && _.isEmpty(points) && (
        <HelmetProvider>
          <Helmet>
            <title>{t(`New Point`)}</title>
          </Helmet>

          <StyledRoot>
            <Container maxWidth="sm" data-testid="first-point-page">
              <StyledContent>
                <Typography variant="h5" gutterBottom sx={{ mb: 5 }}>
                  {t('create_first')}{' '}
                  <StyledHeaderFirst>{t('point.point')} </StyledHeaderFirst>
                  <StyledHeader> / {t('service_center')}</StyledHeader>
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Collapse in={isError} timeout={200}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ my: 2 }}
                    >
                      <Typography color="error">
                        {errorCreatePoint && 'data' in errorCreatePoint && (
                          <>{errorCreatePoint?.data}</>
                        )}
                      </Typography>
                    </Stack>
                  </Collapse>

                  <Stack spacing={3} marginBottom={2}>
                    <Controller
                      control={control}
                      name="name"
                      rules={{
                        required: 'Point Name is required',
                      }}
                      render={({ field }) => {
                        return (
                          <TextField
                            label="Point Name *"
                            sx={{ mb: 5 }}
                            {...field}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                          />
                        );
                      }}
                    />
                  </Stack>

                  <Stack spacing={3} marginBottom={3}>
                    <Controller
                      control={control}
                      name="phone_number"
                      rules={{
                        required: 'Point Phone Number is required',
                      }}
                      render={({ field }) => {
                        return (
                          <TextField
                            label="Point Phone Number *"
                            sx={{ mb: 5 }}
                            {...field}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                          />
                        );
                      }}
                    />
                  </Stack>

                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {t(`Create`)}
                  </LoadingButton>
                </form>
              </StyledContent>
            </Container>
          </StyledRoot>
        </HelmetProvider>
      )}
    </>
  );
};

export default NewPoint;

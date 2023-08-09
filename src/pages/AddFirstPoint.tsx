import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, Collapse, Typography, Container,} from '@mui/material';
import {pointAPI} from "../services/PointService";
import getAuthorizationHeaders from "../utils/api/getAuthorizationHeaders";
import { selectAccessToken } from "../store/reducers/AuthSlice";
import { useSelector } from "react-redux";
import _ from 'lodash';

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
  flexDirection: 'column'
}));

const NewPoint: FC = () => {
  const { t } = useTranslation();
  const accessToken = useSelector(selectAccessToken);
  
  const {data: points, error, isLoading} = pointAPI.useGetPointsQuery( getAuthorizationHeaders(accessToken));

  const [createPoint, {isError, error:errorCreatePoint}] = pointAPI.useCreatePointMutation();

  const navigate = useNavigate();

  if (points && points?.length > 1) {
    navigate(`/`)
  } else if (points && points?.length === 1){
    console.log('points && points?.length === 1')
    navigate(`/${points[0].point_id}`);
  }

  const { handleSubmit, control, formState: { errors } } = useForm<{
    name: string;
  }>();

  const onSubmit: SubmitHandler<any> = async (args) => {
    await createPoint({headers: getAuthorizationHeaders(accessToken), body: {name: args.name}});
  };

  return (
    <>
    {!isLoading && _.isEmpty(points) && 
    <HelmetProvider>
      <Helmet>
        <title>{t(`New Point`)}</title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
              Create First <StyledHeaderFirst>Point </StyledHeaderFirst>
              <StyledHeader> / Service Senter</StyledHeader>

            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Collapse in={isError} timeout={200}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                    <Typography color="error">
                    {errorCreatePoint && 'data' in errorCreatePoint && (
                      <>
                        {errorCreatePoint?.data}
                      </>
                    )}
                    </Typography>
                  </Stack>
                </Collapse>

                <Stack spacing={3}>
                  <Controller
                    control={control}
                    name="name"
                    rules={{
                      required: "Point Name is required",
                    }}
                    render={({ field }) => {
                      return <TextField 
                        label="Point Name *"
                        sx={{ mb: 5 }}
                        {...field} 
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        />
                      }
                    }
                  />
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" >
                  {t(`Create`)}
                </LoadingButton>
              </form>
          </StyledContent>
        </Container>
      </StyledRoot>
    </HelmetProvider>
}
    </>
  );
}

export default NewPoint;
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import { AuthForm } from '../sections/auth/login';
import { useParams } from 'react-router-dom';
import StyledRouterLink from '../components/styled/RouterLink'

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
  padding: theme.spacing(12, 0),
}));

const AuthPage: FC = () => {
  const { t } = useTranslation();

  const { type='sign_in' } = useParams();
  const opositeType = type === 'sign_in' ? 'sign_up' : 'sign_in';

  console.log(`${opositeType}.oposite`)
  return (
    <HelmetProvider>
      <Helmet>
        <title>{t(`${type}.meta.title`)}</title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              {t(`${type}.title`)}
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              {t(`${type}.do_not_account`)} {' '}
              <StyledRouterLink to={`/auth/${opositeType}`} >{t(`${opositeType}.title`)}</StyledRouterLink>
            </Typography>

            <AuthForm type={type} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </HelmetProvider>
  );
}

export default AuthPage;
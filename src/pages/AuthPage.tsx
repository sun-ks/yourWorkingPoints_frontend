import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import { AuthForm } from '../sections/auth/login';
import { useParams } from 'react-router-dom';
import StyledRouterLink from '../components/styled/RouterLink'
import {AuthPageType} from '../types/ICommon'
import { useRoutes, Outlet, useNavigate } from 'react-router-dom';

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
  const { typePage='sign_in' } = useParams<{typePage: AuthPageType}>();
  const opositeType = (typePage === 'sign_in' || typePage === 'forgot') ? 'sign_up' : 'sign_in';
  
  const navigate = useNavigate();
  if (typePage !== 'sign_in' && 
    typePage !== 'sign_up' && 
    typePage !== 'forgot' && 
    typePage !== 'new_password') {
    navigate('/404');
    return null;
  }
  return (
    <HelmetProvider>
      <Helmet>
        <title>{t(`${typePage}.meta.title`)}</title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              {t(`${typePage}.title`)}
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              {t(`${typePage}.do_not_account`)} {' '}
              <StyledRouterLink to={`/auth/${opositeType}`} >{t(`${opositeType}.title`)}</StyledRouterLink>
            </Typography>

            <AuthForm typePage={typePage} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </HelmetProvider>
  );
}

export default AuthPage;
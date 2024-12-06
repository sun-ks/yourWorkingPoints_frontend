import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Outlet, useNavigate, useRoutes } from 'react-router-dom';

import React, { FC } from 'react';

import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Header from '../components/Header';
import StyledRouterLink from '../components/styled/RouterLink';
import { AuthForm } from '../sections/auth/login';
import { AuthPageType } from '../types/ICommon';

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: 'calc(100vh - 50px)',
    padding: '0 20px 0 20px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
}));

const AuthPage: FC = () => {
    const { t } = useTranslation();
    const { typePage = 'sign_in', token } = useParams<{
        typePage: AuthPageType;
        token?: string;
    }>();
    const opositeType =
        typePage === 'sign_in' || typePage === 'forgot' ? 'sign_up' : 'sign_in';

    const navigate = useNavigate();
    if (
        typePage !== 'sign_in' &&
        typePage !== 'sign_up' &&
        typePage !== 'forgot' &&
        typePage !== 'new_password' &&
        typePage !== 'add_worker'
    ) {
        navigate('/404');
        return null;
    }
    return (
        <HelmetProvider>
            <Helmet>
                <title>{t(`${typePage}.meta.title`)}</title>
            </Helmet>

            <StyledRoot>
                <Container maxWidth="xl" disableGutters>
                    <Header isAuthPage={true} />
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            {t(`${typePage}.title`)}
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 5 }}>
                            {t(`${typePage}.do_not_account`)}{' '}
                            <StyledRouterLink to={`/auth/${opositeType}`}>
                                {t(`${opositeType}.title`)}
                            </StyledRouterLink>
                        </Typography>

                        <AuthForm typePage={typePage} token={token} />
                    </StyledContent>
                </Container>
            </StyledRoot>
        </HelmetProvider>
    );
};

export default AuthPage;

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';

import React, { FC } from 'react';

import { Box, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const Page404: FC = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title> 404 Page Not Found | Minimal UI </title>
        </Helmet>

        <Container>
          <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h3" paragraph>
              Sorry, page not found!
            </Typography>

            <Typography
              sx={{
                color: 'text.secondary',
                marginBottom: '30px',
              }}
            >
              Sorry, we couldn’t find the page you’re looking for. Perhaps
              you’ve mistyped the URL? Be sure to check your spelling.
            </Typography>

            <Button
              to="/"
              size="large"
              variant="contained"
              component={RouterLink}
            >
              Go to Home
            </Button>
          </StyledContent>
        </Container>
      </HelmetProvider>
    </>
  );
};
export default Page404;

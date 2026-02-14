import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { FC } from 'react';

import { Box, Container, Link, Stack, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';

const Warehouse: FC = () => {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`YWP | ${t('contactUs.title_seo')}`}</title>
      </Helmet>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      ></AppBar>

      <Container>
        <Box
          sx={{
            padding: 1,
            pt: 6,
          }}
        >
          <Stack spacing={3} textAlign="left">
            <Typography variant="h6" sx={{ mb: 40 }}>
              {` ${t('contactUs.title_seo')}`}
            </Typography>

            <Typography variant="body1">
              {` ${t('contactUs.text1')}`} <br />
              {` ${t('contactUs.text2')}`}
            </Typography>

            <Box sx={{ pt: 1 }}>
              <Stack spacing={1}>
                <Link href="mailto:info@ywp.app" underline="hover">
                  Info@ywp.app
                </Link>
                <Link
                  href="https://www.linkedin.com/in/igor-frontend-developer-625085a0/"
                  target="_blank"
                  rel="noreferrer"
                  underline="hover"
                >
                  LinkedIn
                </Link>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Container>
    </HelmetProvider>
  );
};

export default Warehouse;

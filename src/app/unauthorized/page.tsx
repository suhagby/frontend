'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <LockIcon sx={{ fontSize: 100, color: 'error.main', mb: 4 }} />
        <Typography variant="h2" component="h1" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          You don&apos;t have permission to access this page.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Please contact your administrator if you believe this is an error.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/dashboard')}
            sx={{ mx: 1 }}
          >
            Go to Dashboard
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => router.back()}
            sx={{ mx: 1 }}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;
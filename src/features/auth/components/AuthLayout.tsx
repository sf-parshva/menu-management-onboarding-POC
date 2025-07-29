import React from 'react';
import { Box, Container, Paper } from '@mui/material';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={1} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;

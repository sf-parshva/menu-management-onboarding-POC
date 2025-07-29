import React from 'react';
import { Typography, Box } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 64,
          height: 64,
          borderRadius: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          mb: 2,
        }}
      >
        <RestaurantMenuIcon sx={{ fontSize: 32 }} />
      </Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default AuthHeader;

import React from 'react';
import { Box, Typography, Avatar, Stack } from '@mui/material';

interface WelcomeCardProps {
  username: string | null;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ username }) => {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={4}>
      <Box sx={{ position: 'relative' }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          {username ? username[0].toUpperCase() : 'A'}
        </Avatar>
      </Box>
      <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
          sx={{
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            color: 'text.primary',
          }}
        >
          Hello, {username ?? 'Admin'}!
        </Typography>
      </Box>
    </Stack>
  );
};

export default WelcomeCard;

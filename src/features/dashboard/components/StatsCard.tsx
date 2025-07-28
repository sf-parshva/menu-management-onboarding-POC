import React from 'react';
import { Card, CardContent, Stack, Avatar, Box, Typography } from '@mui/material';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  bgcolor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, label, value, color, bgcolor }) => (
  <Card
    elevation={0}
    sx={{
      borderRadius: 3,
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      minHeight: 140,
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transform: 'translateY(-2px)',
      },
    }}
  >
    <CardContent sx={{ width: '100%', p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={3}>
        <Avatar
          sx={{
            bgcolor,
            color: 'white',
            width: 56,
            height: 56,
            fontSize: '1.5rem',
          }}
        >
          {icon}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            {label}
          </Typography>
          <Typography variant="h3" fontWeight={700} sx={{ color, mb: 1 }}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export default StatsCard;

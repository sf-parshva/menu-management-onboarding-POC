import React from 'react';
import { Container, Paper, Fade, Grid, Box } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CategoryIcon from '@mui/icons-material/Category';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import WelcomeCard from './components/WelcomeCard';
import StatsCard from './components/StatsCard';

const Dashboard: React.FC = () => {
  const menu = useSelector((state: RootState) => state.menu);
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <Fade in timeout={500}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3, lg: 4 } }}>
        {/* Welcome Section */}
        <Paper
          elevation={1}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 2,
            mb: { xs: 3, md: 4 },
            bgcolor: 'background.paper',
          }}
        >
          <Box>
            <WelcomeCard username={auth.currentUser?.username || null} />
          </Box>
        </Paper>

        {/* Stats Grid - Only Menu Items and Categories */}
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <StatsCard
              icon={<RestaurantMenuIcon fontSize="large" />}
              label="Total Menu Items"
              value={menu.items.length}
              color="#2563eb"
              bgcolor="#dbeafe"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <StatsCard
              icon={<CategoryIcon fontSize="large" />}
              label="Total Categories"
              value={menu.categories.length}
              color="#2563eb"
              bgcolor="#dbeafe"
            />
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
};

export default Dashboard;

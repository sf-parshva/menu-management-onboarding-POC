import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearAuthError } from './slices/authSlice';
import { RootState } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastProvider';
import LoginForm from './components/LoginForm';

const AuthPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const authError = useSelector((state: RootState) => state.auth.error);
  const { showToast } = useToast();

  React.useEffect(() => {
    if (isAuthenticated) {
      showToast('Login successful!', 'success');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, showToast]);

  React.useEffect(() => {
    if (authError) {
      showToast(authError, 'error');
      dispatch(clearAuthError());
    }
  }, [authError, showToast, dispatch]);

  const handleLogin = (form: { username: string; password: string }) => {
    dispatch(login({ username: form.username, password: form.password }));
  };

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
          <LoginForm
            onSubmit={handleLogin}
            loading={false}
            error={authError || ''}
            onNavigateRegister={() => navigate('/register')}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthPage;

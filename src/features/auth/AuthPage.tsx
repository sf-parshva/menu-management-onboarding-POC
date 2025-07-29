import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from './slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useAuthEffects } from './hooks/useAuthEffects';
import AuthLayout from './components/AuthLayout';
import LoginForm from './components/LoginForm';

const AuthPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authError } = useAuthEffects({ successMessage: 'Login successful!' });

  const handleLogin = (form: { username: string; password: string }) => {
    dispatch(login({ username: form.username, password: form.password }));
  };

  return (
    <AuthLayout>
      <LoginForm
        onSubmit={handleLogin}
        loading={false}
        error={authError ?? ''}
        onNavigateRegister={() => navigate('/register')}
      />
    </AuthLayout>
  );
};

export default AuthPage;

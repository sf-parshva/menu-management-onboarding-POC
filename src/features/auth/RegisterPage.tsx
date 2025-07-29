import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from './slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useAuthEffects } from './hooks/useAuthEffects';
import AuthLayout from './components/AuthLayout';
import RegisterForm from './components/RegisterForm';

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authError } = useAuthEffects({ successMessage: 'Registration successful!' });

  const handleRegister = (form: { username: string; password: string }) => {
    dispatch(register({ username: form.username, password: form.password }));
  };

  return (
    <AuthLayout>
      <RegisterForm
        onSubmit={handleRegister}
        loading={false}
        error={authError ?? ''}
        onNavigateLogin={() => navigate('/login')}
      />
    </AuthLayout>
  );
};

export default RegisterPage;

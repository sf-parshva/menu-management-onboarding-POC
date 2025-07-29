import React, { useState } from 'react';
import { Box, Stack, Alert } from '@mui/material';
import InputField from '../../../components/InputField';
import AuthHeader from './AuthHeader';
import AuthButton from './AuthButton';
import AuthFooter from './AuthFooter';
import { validateAuth } from '../validation/validateAuth';

interface LoginFormProps {
  onSubmit: (form: { username: string; password: string }) => void;
  loading?: boolean;
  error?: string;
  onNavigateRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, error, onNavigateRegister }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [touched, setTouched] = useState({ username: false, password: false });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const validate = (values = form) => {
    const newErrors = validateAuth(values);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedForm = { ...form, [e.target.name]: e.target.value };
    setForm(updatedForm);
    validate(updatedForm);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      setTouched({ username: true, password: true });
      return;
    }
    onSubmit(form);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <AuthHeader title="Welcome Back" subtitle="Sign in to your Food Menu Admin account" />

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          <InputField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={touched.username ? errors.username : ''}
            required
            fullWidth
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={touched.password ? errors.password : ''}
            required
            fullWidth
          />
          <AuthButton type="submit" disabled={!!errors.username || !!errors.password || loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </AuthButton>
        </Stack>
      </Box>

      <AuthFooter
        dividerText="or"
        buttonText="Create New Account"
        onButtonClick={onNavigateRegister}
        termsText="By signing in, you agree to our Terms of Service and Privacy Policy"
      />
    </Box>
  );
};

export default LoginForm;

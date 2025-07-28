import React, { useState } from 'react';
import { Typography, Button, Box, Stack, Divider, Alert } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import InputField from '../../../components/InputField';

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
    const newErrors: typeof errors = {};
    if (!values.username || values.username.trim().length < 3) {
      newErrors.username = 'Username is required (min 3 characters)';
    }
    if (!values.password || values.password.length < 6) {
      newErrors.password = 'Password is required (min 6 characters)';
    }
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
      {/* Logo and Title */}
      <Box sx={{ mb: 4 }}>
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
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sign in to your Food Menu Admin account
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Login Form */}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={!!errors.username || !!errors.password || loading}
            sx={{
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Stack>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          or
        </Typography>
      </Divider>

      {/* Register Link */}
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        size="large"
        onClick={onNavigateRegister}
        sx={{ py: 1.5, fontSize: '1rem', fontWeight: 600, borderRadius: 2, textTransform: 'none' }}
      >
        Create New Account
      </Button>

      {/* Footer */}
      <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
        By signing in, you agree to our Terms of Service and Privacy Policy
      </Typography>
    </Box>
  );
};

export default LoginForm;

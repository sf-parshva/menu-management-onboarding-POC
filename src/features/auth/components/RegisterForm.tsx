import React, { useState } from 'react';
import { Typography, Button, Box, Stack, Divider, Alert } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import InputField from '../../../components/InputField';

interface RegisterFormProps {
  onSubmit: (form: { username: string; password: string }) => void;
  loading?: boolean;
  error?: string;
  onNavigateLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  loading,
  error,
  onNavigateLogin,
}) => {
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [touched, setTouched] = useState({
    username: false,
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = (values = form) => {
    const newErrors: typeof errors = {};
    if (!values.username || values.username.trim().length < 3) {
      newErrors.username = 'Username is required (min 3 characters)';
    }
    if (!values.password || values.password.length < 6) {
      newErrors.password = 'Password is required (min 6 characters)';
    }
    if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      setTouched({ username: true, password: true, confirmPassword: true });
      return;
    }
    onSubmit({ username: form.username, password: form.password });
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
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
          Create Account
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Join Food Menu Admin to manage your restaurant
        </Typography>
      </Box>

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
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={touched.confirmPassword ? errors.confirmPassword : ''}
            required
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={!!errors.username || !!errors.password || !!errors.confirmPassword || loading}
            sx={{
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          or
        </Typography>
      </Divider>

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        size="large"
        onClick={onNavigateLogin}
        sx={{ py: 1.5, fontSize: '1rem', fontWeight: 600, borderRadius: 2, textTransform: 'none' }}
      >
        Sign In to Existing Account
      </Button>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
        By creating an account, you agree to our Terms of Service and Privacy Policy
      </Typography>
    </Box>
  );
};

export default RegisterForm;

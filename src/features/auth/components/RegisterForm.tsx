import React, { useState } from 'react';
import { Box, Stack, Alert } from '@mui/material';
import InputField from '../../../components/InputField';
import AuthHeader from './AuthHeader';
import AuthButton from './AuthButton';
import AuthFooter from './AuthFooter';
import { validateRegister } from '../validation/validateAuth';

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
    const newErrors = validateRegister(values);
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
      <AuthHeader
        title="Create Account"
        subtitle="Join Food Menu Admin to manage your restaurant"
      />

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

          <AuthButton
            type="submit"
            disabled={!!errors.username || !!errors.password || !!errors.confirmPassword || loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </AuthButton>
        </Stack>
      </Box>

      <AuthFooter
        dividerText="or"
        buttonText="Sign In to Existing Account"
        onButtonClick={onNavigateLogin}
        termsText="By creating an account, you agree to our Terms of Service and Privacy Policy"
      />
    </Box>
  );
};

export default RegisterForm;

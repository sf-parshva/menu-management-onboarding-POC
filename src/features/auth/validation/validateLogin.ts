import { useState } from 'react';

export interface LoginForm {
  username: string;
  password: string;
}

export interface LoginErrors {
  username?: string;
  password?: string;
}

const validateLogin = () => {
  const [errors, setErrors] = useState<LoginErrors>({});

  const validate = (values: LoginForm): boolean => {
    const newErrors: LoginErrors = {};
    if (!values.username || values.username.trim().length < 3) {
      newErrors.username = 'Username is required (min 3 characters)';
    }
    if (!values.password || values.password.length < 6) {
      newErrors.password = 'Password is required (min 6 characters)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default validateLogin;

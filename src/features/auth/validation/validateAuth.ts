import { validateLength } from '../../../utils/validation';

export interface AuthForm {
  username: string;
  password: string;
}

export interface AuthErrors {
  username?: string;
  password?: string;
}

export function validateAuth(values: AuthForm): AuthErrors {
  const errors: AuthErrors = {};

  const usernameErrors = validateLength('username', values.username, 3);
  const passwordErrors = validateLength('password', values.password, 6);

  if (usernameErrors.username) errors.username = usernameErrors.username;
  if (passwordErrors.password) errors.password = passwordErrors.password;

  return errors;
}

export function validateRegister(
  values: AuthForm & { confirmPassword: string },
): AuthErrors & { confirmPassword?: string } {
  const errors = validateAuth(values) as AuthErrors & { confirmPassword?: string };

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

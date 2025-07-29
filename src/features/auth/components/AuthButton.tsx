import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface AuthButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const AuthButton: React.FC<AuthButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      size="large"
      sx={{
        py: 1.5,
        fontSize: '1rem',
        fontWeight: 600,
        borderRadius: 2,
        textTransform: 'none',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AuthButton;

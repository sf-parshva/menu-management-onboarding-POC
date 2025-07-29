import React from 'react';
import { Typography, Button, Divider } from '@mui/material';

interface AuthFooterProps {
  dividerText: string;
  buttonText: string;
  onButtonClick: () => void;
  termsText: string;
}

const AuthFooter: React.FC<AuthFooterProps> = ({
  dividerText,
  buttonText,
  onButtonClick,
  termsText,
}) => {
  return (
    <>
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {dividerText}
        </Typography>
      </Divider>

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        size="large"
        onClick={onButtonClick}
        sx={{
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: 2,
          textTransform: 'none',
        }}
      >
        {buttonText}
      </Button>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
        {termsText}
      </Typography>
    </>
  );
};

export default AuthFooter;

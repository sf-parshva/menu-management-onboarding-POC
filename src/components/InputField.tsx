import React from 'react';
import { TextField } from '@mui/material';

interface InputFieldProps extends React.ComponentProps<typeof TextField> {
  errorText?: string;
}

const InputField: React.FC<InputFieldProps> = ({ errorText, helperText, ...props }) => (
  <TextField
    {...props}
    error={!!errorText}
    helperText={errorText ?? helperText}
    fullWidth
    margin="normal"
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.main',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary.main',
          borderWidth: '2px',
        },
      },
      '& .MuiInputLabel-root': {
        '&.Mui-focused': {
          color: 'primary.main',
        },
      },
      '& .MuiFormHelperText-root': {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0.5,
      },
    }}
  />
);

export default React.memo(InputField);

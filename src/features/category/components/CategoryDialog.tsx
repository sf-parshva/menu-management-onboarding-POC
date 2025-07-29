import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

interface CategoryDialogProps {
  open: boolean;
  value: string;
  error: string;
  touched: boolean;
  submitAttempted: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onClose: () => void;
  onSubmit: () => void;
  loading?: boolean;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({
  open,
  value,
  error,
  touched,
  submitAttempted,
  onChange,
  onBlur,
  onClose,
  onSubmit,
  loading,
}) => {
  const showError = (touched || submitAttempted) && !!error;
  const helperText = touched || submitAttempted ? error : '';
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <TextField
          label="Category Name"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={showError}
          helperText={helperText}
          fullWidth
          autoFocus
          margin="normal"
          slotProps={{ input: { size: 'medium' } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          disabled={!!error || loading}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDialog;

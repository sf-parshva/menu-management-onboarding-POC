import React, { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem as MuiMenuItem,
  Box,
  Chip,
  InputAdornment,
  Typography,
  FormHelperText,
} from '@mui/material';
import { MenuItem } from '../types';

interface MenuItemDialogProps {
  open: boolean;
  editId: string | null;
  form: Omit<MenuItem, 'id' | 'ingredients'> & { ingredients?: string[] };
  setForm: React.Dispatch<
    React.SetStateAction<Omit<MenuItem, 'id' | 'ingredients'> & { ingredients?: string[] }>
  >;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setTouched: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  submitAttempted: boolean;
  categories: string[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  ingredientInput: string;
  setIngredientInput: React.Dispatch<React.SetStateAction<string>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MenuItemDialog: React.FC<MenuItemDialogProps> = ({
  open,
  editId,
  form,
  setForm,
  errors,
  touched,
  setTouched,
  submitAttempted,
  categories,
  onClose,
  onSubmit,
  ingredientInput,
  setIngredientInput,
  handleImageChange,
}) => {
  const showError = (field: string) => (touched[field] || submitAttempted) && !!errors[field];
  const getHelperText = (field: string) => (touched[field] || submitAttempted ? errors[field] : '');
  const firstInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [open]);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>{editId ? 'Edit Menu Item' : 'Add Menu Item'}</b>
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <TextField
            inputRef={firstInputRef}
            label="Name"
            name="name"
            value={form.name || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            onBlur={() => setTouched((prev: Record<string, boolean>) => ({ ...prev, name: true }))}
            fullWidth
            margin="normal"
            error={showError('name')}
            helperText={getHelperText('name')}
            required
          />
          <TextField
            label="Description"
            name="description"
            value={form.description ?? 0}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            onBlur={() =>
              setTouched((prev: Record<string, boolean>) => ({ ...prev, description: true }))
            }
            fullWidth
            margin="normal"
            error={showError('description')}
            helperText={getHelperText('description')}
            required
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={form.price || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
            onBlur={() => setTouched((prev: Record<string, boolean>) => ({ ...prev, price: true }))}
            fullWidth
            margin="normal"
            error={showError('price')}
            helperText={getHelperText('price')}
            required
          />
          <TextField
            label="Ingredients"
            name="ingredients"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onBlur={() =>
              setTouched((prev: Record<string, boolean>) => ({ ...prev, ingredients: true }))
            }
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ',' || e.key === ';') && ingredientInput.trim()) {
                e.preventDefault();
                if (!form.ingredients?.includes(ingredientInput.trim())) {
                  setForm((prev) => ({
                    ...prev,
                    ingredients: [...(prev.ingredients ?? []), ingredientInput.trim()],
                  }));
                  setIngredientInput('');
                  setTouched((prev: Record<string, boolean>) => ({ ...prev, ingredients: true }));
                }
              }
            }}
            fullWidth
            margin="normal"
            error={showError('ingredients')}
            helperText={getHelperText('ingredients') || 'Press Enter to add each ingredient'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      size="small"
                      onClick={() => {
                        if (
                          ingredientInput.trim() &&
                          !form.ingredients?.includes(ingredientInput.trim())
                        ) {
                          setForm((prev) => ({
                            ...prev,
                            ingredients: [...(prev.ingredients ?? []), ingredientInput.trim()],
                          }));
                          setIngredientInput('');
                          setTouched((prev: Record<string, boolean>) => ({
                            ...prev,
                            ingredients: true,
                          }));
                        }
                      }}
                      disabled={
                        !ingredientInput.trim() ||
                        (form.ingredients ?? []).includes(ingredientInput.trim())
                      }
                    >
                      Add
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {(form.ingredients ?? []).map((ingredient: string, idx: number) => (
              <Chip
                key={ingredient}
                label={ingredient}
                onDelete={() => {
                  const newIngredients = (form.ingredients ?? []).filter(
                    (_: unknown, i: number) => i !== idx,
                  );
                  setForm((prev) => ({ ...prev, ingredients: newIngredients }));
                  setTouched((prev: Record<string, boolean>) => ({ ...prev, ingredients: true }));
                }}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
          <FormControl fullWidth margin="normal" error={showError('category')} required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={form.category || ''}
              label="Category"
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              onBlur={() =>
                setTouched((prev: Record<string, boolean>) => ({ ...prev, category: true }))
              }
            >
              {categories.map((cat) => (
                <MuiMenuItem key={cat} value={cat}>
                  {cat}
                </MuiMenuItem>
              ))}
            </Select>
            {showError('category') && <FormHelperText>{getHelperText('category')}</FormHelperText>}
          </FormControl>
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
            color={showError('image') ? 'error' : 'primary'}
          >
            {form.image ? 'Change Image' : 'Upload Image'}
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </Button>
          {showError('image') && (
            <Typography color="error" variant="caption" sx={{ ml: 2 }}>
              {getHelperText('image')}
            </Typography>
          )}
          {form.image && (
            <Box mt={2}>
              <img
                src={form.image}
                alt="Preview"
                style={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 8 }}
              />
            </Box>
          )}
          <FormControl fullWidth margin="normal" error={showError('available')} required>
            <InputLabel>Availability</InputLabel>
            <Select
              name="available"
              value={form.available ? 'Available' : 'Not Available'}
              label="Availability"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, available: e.target.value === 'Available' }))
              }
              onBlur={() =>
                setTouched((prev: Record<string, boolean>) => ({ ...prev, available: true }))
              }
            >
              <MuiMenuItem value="Available">Available</MuiMenuItem>
              <MuiMenuItem value="Not Available">Not Available</MuiMenuItem>
            </Select>
            {showError('available') && (
              <FormHelperText>{getHelperText('available')}</FormHelperText>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={
              Object.keys(errors).length > 0 ||
              !form.name ||
              !form.description ||
              !form.price ||
              !form.category ||
              !form.ingredients ||
              !form.image ||
              typeof form.available !== 'boolean'
            }
          >
            {editId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default React.memo(MenuItemDialog);

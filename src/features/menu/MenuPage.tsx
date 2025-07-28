import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Typography, Button, Container, Paper, Stack, Fade, Grid, Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { addMenuItem, editMenuItem, deleteMenuItem } from './slices/menuSlice';
import { MenuItem as MenuItemType } from './types';
import { v4 as uuidv4 } from 'uuid';
import MenuItemDialog from './components/MenuItemDialog';
import { useToast } from '../../components/ToastProvider';
import validateMenu from './validation/validateMenu';
import MenuItemCard from './components/MenuItemCard';
import MenuSearchFilterBar from './components/MenuSearchFilterBar';
import ActiveFiltersChips from './components/ActiveFiltersChips';

const defaultForm: Omit<MenuItemType, 'id' | 'ingredients'> & {
  ingredients?: string[];
} = {
  name: '',
  description: '',
  price: 0,
  image: '',
  category: '',
  available: true,
  ingredients: [],
};

const MenuPage: React.FC = () => {
  const dispatch = useDispatch();
  const menu = useSelector((state: RootState) => state.menu);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ingredientInput, setIngredientInput] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const { showToast } = useToast();
  const validate = React.useMemo(() => validateMenu(menu.categories), [menu.categories]);

  const fabRef = useRef<HTMLButtonElement>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  React.useEffect(() => {
    setErrors(validate(form));
  }, [form, validate]);

  const filteredItems = useMemo(() => {
    return menu.items.filter(
      (item) =>
        (!categoryFilter || item.category === categoryFilter) &&
        (item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          item.description.toLowerCase().includes(debouncedSearch.toLowerCase())),
    );
  }, [menu.items, debouncedSearch, categoryFilter]);

  const handleOpenDialog = useCallback((item?: MenuItemType) => {
    if (item) {
      setEditId(item.id);
      setForm({ ...item });
    } else {
      setEditId(null);
      setForm(defaultForm);
    }
    setTouched({});
    setSubmitAttempted(false);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setTimeout(() => {
      fabRef.current?.focus();
    }, 0);
    setForm(defaultForm);
    setEditId(null);
  }, []);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((prev) => ({ ...prev, image: ev.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitAttempted(true);
      const item: MenuItemType = {
        ...form,
        id: editId || uuidv4(),
        price: Number(form.price),
        ingredients: form.ingredients || [],
      };
      if (Object.keys(errors).length > 0) return;
      if (editId) {
        dispatch(editMenuItem(item));
        showToast('Menu item updated!', 'success');
      } else {
        dispatch(addMenuItem(item));
        showToast('Menu item added!', 'success');
      }
      handleCloseDialog();
    },
    [dispatch, form, editId, handleCloseDialog, showToast, errors],
  );

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteMenuItem(id));
      showToast('Menu item deleted!', 'info');
    },
    [dispatch, showToast],
  );

  const clearSearch = () => {
    setSearch('');
  };

  const clearFilters = () => {
    setSearch('');
    setCategoryFilter('');
  };

  return (
    <Fade in timeout={500}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3, lg: 4 } }}>
        {/* Enhanced Header */}
        <Stack direction="column" spacing={3} mb={{ xs: 3, md: 4 }}>
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                fontSize: { xs: '1.5rem', md: '2.125rem' },
                color: 'text.primary',
                mb: 0.5,
              }}
            >
              Menu Management
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
              Manage your restaurant's menu items and categories
            </Typography>
          </Box>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 2.5 },
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Stack spacing={1.5}>
              <MenuSearchFilterBar
                search={search}
                setSearch={setSearch}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                categories={menu.categories}
                clearSearch={clearSearch}
                clearFilters={clearFilters}
              />
              <ActiveFiltersChips
                search={search}
                categoryFilter={categoryFilter}
                clearSearch={clearSearch}
                clearCategory={() => setCategoryFilter('')}
              />
            </Stack>
          </Paper>
        </Stack>

        {/* Enhanced Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 6, md: 8 },
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              textAlign: 'center',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: 3,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                mb: 3,
              }}
            >
              <SearchIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
              No menu items found
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}
            >
              {search || categoryFilter
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first menu item.'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
              }}
            >
              Add First Item
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {filteredItems.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                <MenuItemCard item={item} onEdit={handleOpenDialog} onDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Enhanced Floating Action Button */}
        <Fab
          ref={fabRef}
          color="primary"
          aria-label="add menu item"
          onClick={() => handleOpenDialog()}
          size="large"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.3)',
            '&:hover': {
              boxShadow: '0 12px 32px rgba(37, 99, 235, 0.4)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <AddIcon />
        </Fab>

        <MenuItemDialog
          open={dialogOpen}
          editId={editId}
          form={form}
          setForm={setForm}
          errors={errors}
          touched={touched}
          setTouched={setTouched}
          submitAttempted={submitAttempted}
          categories={menu.categories}
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
          ingredientInput={ingredientInput}
          setIngredientInput={setIngredientInput}
          handleImageChange={handleImageChange}
        />
      </Container>
    </Fade>
  );
};

export default MenuPage;

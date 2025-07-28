import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Stack,
  Fab,
  Fade,
  Button,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryIcon from '@mui/icons-material/Category';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { addCategory, deleteCategory } from '../menu/slices/menuSlice';
import { useToast } from '../../components/ToastProvider';
import validateCategory from './validation/validateCategory';
import CategoryDialog from './components/CategoryDialog';

const CategoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.menu.categories);
  const { showToast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
    setNewCategory('');
    setError('');
    setTouched(false);
    setSubmitAttempted(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewCategory('');
    setError('');
    setTouched(false);
    setSubmitAttempted(false);
  };

  const validate = validateCategory(categories);

  const handleAddCategory = () => {
    setSubmitAttempted(true);
    const validationError = validate(newCategory);
    setError(validationError);
    if (validationError) {
      return;
    }
    dispatch(addCategory(newCategory.trim()));
    showToast('Category added!', 'success');
    handleCloseDialog();
  };

  const handleDeleteCategory = (cat: string) => {
    dispatch(deleteCategory(cat));
    showToast('Category deleted!', 'info');
  };

  return (
    <Fade in timeout={500}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3, lg: 4 } }}>
        {/* Mobile-First Header */}
        <Stack direction="column" spacing={2} mb={{ xs: 3, md: 4 }}>
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
              Category Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Organize your menu with custom categories and classifications
            </Typography>
          </Box>
        </Stack>

        {/* Mobile-First Categories List */}
        {categories.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              textAlign: 'center',
            }}
          >
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
              <CategoryIcon sx={{ fontSize: 32 }} />
            </Box>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No categories found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Get started by adding your first category
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Add First Category
            </Button>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {categories.map((category) => (
              <Card
                key={category}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                        }}
                      >
                        <CategoryIcon sx={{ fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {category}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteCategory(category)}
                      sx={{
                        '&:hover': {
                          bgcolor: 'error.50',
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        {/* Floating Action Button for Mobile */}
        <Fab
          color="primary"
          aria-label="add category"
          onClick={handleOpenDialog}
          size="large"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(37, 99, 235, 0.35)',
            },
          }}
        >
          <AddIcon />
        </Fab>

        <CategoryDialog
          open={dialogOpen}
          value={newCategory}
          error={error}
          touched={touched}
          submitAttempted={submitAttempted}
          onChange={(e) => {
            setNewCategory(e.target.value);
            setTouched(true);
            setError(validate(e.target.value));
          }}
          onBlur={() => setTouched(true)}
          onClose={handleCloseDialog}
          onSubmit={handleAddCategory}
        />
      </Container>
    </Fade>
  );
};

export default CategoryPage;

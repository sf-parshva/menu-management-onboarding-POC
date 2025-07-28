import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Stack,
  Divider,
  CardActions,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onEdit, onDelete }) => (
  <Card
    elevation={0}
    sx={{
      borderRadius: 4,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      transition: 'all 0.3s ease-in-out',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
        borderColor: 'primary.main',
      },
    }}
  >
    {item.image && (
      <CardMedia
        component="img"
        height="200"
        image={item.image}
        alt={item.name}
        sx={{
          objectFit: 'cover',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
    )}
    <CardContent sx={{ flexGrow: 1, p: 3 }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1, mr: 1 }}>
          {item.name}
        </Typography>
        <Chip
          label={item.available ? 'Available' : 'Not Available'}
          size="small"
          color={item.available ? 'success' : 'default'}
          sx={{ fontWeight: 600 }}
        />
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 2,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: 1.4,
        }}
      >
        {item.description}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6" color="primary.main" fontWeight={700}>
          ₹{item.price}
        </Typography>
        <Chip label={item.category} size="small" color="secondary" variant="outlined" />
      </Stack>
      {item.ingredients && item.ingredients.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Ingredients:
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {item.ingredients.slice(0, 3).map((ing, idx) => (
              <Chip
                key={ing + idx}
                label={ing}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
            {item.ingredients.length > 3 && (
              <Chip
                label={`+${item.ingredients.length - 3} more`}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            )}
          </Stack>
        </Box>
      )}
    </CardContent>
    <Divider />
    <CardActions sx={{ justifyContent: 'space-between', px: 3, py: 2 }}>
      <Button
        size="small"
        color="primary"
        onClick={() => onEdit(item)}
        startIcon={<EditIcon />}
        sx={{ textTransform: 'none', fontWeight: 600 }}
      >
        Edit
      </Button>
      <Button
        size="small"
        color="error"
        onClick={() => onDelete(item.id)}
        startIcon={<DeleteIcon />}
        sx={{ textTransform: 'none', fontWeight: 600 }}
      >
        Delete
      </Button>
    </CardActions>
  </Card>
);

export default React.memo(MenuItemCard);

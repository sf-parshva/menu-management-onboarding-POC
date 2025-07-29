import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem as MuiMenuItem,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

interface MenuSearchFilterBarProps {
  search: string;
  setSearch: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  categories: string[];
  clearSearch: () => void;
  clearFilters: () => void;
}

const MenuSearchFilterBar: React.FC<MenuSearchFilterBarProps> = ({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  categories,
  clearSearch,
  clearFilters,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: { xs: 1.5, md: 1 },
      alignItems: { xs: 'stretch', md: 'flex-end' },
    }}
  >
    {/* Search Bar */}
    <Box sx={{ flexGrow: 1 }}>
      <TextField
        label="Search menu items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary', fontSize: '1.1rem' }} />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={clearSearch} sx={{ color: 'text.secondary' }}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1.5,
            fontSize: '0.85rem',
            height: 40,
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: '1px',
              },
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
              borderWidth: '1px',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '0.85rem',
            '&.Mui-focused': {
              color: 'primary.main',
            },
          },
        }}
      />
    </Box>
    {/* Category Filter */}
    <FormControl
      size="small"
      sx={{ minWidth: { xs: '100%', md: 180 }, maxWidth: { xs: '100%', md: 250 } }}
    >
      <InputLabel sx={{ fontSize: '0.85rem' }}>Filter by Category</InputLabel>
      <Select
        value={categoryFilter}
        label="Filter by Category"
        onChange={(e) => setCategoryFilter(e.target.value)}
        startAdornment={
          <FilterListIcon sx={{ mr: 1, color: 'text.secondary', fontSize: '1rem' }} />
        }
        sx={{
          borderRadius: 1.5,
          height: 40,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'divider',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
            borderWidth: '1px',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
            borderWidth: '1px',
          },
        }}
      >
        <MuiMenuItem value="">All Categories</MuiMenuItem>
        {categories.map((cat) => (
          <MuiMenuItem key={cat} value={cat}>
            {cat}
          </MuiMenuItem>
        ))}
      </Select>
    </FormControl>
    {/* Clear All Button */}
    {(search || categoryFilter) && (
      <Button
        variant="outlined"
        color="primary"
        onClick={clearFilters}
        size="small"
        sx={{
          borderRadius: 1.5,
          textTransform: 'none',
          fontWeight: 600,
          borderWidth: '1px',
          px: 1.5,
          py: 0.5,
          fontSize: '0.8rem',
          height: 40,
          '&:hover': {
            borderWidth: '1px',
            bgcolor: 'primary.50',
          },
        }}
      >
        Clear All
      </Button>
    )}
  </Box>
);

export default React.memo(MenuSearchFilterBar);

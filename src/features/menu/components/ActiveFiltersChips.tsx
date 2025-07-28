import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

interface ActiveFiltersChipsProps {
  search: string;
  categoryFilter: string;
  clearSearch: () => void;
  clearCategory: () => void;
}

const ActiveFiltersChips: React.FC<ActiveFiltersChipsProps> = ({
  search,
  categoryFilter,
  clearSearch,
  clearCategory,
}) => {
  if (!search && !categoryFilter) return null;
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mr: 0.5, fontWeight: 500, fontSize: '0.75rem' }}
      >
        Active filters:
      </Typography>
      {search && (
        <Chip
          label={`Search: "${search}"`}
          size="small"
          onDelete={clearSearch}
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 600,
            fontSize: '0.7rem',
            height: 20,
            '& .MuiChip-deleteIcon': {
              fontSize: '0.8rem',
            },
          }}
        />
      )}
      {categoryFilter && (
        <Chip
          label={`Category: ${categoryFilter}`}
          size="small"
          onDelete={clearCategory}
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 600,
            fontSize: '0.7rem',
            height: 20,
            '& .MuiChip-deleteIcon': {
              fontSize: '0.8rem',
            },
          }}
        />
      )}
    </Box>
  );
};

export default React.memo(ActiveFiltersChips);

const validateCategoryName = (categories: string[]) => {
  return (value: string) => {
    if (!value.trim()) return 'Category name is required';
    if (value.trim().length < 2) return 'Category name must be at least 2 characters';
    if (value.trim().length > 32) return 'Category name must be at most 32 characters';
    if (categories.includes(value.trim())) return 'Category already exists';
    return '';
  };
};

export default validateCategoryName;

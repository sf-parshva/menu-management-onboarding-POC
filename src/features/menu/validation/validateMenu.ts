import { MenuItem } from '../types';

const validateMenu = (categories: string[]) => {
  return (form: Partial<MenuItem>) => {
    const errors: Record<string, string> = {};
    if (!form.name || form.name.trim().length < 2)
      errors.name = 'Name is required (min 2 characters)';
    if (form.name && form.name.length > 64) errors.name = 'Name must be at most 64 characters';
    if (!form.description || form.description.trim().length < 5)
      errors.description = 'Description is required (min 5 characters)';
    if (form.description && form.description.length > 256)
      errors.description = 'Description must be at most 256 characters';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      errors.price = 'Price must be greater than 0';
    if (!form.category || !categories.includes(form.category))
      errors.category = 'Category is required';
    if (
      !form.ingredients ||
      !Array.isArray(form.ingredients) ||
      form.ingredients.length === 0 ||
      form.ingredients.some((i) => !i.trim())
    )
      errors.ingredients = 'At least one valid ingredient is required';
    if (!form.image) errors.image = 'Image is required';
    if (typeof form.available !== 'boolean') errors.available = 'Availability is required';
    return errors;
  };
};

export default validateMenu;

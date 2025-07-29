import { isBlank, validateLength } from '../../../utils/validation';
import { MenuItem } from '../types';


const validateMenu = (categories: string[]) => (form: Partial<MenuItem>) => {
  const errors: Record<string, string> = {};

  const name = form.name?.trim() ?? '';
  const description = form.description?.trim() ?? '';
  const price = Number(form.price);
  const ingredients = form.ingredients ?? [];

  validateLength('name', name, 2, 64, errors);
  validateLength('description', description, 5, 256, errors);

  if (!form.price || isNaN(price) || price <= 0) {
    errors.price = 'Price must be greater than 0';
  }

  if (!form.category || !categories.includes(form.category)) {
    errors.category = 'Category is required';
  }

  if (!Array.isArray(ingredients) || ingredients.length === 0 || ingredients.some(isBlank)) {
    errors.ingredients = 'At least one valid ingredient is required';
  }

  if (!form.image) {
    errors.image = 'Image is required';
  }

  if (typeof form.available !== 'boolean') {
    errors.available = 'Availability is required';
  }

  return errors;
};

export default validateMenu;

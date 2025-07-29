// Common validation utilities
export const isBlank = (str?: string) => !str?.trim();

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const validateLength = (
  field: string,
  value: string,
  min: number,
  max?: number,
  errors: Record<string, string> = {},
): Record<string, string> => {
  if (isBlank(value)) {
    errors[field] = `${capitalize(field)} is required (min ${min} characters)`;
    return errors;
  }

  if (value.length < min) {
    errors[field] = `${capitalize(field)} must be at least ${min} characters`;
  } else if (max && value.length > max) {
    errors[field] = `${capitalize(field)} must be at most ${max} characters`;
  }

  return errors;
};

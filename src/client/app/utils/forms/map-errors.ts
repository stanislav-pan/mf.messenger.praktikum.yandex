import { FormControl } from './form-control';

export const mapErrors = (control: FormControl) => {
  if ('passwordConfirm' in control.errors) {
    return control.errors['passwordConfirm'];
  }

  if ('minLength' in control.errors) {
    return `Minimum of ${control.errors['minLength']} characters is required`;
  }

  if ('onlyNumber' in control.errors) {
    return 'You can only enter numbers';
  }

  if ('email' in control.errors) {
    return 'Email is not correct';
  }

  if ('required' in control.errors) {
    return 'This field is required';
  }

  const firstError = (Object.values(control.errors) || [])[0];

  return firstError;
};

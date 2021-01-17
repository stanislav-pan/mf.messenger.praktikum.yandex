import { FormControl } from './form-control';

export const mapErrors = (control: FormControl): string | null => {
  if ('passwordConfirm' in control.errors) {
    return control.errors['passwordConfirm'] as string;
  }

  if ('minLength' in control.errors && 'required' in control.errors) {
    return `This field is required`;
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

  return Object.values(control.errors)?.length
    ? String(Object.values(control.errors)[0])
    : null;
};

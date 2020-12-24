import { FormControl } from '../form-control';
import { ValidatorFn } from '../validator-interfaces';

export const RequiredValidator: ValidatorFn = (control: FormControl) => {
  const value = control.getValue();

  if (value === '' || value === null || value === undefined) {
    return {
      required: true,
    };
  }

  return null;
};

import { FormControl } from '../form-control';
import { ValidatorFn } from '../validator-interfaces';

export const minLengthValidator = (min: number): ValidatorFn => {
  return (control: FormControl) => {
    const value: string = control.getValue();

    if (value.length < min) {
      return {
        minLength: min,
      };
    }

    return null;
  };
};

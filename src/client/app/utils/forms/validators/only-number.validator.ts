import { FormControl } from '../form-control';
import { ValidatorFn } from '../validator-interfaces';

export const OnlyNumberValidator: ValidatorFn = (control: FormControl) => {
  const value = control.getValue();

  const reg = /^\d+$/;

  if (!reg.test(value)) {
    return {
      onlyNumber: true,
    };
  }

  return null;
};

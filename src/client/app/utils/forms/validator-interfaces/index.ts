import { AbstractalControl } from 'src/client/app/components/input/input';

export interface ValidatorFn {
  (control: AbstractalControl): ValidationErrors | null;
}

export interface Validator {
  validatorFn: ValidatorFn;
  keys: string[];
}

export type ValidationErrors = {
  [key: string]: any;
};

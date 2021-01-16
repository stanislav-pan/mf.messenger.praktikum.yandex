import { AbstractalControl } from 'src/client/app/components/input';

export interface ValidatorFn {
  (control: AbstractalControl): ValidationErrors | null;
}

export interface Validator {
  validatorFn: ValidatorFn;
  keys: string[];
}

export type ValidationErrors = {
  [key: string]: unknown;
};

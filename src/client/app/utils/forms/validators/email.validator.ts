import { FormControl } from '../form-control';
import { ValidatorFn } from '../validator-interfaces';

export const EmailValidator: ValidatorFn = (control: FormControl) => {
    const value = control.getValue();

    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (!reg.test(value)) {
        return {
            email: 'incorrect',
        };
    }

    return null;
};

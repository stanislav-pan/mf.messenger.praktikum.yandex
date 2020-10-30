import { FormGroup } from '../form-group';
import { ValidationErrors, ValidatorFn } from '../validator-interfaces';

export const validatePasswordConfirm: ValidatorFn = (form: FormGroup) => {
    const pass = form.get('passwordInput');
    const passConfirm = form.get('confirmPasswordInput');

    if (!pass || !passConfirm) {
        return null;
    }

    const error: ValidationErrors = {
        passwordConfirm: true,
    };

    if (pass.getValue() && !passConfirm.getValue()) {
        form.get('confirmPasswordInput').setErrors({
            passwordConfirm: 'Password must be confirmed',
        });

        return error;
    } else if (
        passConfirm.getValue() &&
        pass.getValue() !== passConfirm.getValue()
    ) {
        form.get('confirmPasswordInput').setErrors({
            passwordConfirm: `The password confirmation doesn't match`,
        });

        return error;
    }

    form.get('confirmPasswordInput').deleteErrors(['passwordConfirm']);

    return null;
};

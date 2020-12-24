import { FormGroup } from '../form-group';
import { ValidationErrors, ValidatorFn } from '../validator-interfaces';

export const validatePasswordConfirm: ValidatorFn = (form: FormGroup) => {
  const pass = form.get('newPassword');
  const passConfirm = form.get('newPasswordConfirm');

  if (!pass || !passConfirm) {
    return null;
  }

  const error: ValidationErrors = {
    passwordConfirm: true,
  };

  if (pass.getValue() && !passConfirm.getValue()) {
    passConfirm.setErrors({
      passwordConfirm: 'Password must be confirmed',
    });

    return error;
  } else if (
    passConfirm.getValue() &&
    pass.getValue() !== passConfirm.getValue()
  ) {
    passConfirm.setErrors({
      passwordConfirm: `The password confirmation doesn't match`,
    });

    return error;
  }

  passConfirm.deleteErrors(['passwordConfirm']);

  return null;
};

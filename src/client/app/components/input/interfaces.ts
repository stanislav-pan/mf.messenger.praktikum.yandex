import { ICommonPropFields } from '../../utils/block';
import { FormControl } from '../../utils/forms/form-control';
import InputErrors from '../input-errors/input-errors';

export interface IInputComponentExternalProps extends ICommonPropFields {
  id?: string;
  name?: string;
  /**
   * @default 'text'
   */
  type?: 'text' | 'password' | 'email' | 'tel';
  label?: string;
  placeholder?: string;
  withPaddingTop?: boolean;
  iconTemplate?: string;

  formControl?: FormControl;
}

export interface IInputComponentInnerProps {
  components: {
    errors: InputErrors;
  };
}

export type InputComponentProps = IInputComponentExternalProps &
  IInputComponentInnerProps;

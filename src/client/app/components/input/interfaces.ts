import InputErrors from '@components/input-errors';
import { FormControl } from '@forms/form-control';
import { ICommonPropFields } from '@utils/block';

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

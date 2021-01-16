import { ICommonPropFields } from '@utils/block';

export interface IInputErrorsComponentExternalProps extends ICommonPropFields {
  error: string;
}

export type InputErrorsComponentProps = IInputErrorsComponentExternalProps;

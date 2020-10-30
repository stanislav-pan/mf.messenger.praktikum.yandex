import { ICommonPropFields } from '../../utils/block';

export interface IInputErrorsComponentExternalProps extends ICommonPropFields {
    errors: string[];
}

export interface IInputErrorsComponentInnerProps {}

export type InputErrorsComponentProps = IInputErrorsComponentExternalProps &
    IInputErrorsComponentInnerProps;

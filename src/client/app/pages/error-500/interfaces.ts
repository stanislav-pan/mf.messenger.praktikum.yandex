import { ICommonPropFields } from '../../utils/block';

export interface IError500PageExternalProps extends ICommonPropFields {}

export type Error500PageProps = IError500PageExternalProps &
    IError500PageInnerProps;

export interface IError500PageInnerProps {}

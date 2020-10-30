import { ICommonPropFields } from '../../utils/block';

export interface IError404PageExternalProps extends ICommonPropFields {}

export type Error404PageProps = IError404PageExternalProps &
    IError404PageInnerProps;

export interface IError404PageInnerProps {}

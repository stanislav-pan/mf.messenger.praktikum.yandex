import { ICommonPropFields } from '../../utils/block';

export interface IButtonComponentExternalProps extends ICommonPropFields {
    /** Текст кнопки */
    text: string;

    class?: string;
}

export type ButtonComponentProps = IButtonComponentExternalProps &
    IButtonComponentInnerProps;

export interface IButtonComponentInnerProps {}

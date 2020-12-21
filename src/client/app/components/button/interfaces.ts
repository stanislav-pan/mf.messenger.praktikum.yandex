import { ICommonPropFields } from '../../utils/block';

export interface IButtonComponentExternalProps extends ICommonPropFields {
    /** Текст кнопки */
    text: string;
    class?: string;

    handlers?: {
        click?: () => void;
    };
}

export type ButtonComponentProps = IButtonComponentExternalProps &
    IButtonComponentInnerProps;

export interface IButtonComponentInnerProps {}

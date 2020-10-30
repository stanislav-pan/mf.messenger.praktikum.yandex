import { ICommonPropFields } from '../../utils/block';

export interface IButtonProps extends ICommonPropFields {
    /** Текст кнопки */
    text: string;

    class?: string;
}

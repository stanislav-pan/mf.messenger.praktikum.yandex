import { ICommonPropFields } from '../../utils/block';

export interface IInputProps extends ICommonPropFields {
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
}

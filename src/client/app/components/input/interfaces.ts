import { ICommonPropFields } from '../../utils/block';
import { FormControl } from '../../utils/forms/form-control';

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

    formControl?: FormControl;
    formControlName?: string;
}

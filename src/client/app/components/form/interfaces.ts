import { SubmitEvent } from '../../core/interfaces';
import { ICommonPropFields } from '../../utils/block';
import { FormGroup } from '../../utils/forms/form-group';

export interface IFormComponentProps extends ICommonPropFields {
    formGroup: FormGroup;

    handlers: {
        submit: (event: SubmitEvent) => void;
    }
}

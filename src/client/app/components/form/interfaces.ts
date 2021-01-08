import { SubmitEvent } from '../../core/interfaces';
import { ICommonPropFields } from '../../utils/block';
import { FormGroup } from '../../utils/forms/form-group';

export interface IFormComponentExternalProps extends ICommonPropFields {
  formGroup: FormGroup;

  handlers: {
    submit: (event: SubmitEvent) => void;
  };
}

export type FormComponentProps = IFormComponentExternalProps;

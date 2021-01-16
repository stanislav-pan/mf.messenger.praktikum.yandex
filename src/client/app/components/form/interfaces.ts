import { SubmitEvent } from '@core/interfaces';
import { FormGroup } from '@forms/form-group';
import { ICommonPropFields } from '@utils/block';

export interface IFormComponentExternalProps extends ICommonPropFields {
  formGroup: FormGroup;

  handlers: {
    submit: (event: SubmitEvent) => void;
  };
}

export type FormComponentProps = IFormComponentExternalProps;

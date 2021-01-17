import { SubmitEvent } from '@core/interfaces';
import { FormGroup } from '@forms/form-group';
import { ICommonPropFields, MapOfBlockLike } from '@utils/block';

export interface IFormComponentExternalProps extends ICommonPropFields {
  formGroup: FormGroup;
  components: MapOfBlockLike;

  handlers: {
    submit: (event: SubmitEvent) => void;
  };
}

export type FormComponentProps = IFormComponentExternalProps;

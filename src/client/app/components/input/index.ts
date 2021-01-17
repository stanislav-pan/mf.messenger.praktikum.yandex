import InputErrors from '@components/input-errors';
import { FormControl } from '@forms/form-control';
import { FormGroup } from '@forms/form-group';
import { mapErrors } from '@forms/map-errors';
import { isNode } from '@my-lodash/is-node';
import { templator } from '@services/templator.service';
import { Block } from '@utils/block';
import {
  InputComponentProps,
  IInputComponentExternalProps,
} from './interfaces';

import './input.scss';

export type AbstractalControl = FormControl | FormGroup;

export default class Input extends Block<InputComponentProps> {
  private _bindedFormControlChangingHandler;

  constructor(props: IInputComponentExternalProps) {
    super({
      tagName: 'app-input',
      props: {
        ...props,
        components: {
          errors: new InputErrors({
            error: '',
          }),
        },
      },
    });
  }

  componentDidMount(): void {
    const fc = this.props?.formControl as FormControl;

    if (!fc) {
      return;
    }

    this._bindedFormControlChangingHandler = this._formControlChangingHandler.bind(
      this
    );

    fc.subscribeOnErrors(this._bindedFormControlChangingHandler);
  }

  componentWillUnmount(): void {
    const fc = this.props?.formControl as FormControl;

    if (!fc) {
      return;
    }

    fc.unsubscribeFromErrors(this._bindedFormControlChangingHandler);
  }

  private _formControlChangingHandler() {
    const error = mapErrors(this.props.formControl as FormControl);

    if (!error) {
      return;
    }

    this.props.components.errors.setProps({ error });
  }

  render(): string {
    return templator
      .getTemplate('input.tmpl.njk', isNode() && __dirname)
      .render({
        ...this.props,
        errorsComponentId: this.props.components.errors.getId(),
      });
  }
}

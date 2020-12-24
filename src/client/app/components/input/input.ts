import { templator } from '../../services/templator.service';
import { Block } from '../../utils/block';
import { FormControl } from '../../utils/forms/form-control';
import { FormGroup } from '../../utils/forms/form-group';
import { mapErrors } from '../../utils/forms/map-errors';
import InputErrors from '../input-errors/input-errors';
import {
  IInputComponentExternalProps,
  InputComponentProps,
} from './interfaces';

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

  componentDidMount() {
    const fc = this.props?.formControl as FormControl;

    if (!fc) {
      return;
    }

    this._bindedFormControlChangingHandler = this._formControlChangingHandler.bind(
      this
    );

    fc.subscribe(this._bindedFormControlChangingHandler);
  }

  componentWillUnmount() {
    const fc = this.props?.formControl as FormControl;

    if (!fc) {
      return;
    }

    fc.unsubscribe(this._bindedFormControlChangingHandler);
  }

  private _formControlChangingHandler() {
    this.props.components.errors.setProps({
      error: mapErrors(this.props.formControl as FormControl),
    });
  }

  render() {
    return templator
      .getTemplate('../app/components/input/input.tmpl.njk')
      .render({
        ...this.props,
        errorsComponentId: this.props.components.errors.getId(),
      });
  }
}

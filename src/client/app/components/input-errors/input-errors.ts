import { Block } from '../../utils/block';
import {
  InputErrorsComponentProps,
  IInputErrorsComponentExternalProps,
} from './interfaces';

import template from './input-errors.tmpl.njk';
export default class InputErrors extends Block<InputErrorsComponentProps> {
  constructor(props: IInputErrorsComponentExternalProps) {
    super({
      tagName: 'app-input-errors',
      props,
    });
  }

  render() {
    return template({
      ...this.props,
    });
  }
}
